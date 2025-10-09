"use client";

import { Provider } from "react-redux";
import store from "./store";
import LoadAuth from "./RehydrateAuth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LoadAuth />
      {children}
    </Provider>
  );
}