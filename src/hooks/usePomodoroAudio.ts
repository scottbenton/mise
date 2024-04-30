import { useCallback, useEffect, useRef } from "react";

export function usePomodoroAudio() {
  const audio = useRef(
    new Audio(import.meta.env.BASE_URL + "notification.mp3")
  );
  const audioReady = useRef<boolean>(false);

  useEffect(() => {
    const loadAudio = () => {
      audio.current.load();
      document.removeEventListener("click", loadAudio);
      audioReady.current = true;
    };

    document.addEventListener("click", loadAudio);
  }, []);

  const playAudio = useCallback(() => {
    if (audioReady.current) {
      audio.current.play();
    }
  }, []);

  return playAudio;
}
