import { createEvent } from "effector";

import LoaderState from "./LoaderState";

export const setLoading = createEvent<LoaderState>();
