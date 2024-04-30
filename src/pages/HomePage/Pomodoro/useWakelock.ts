import { useSettings } from "atoms/settingsAtom";
import { useEffect } from "react";

export function useWakelock(wakelockRequested: boolean) {
  const wakeLocksSupported = "wakeLock" in navigator;

  const { keepScreenOn } = useSettings();

  const shouldHaveWakeLock =
    wakelockRequested && wakeLocksSupported && keepScreenOn;

  useEffect(() => {
    // Visibility change listener
    let wakeLock: WakeLockSentinel;
    const requestWakeLock = async () => {
      try {
        console.debug("Requesting wakeLock...");
        wakeLock?.release();
        wakeLock = await navigator.wakeLock.request("screen");
        console.debug("Wake Lock Granted");
        wakeLock.addEventListener("release", () => {
          console.debug("Wake Lock Released:", wakeLock.released);
        });
      } catch (err: unknown) {
        console.error(`Error requesting wakeLock: ${err}`);
      }
    };

    if (shouldHaveWakeLock) {
      requestWakeLock();
      document.addEventListener("visibilitychange", requestWakeLock);
    }

    return () => {
      document.removeEventListener("visibilitychange", requestWakeLock);
      wakeLock?.release();
    };
  }, [shouldHaveWakeLock]);
}
