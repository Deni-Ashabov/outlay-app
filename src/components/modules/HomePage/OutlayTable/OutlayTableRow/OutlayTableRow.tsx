import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useUnit } from 'effector-react';
import { IOutlayTableRowProps } from '../../../../../types/outlay';
import {
  createFirstLevelChildOutlayRow,
  createOutlayRow,
  deleteOutlayRow,
  setIsRowEditMode,
  updateOutlayRow
} from '../../../../../context/outlay';
import { deleteChildOutlayRow } from '../../../../../context/outlay/index';
import { $isRowEditMode } from '../../../../../context/outlay/state';
import { tempRow } from '../../../../../constants/homePage';
import './styles.scss'

export default function OutlayTableRow({
  row,
  isFirstLevelChild
}: IOutlayTableRowProps) {
  const [showDeleteAction, setShowDeleteAction] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const isRowEditMode = useUnit($isRowEditMode)

  const rowNameRef = useRef() as MutableRefObject<HTMLInputElement>
  const salaryRef = useRef() as MutableRefObject<HTMLInputElement>
  const equipmentCostsRef = useRef() as MutableRefObject<HTMLInputElement>
  const overheadsRef = useRef() as MutableRefObject<HTMLInputElement>
  const machineOperatorSalaryRef = useRef() as MutableRefObject<HTMLInputElement>

  const handleShowDeleteAction = () => setShowDeleteAction(true)
  const handleHideDeleteAction = () => setShowDeleteAction(false)

  const handleAllowCreating = () => {
    setIsRowEditMode(true)

    createFirstLevelChildOutlayRow({
      ...tempRow,
      id: row.id,
    })
  }

  const handleAllowEditing = () => {
    setIsEditing(true)
    setIsRowEditMode(true)
  }

  useEffect(() => {
    if (!row.rowName &&
      !row.machineOperatorSalary &&
      !row.salary &&
      !row.equipmentCosts &&
      !row.overheads
    ) {
      setIsRowEditMode(true)
      setIsEditing(true)
      setIsCreating(true)
    }
  }, [
    row.equipmentCosts,
    row.machineOperatorSalary,
    row.overheads,
    row.rowName,
    row.salary
  ])

  const handleManipulateWithRow = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isCreating) {
      if (e.key === 'Enter') {
        createOutlayRow({
          salary: +salaryRef.current.value,
          equipmentCosts: +equipmentCostsRef.current.value,
          rowName: rowNameRef.current.value,
          machineOperatorSalary: +machineOperatorSalaryRef.current.value,
          overheads: +overheadsRef.current.value,
          setIsCreating,
          setIsEditing,
          parentId: row.id === 1 ? null : row.id,
        })
      }
      return
    }

    if (isEditing) {
      if (e.key === 'Enter') {
        updateOutlayRow({
          salary: +salaryRef.current.value,
          equipmentCosts: +equipmentCostsRef.current.value,
          rowName: rowNameRef.current.value,
          machineOperatorSalary: +machineOperatorSalaryRef.current.value,
          overheads: +overheadsRef.current.value,
          setIsEditing,
          rowId: row.id,
        })
      }
    }
  }

  const handleDeleteRow = () => {
    if (isFirstLevelChild) {
      deleteChildOutlayRow({ rowId: row.id })
      return
    }

    deleteOutlayRow({ rowId: row.id })
  }

  return (
    <>
      <tr
        className='outlay_row'
        {...(!isRowEditMode && {
          onDoubleClick: handleAllowEditing
        })}
      >
        <td className='outlay_row__inner'>
          <div
            className='outlay_row__actions'
            style={{ left: isFirstLevelChild ? 42 : 15 }}
            {...(!isRowEditMode && {
              onMouseEnter: handleShowDeleteAction,
              onMouseLeave: handleHideDeleteAction
            })}
          >
            <button
              className="outlay_row__actions__create btn_reset"
              // using isFirstLevelChild I set the limit to up to the first nesting level
              // if desired, i can expand the functionality by adding a script,
              // for example with isSecondLevelChild,
              // isThirdLevelChild, etc.
              {...(!isRowEditMode && !isFirstLevelChild && {
                onClick: handleAllowCreating
              })}
            />
            {showDeleteAction && !isRowEditMode && (
              <div className='outlay_row__actions__inner'>
                <button
                  className="outlay_row__actions__delete btn_reset"
                  onClick={handleDeleteRow}
                />
              </div>
            )}
          </div>
          {isFirstLevelChild && (
            <span className='outlay_row__inner_line_left outlay_row__inner_line' />
          )}
          {isFirstLevelChild && (
            <span className='outlay_row__inner_line_up outlay_row__inner_line' />
          )}
        </td>
        <td>
          {isEditing
          ? <input
              type="text"
              className='outlay_row__input'
              placeholder={row.rowName || ''}
              onKeyDown={handleManipulateWithRow}
              ref={rowNameRef}
            />
          : <span>{row.rowName}</span>}
        </td>
        <td>
          {isEditing
          ? <input type="number"
              min={0}
              className='outlay_row__input'
              placeholder={`${row.salary}`}
              onKeyDown={handleManipulateWithRow}
              ref={salaryRef}
            />
          : <span>{row.salary}</span>}
        </td>
        <td>
          {isEditing
          ? <input
              type="number"
              min={0}
              className='outlay_row__input'
              placeholder={`${row.equipmentCosts}`}
              onKeyDown={handleManipulateWithRow}
              ref={equipmentCostsRef}
            />
          : <span>{row.equipmentCosts}</span>}
        </td>
        <td>
          {isEditing
          ? <input
              type="number"
              min={0}
              className='outlay_row__input'
              placeholder={`${row.overheads}`}
              onKeyDown={handleManipulateWithRow}
              ref={overheadsRef}
            />
          : <span>{row.overheads}</span>}
        </td>
        <td>
          {isEditing
          ? <input
              type="number"
              min={0}
              className='outlay_row__input'
              placeholder={`${row.machineOperatorSalary}`}
              onKeyDown={handleManipulateWithRow}
              ref={machineOperatorSalaryRef}
            />
          : <span>{row.machineOperatorSalary}</span>}
        </td>
      </tr>
      {!!row.child?.length && row.child.map((row) => (
        <OutlayTableRow
          key={row.id}
          row={row}
          isFirstLevelChild
        />
      ))}
    </>
  );
};
