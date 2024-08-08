export interface IOutlayRowsData {
  id: number,
  rowName: string,
  total: number,
  salary: number,
  mimExploitation: number,
  machineOperatorSalary: number,
  materials: number,
  mainCosts: number,
  supportCosts: number,
  equipmentCosts: number,
  overheads: number,
  estimatedProfile: number,
  child: IOutlayRowsData[]
  isTemp?: boolean
}

interface IBaseRowFields {
  equipmentCosts: number
  machineOperatorSalary: number
  overheads: number
  rowName: string
  salary: number
  setIsEditing: (arg0: boolean) => void
}

export interface ICreateOutlayRowFx extends IBaseRowFields {
  parentId: number | null
  setIsCreating: (arg0: boolean) => void
}

export interface IUpdateOutlayRowFx extends IBaseRowFields {
  rowId: number
}

export interface IDeleteOutlayRowFx {
  rowId: number
}

export interface IOutlayTableRowProps {
  row: IOutlayRowsData,
  isFirstLevelChild: boolean
}
