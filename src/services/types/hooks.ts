import { store } from "../..";
import { TypedUseSelectorHook, useSelector as selector } from "react-redux";

export type TRootStore = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<TRootStore> = selector;