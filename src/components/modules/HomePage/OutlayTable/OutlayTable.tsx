import { useUnit } from 'effector-react';
import { $outlayRowsData } from '../../../../context/outlay/state';
import OutlayTableRow from './OutlayTableRow/OutlayTableRow';
import './styles.scss'

export default function OutlayTable() {
  const outlayRowData = useUnit($outlayRowsData)

  return (
    <table className="outlay_table">
      <thead>
        <tr>
          <th>Уровень</th>
          <th>Наименование работ</th>
          <th>Основная з/п</th>
          <th>Оборудование</th>
          <th>Накладные расходы</th>
          <th>Сметная прибыль</th>
        </tr>
        </thead>
        <tbody>
          {!!outlayRowData?.length && outlayRowData.map((row) => (
            <OutlayTableRow key={row.id} row={row} isFirstLevelChild={false} />
          ))}
        </tbody>
    </table>
  );
};
