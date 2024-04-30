import { Checkbox, FormControlLabel } from "@mui/material";
import { useSettingsState } from "atoms/settingsAtom";

export function PomodoroSettings() {
  const [settings, setSettings] = useSettingsState();

  return (
    <>
      {"wakeLock" in navigator && (
        <FormControlLabel
          label={"Keep Screen On"}
          control={
            <Checkbox
              checked={settings.keepScreenOn}
              onChange={(_, checked) => setSettings({ keepScreenOn: checked })}
            />
          }
          sx={{ ml: 0 }}
        />
      )}
    </>
  );
}
