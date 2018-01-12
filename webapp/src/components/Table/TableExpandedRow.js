import React from 'react'
import {
  arrayOf,
  func,
  oneOfType,
  shape,
  string,
} from 'prop-types'
import {
  has,
  path,
} from 'ramda'
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import Button from '../Button'
import TableEmptyItem from './TableEmptyItem'

const applyThemr = themr('UITable')
const hasRenderer = has('renderer')
const accessColumnData = acessor => path(acessor)
const getColData = (column, data) => {
  if (hasRenderer(column)) {
    return <span> { column.renderer(data) } </span>
  }
  const getColumnData = accessColumnData(column.acessor)
  const columnData = getColumnData(data)
  if (columnData) {
    return <span> { columnData } </span>
  }
  return <TableEmptyItem />
}
const getRenderColumn = data => (column, index) => (
  <li key={`colum_${index}`}>
    <span> {column.title} </span>
    { getColData(column, data) }
  </li>
)

const TableExpandedRow = ({
  theme,
  striped,
  columns,
  data,
}) => {
  const renderColumn = getRenderColumn(data)
  const cols = columns.map(renderColumn)
  return (
    <tr className={classNames(theme.tableRow, theme[striped])}>
      <td colSpan="9">
        <div className={theme.merged}>
          <ul>
            { cols }
          </ul>
          <Button
            fill="outline"
            relevance="normal"
          >
            VER DETALHES
          </Button>
        </div>
      </td>
    </tr>
  )
}

TableExpandedRow.propTypes = {
  theme: shape({
    tableRow: string,
    merged: string,
    even: string,
    odd: string,
  }),
  columns: arrayOf(shape({
    title: string.isRequired,
    acessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    renderer: func,
  })).isRequired,
  data: shape({}).isRequired,
  striped: string,
}

TableExpandedRow.defaultProps = {
  theme: {},
  striped: '',
}

export default applyThemr(TableExpandedRow)
