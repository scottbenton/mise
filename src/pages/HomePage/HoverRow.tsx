import { TableRow, TableRowProps } from "@mui/material";
import { useState } from "react";

interface HoverRowProps extends Omit<TableRowProps<"tr">, "component"> {
  cells: (isHovering: boolean) => React.ReactNode;
}

export function HoverRow(props: HoverRowProps) {
  const { cells, ...tableRowProps } = props;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <TableRow
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...tableRowProps}
    >
      {cells(isHovering)}
    </TableRow>
  );
}
