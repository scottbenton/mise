import { useEffect } from "react";
import { useSetAuth } from "../atoms/authAtom";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

export function useSyncAuth() {
  const setAuth = useSetAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setAuth({
            uid: user.uid,
            username: user.displayName ?? undefined,
            loading: false,
          });
        } else {
          setAuth({
            loading: false,
          });
        }
      },
      (error) => {
        console.error(error);
        setAuth({
          loading: false,
          error,
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, [setAuth]);
}

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then(() => {})
    .catch(() => {});
}
