import {
  createFirstLevelChildOutlayRow,
  createOutlayRowFx,
  deleteChildOutlayRow,
  deleteOutlayRow,
  getOutlayRowsFx,
  outlay,
  setIsRowEditMode,
  updateOutlayRowFx,
} from ".";
import { tempRow } from "../../constants/homePage";
import { IOutlayRowsData } from "../../types/outlay";

export const $outlayRowsData = outlay
  .createStore<IOutlayRowsData[]>([])
  .on(getOutlayRowsFx.done, (_, { result }) => !result.length
  // get all data when page is loading and if there is no data,
  // create initial row
    ? [{
        id: 1,
        ...tempRow
      }]
    : result
  )
  .on(deleteOutlayRow, (state, { rowId }) =>
    state.filter((item) => item.id !== rowId
  ))
  .on(deleteChildOutlayRow, (state, { rowId }) =>
    state.map((item) => ({
      ...item,
      child: state[0].child.filter((child) => child.id !== rowId)
  })))
  .on(createFirstLevelChildOutlayRow, (state, row) =>
    state.map((item) => ({
    ...item, child: item.child ? [...item.child, row] : [row]
  })))
  .on(updateOutlayRowFx.done, (state, { result }) => result.changed?.length ?
  [
    ...state.map((item) => item.id === result.changed[0].id
        ? ({
          ...item,
          child: item.child.map((item) => item.id === result.current.id
            ? ({ ...item, ...result.current })
            : item)
          })
        : item
      ),
    ] : state.map((item) => item.id === result.current.id
      ? ({ ...item, ...result.current })
      : item
    )
  )
  .on(createOutlayRowFx.done, (state, { result }) => result.changed?.length
    ? [
      ...state
        .filter((item) => item.id !== 1)
        .map((item) => item.id === result.changed[0].id
          ? ({ ...item, child: [...item.child.filter((item) => !item.isTemp), result.current] })
          : item
        ),
      ]
    : [...state.filter((item) => item.id !== 1), result.current]
  )

export const $isRowEditMode = outlay.createStore(false)
  .on(setIsRowEditMode, (_, value) => value)

