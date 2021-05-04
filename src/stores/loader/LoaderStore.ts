import { createStore } from "effector";
import { cloneDeep } from "lodash";

import { setLoading } from "./LoaderEvents";
import LoaderState from "./LoaderState";

const initialState: LoaderState = {
  isLoading: false,
};

const LoaderStore = createStore<LoaderState>(initialState).on(
  setLoading,
  (state, isLoading) =>
    cloneDeep({
      ...state,
      ...isLoading,
    })
);

export default LoaderStore;
