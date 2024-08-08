import { sample } from "effector";
import {
  createOutlayRow,
  createOutlayRowFx,
  deleteChildOutlayRow,
  deleteOutlayRow,
  deleteOutlayRowFx,
  getOutlayRowsFx,
  HomePageGate,
  updateOutlayRow,
  updateOutlayRowFx
} from ".";
import { $outlayRowsData } from "./state"

sample({
  clock: HomePageGate.open,
  source: $outlayRowsData,
  fn: (_, data) => data,
  target: getOutlayRowsFx,
})

sample({
  clock: createOutlayRow,
  source: {},
  fn: (_, data) => data,
  target: createOutlayRowFx,
})

sample({
  clock: deleteOutlayRow,
  source: {},
  fn: (_, data) => data,
  target: deleteOutlayRowFx,
})

sample({
  clock: deleteChildOutlayRow,
  source: {},
  fn: (_, data) => data,
  target: deleteOutlayRowFx,
})

sample({
  clock: updateOutlayRow,
  source: $outlayRowsData,
  fn: (_, data) => data,
  target: updateOutlayRowFx,
})
