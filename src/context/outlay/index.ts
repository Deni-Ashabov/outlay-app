import { createDomain } from "effector"
import toast from 'react-hot-toast'
import { createGate } from "effector-react"
import api from '../../api/axiosClient'
import { initialRow } from "../../constants/homePage"
import {
  ICreateOutlayRowFx,
  IDeleteOutlayRowFx,
  IOutlayRowsData,
  IUpdateOutlayRowFx
} from "../../types/outlay"

export const outlay = createDomain()

export const HomePageGate = createGate()

export const getOutlayRows = outlay.createDomain()
export const createOutlayRow = outlay.createEvent<ICreateOutlayRowFx>()
export const updateOutlayRow = outlay.createEvent<IUpdateOutlayRowFx>()
export const deleteOutlayRow = outlay.createEvent<IDeleteOutlayRowFx>()
export const createFirstLevelChildOutlayRow = outlay.createEvent<IOutlayRowsData>()
export const deleteChildOutlayRow = outlay.createEvent<IDeleteOutlayRowFx>()
export const setIsRowEditMode = outlay.createEvent<boolean>()

export const getOutlayRowsFx = outlay.createEffect(async () => {
  try {
    const { data } = await api.get(`/outlay-rows/entity/${initialRow.id}/row/list`)

    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const createOutlayRowFx = outlay.createEffect(
  async ({ ...payload }: ICreateOutlayRowFx) => {
  try {
    const { data } = await api.post(
      `/outlay-rows/entity/${initialRow.id}/row/create`,
      {
        ...payload,
        estimatedProfit: 0,
        mainCosts: 0,
        mimExploitation: 0,
        supportCosts: 0,
        materials: 0
      }
    )

    toast.success('Успешно создано!')

    payload.setIsCreating(false)
    payload.setIsEditing(false)
    setIsRowEditMode(false)

    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const updateOutlayRowFx = outlay.createEffect(
  async ({ ...payload }: IUpdateOutlayRowFx) => {
  try {
    const { data } = await api.post(
      `/outlay-rows/entity/${initialRow.id}/row/${payload.rowId}/update`,
      {
        ...payload,
        estimatedProfit: 0,
        mainCosts: 0,
        mimExploitation: 0,
        supportCosts: 0,
        materials: 0
      }
    )

    toast.success('Успешно обновлено!')

    payload.setIsEditing(false)
    setIsRowEditMode(false)

    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const deleteOutlayRowFx = outlay.createEffect(
  async ({ rowId }: IDeleteOutlayRowFx) => {
  try {
    await api.delete(
      `/outlay-rows/entity/${initialRow.id}/row/${rowId}/delete`
    )

    toast.success('Успешно удалено!')
    return rowId
  } catch (error) {
    toast.error((error as Error).message)
  }
})
