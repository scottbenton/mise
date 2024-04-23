import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Task } from "types/TodoTask.type";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "atoms/authAtom";
import { useInvokeApiFunction } from "api/useApiFunction";
import { createTask } from "api/tasks/createTask";
import { constructDateString } from "functions/constructDateString";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTask } from "api/tasks/deleteTask";
import { updateTask } from "api/tasks/updateTask";
import { HoverRow } from "../HoverRow";
import { useIsMobileDevice } from "functions/useIsMobileDevice";

export interface TaskListProps {
  initialTaskList: Record<string, Task>;
  date: Date;
}

export function TaskList(props: TaskListProps) {
  const { initialTaskList, date } = props;

  const uid = useAuth().uid ?? "";

  const [tasks, setTasks] = useState<Record<string, Task>>(initialTaskList);

  useEffect(() => {
    setTasks(initialTaskList);
  }, [initialTaskList]);

  const sortedTaskKeys = Object.keys(tasks).sort((t1, t2) => {
    return tasks[t1].order - tasks[t2].order;
  });

  const sortedUnCompletedTaskKeys = Object.keys(tasks)
    .filter((t) => !tasks[t].completed)
    .sort((t1, t2) => {
      return tasks[t1].order - tasks[t2].order;
    });
  const sortedCompletedTaskKeys = Object.keys(tasks)
    .filter((t) => tasks[t].completed)
    .sort((t1, t2) => {
      return tasks[t1].order - tasks[t2].order;
    });

  const [newTaskText, setNewTaskText] = useState("");

  const { call: addTaskFn } = useInvokeApiFunction(createTask, "add", "task");
  const handleAddTask = () => {
    const newTask: Task = {
      label: newTaskText,
      uid,
      date: constructDateString(date),
      completed: false,
      order:
        sortedTaskKeys.length > 0
          ? tasks[sortedTaskKeys[sortedTaskKeys.length - 1]].order + 1
          : 0,
    };
    setNewTaskText("");
    addTaskFn(newTask)
      .then((taskId) => {
        setTasks((prevTasks) => ({
          ...prevTasks,
          [taskId]: newTask,
        }));
      })
      .catch(() => {});
  };

  const { call: deleteTaskFn } = useInvokeApiFunction(
    deleteTask,
    "delete",
    "task"
  );
  const handleDeleteTask = (taskId: string) => {
    deleteTaskFn({ taskId })
      .then(() => {
        setTasks((prevTasks) => {
          const newTasks = {
            ...prevTasks,
          };
          delete newTasks[taskId];
          return newTasks;
        });
      })
      .catch(() => {});
  };

  const { call: updateTaskFn } = useInvokeApiFunction(
    updateTask,
    "update",
    "task"
  );
  const handleCheckTask = (taskId: string, completed: boolean) => {
    updateTaskFn({ taskId, task: { completed } })
      .then(() => {
        setTasks((prevTasks) => ({
          ...prevTasks,
          [taskId]: {
            ...prevTasks[taskId],
            completed,
          },
        }));
      })
      .catch(() => {});
  };
  const isMobileDevice = useIsMobileDevice();

  return (
    <Box>
      <Table size={"small"}>
        <TableBody>
          {[...sortedUnCompletedTaskKeys, ...sortedCompletedTaskKeys].map(
            (taskId) => (
              <HoverRow
                key={taskId}
                cells={(isHovering) => (
                  <>
                    <TableCell padding={"checkbox"} sx={{ maxWidth: 74 }}>
                      <Checkbox
                        onChange={(_evt, checked) =>
                          handleCheckTask(taskId, checked)
                        }
                        checked={tasks[taskId].completed}
                      />
                    </TableCell>
                    <TableCell
                      padding={"none"}
                      sx={{
                        textDecoration: tasks[taskId].completed
                          ? "line-through"
                          : undefined,
                        color: tasks[taskId].completed
                          ? "text.secondary"
                          : undefined,
                      }}
                    >
                      {tasks[taskId].label}
                    </TableCell>
                    <TableCell align={"right"}>
                      {isHovering || isMobileDevice ? (
                        <IconButton onClick={() => handleDeleteTask(taskId)}>
                          <DeleteIcon />
                        </IconButton>
                      ) : (
                        <Box height={40} />
                      )}
                    </TableCell>
                  </>
                )}
              />
            )
          )}
        </TableBody>
      </Table>
      <Box px={2} py={1}>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            handleAddTask();
          }}
        >
          <TextField
            value={newTaskText}
            onChange={(evt) => setNewTaskText(evt.target.value)}
            // size={"small"}
            variant="standard"
            placeholder="Add a task"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type={"submit"}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
    </Box>
  );
}
