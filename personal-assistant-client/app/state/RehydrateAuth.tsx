// app/src/state/RehydrateAuth.tsx
"use client";

import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { setLogin } from "./slices/authSlice";

export default function RehydrateAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setLogin(token));
    }
  }, [dispatch]);

  return null;
}
