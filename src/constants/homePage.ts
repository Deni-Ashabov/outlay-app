export const asideMenuItems = [
  'По проекту',
  'Объекты',
  'РД',
  'МТО',
  'СМР',
  'График',
  'МиМ',
  'Рабочие',
  'Капвложения',
  'Бюджет',
  'Финансирование',
  'Панорамы',
  'Камеры',
  'Поручения',
  'Контрагенты',
].map((title, i) => ({ id: i + 1, title, isActive: title.includes('СМР') }))

export const initialRow = {
  id: 133882,
  rowName: "4ae93caf-55ea-471f-b0f5-ce293016f043"
}

export const tempRow = {
  rowName: '',
  total: 0,
  salary: 0,
  mimExploitation: 0,
  machineOperatorSalary: 0,
  materials: 0,
  mainCosts: 0,
  supportCosts: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfile: 0,
  child: [],
  isTemp: true
}
