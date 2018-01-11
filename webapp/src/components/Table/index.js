import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types'
import {
  __,
  append,
  contains,
  ifElse,
  modulo,
  without,
} from 'ramda'
import { themr } from 'react-css-themr'
import shortid from 'shortid'

import TableHead from './TableHead'
import TableRow from './TableRow'
import TableExpandedRow from './TableExpandedRow'

const applyThemr = themr('UITable')

/**
 * Table notes
 * simple, light weight table with:
 * customizable columns which accept icons/components in the cells
 * expansible lines
 * coloumn ordenation in the header cells
 * lines with breakable lines
 * selector for all lines and a genereal selector in the header
 * reorganizable columns
 * zebra lines
 * default visualization mode for falsy values
 *
 * @param {Object} theme - the object like css classes names for css modules
 * @param {Array} columns - columns structure and data accessor for each column
 * each column must have a identifier, an header/title and a renderer or and accessor
 * @param {Array} data - data which will be used to create the lines
 * @param {Array} selectItems - a list of selected items identifiers
 *
 * @param {Boolean} sorable
 * @param {Boolean} loading
 * @param {Boolean} selectalbe
 * @param {Boolean} expandable
 * @param {Number} columnsLimit - limit of showable columns except by the utility
 * columns like select and expand
 */

const toggleItem = item => ifElse(
  contains(item),
  without([item]),
  append(item)
)

const toggleRow = (rowIndex, rows) => {
  const toggle = toggleItem(rowIndex)
  return toggle(rows)
}

const isOdd = modulo(__, 2)

const getStripedClass = ifElse(
  isOdd,
  () => 'odd',
  () => 'even'
)


class Table extends Component {
  constructor (props) {
    super(props)
    const { expandedRows, selectedRows } = props
    this.state = {
      expandedRows,
      selectedRows,
    }

    this.renderRow = this.renderRow.bind(this)
    this.handleRowSelect = this.handleRowSelect.bind(this)
    this.handleRowExpand = this.handleRowExpand.bind(this)
  }

  handleRowSelect (rowIndex) {
    const rows = toggleRow(rowIndex, this.state.selectedRows)
    this.setState({
      selectedRows: rows,
    })
    this.props.onSelectRow(rows)
  }

  handleRowExpand (rowIndex) {
    const rows = toggleRow(rowIndex, this.state.expandedRows)
    this.setState({
      expandedRows: rows,
    })
  }

  renderRow (row, index) {
    const { expandedRows, selectedRows } = this.state
    const { selectable, expandable, columns } = this.props
    const isExpanded = contains(index, expandedRows)
    const isSelected = contains(index, selectedRows)
    const stripedClass = getStripedClass(index)

    const rowProps = {
      key: shortid(),
      data: row,
      columns,
      striped: stripedClass,
      onExpand: this.handleRowExpand,
      onSelect: this.handleRowSelect,
      selectable,
      expandable,
      expanded: isExpanded,
      selected: isSelected,
      index,
    }

    const newRow = <TableRow {...rowProps} />

    if (isExpanded) {
      const expanded = <TableExpandedRow striped={stripedClass} data={row} />

      return [
        newRow,
        expanded,
      ]
    }

    return newRow
  }

  render () {
    const {
      theme,
      rows,
      columns,
    } = this.props
    return (
      <table className={theme.table}>
        <TableHead columns={columns} />
        <tbody className={theme.tableBody}>
          {
            rows.map(this.renderRow)
          }
        </tbody>
      </table>
    )
  }
}

Table.propTypes = {
  theme: shape({
    table: string,
  }),
  columns: arrayOf(shape({
    title: string.isRequired,
    acessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    renderer: func,
  })).isRequired,
  expandable: bool,
  rows: arrayOf(shape({})).isRequired,
  selectable: bool,
  selectedRows: arrayOf(number),
  expandedRows: arrayOf(number),
  onOpenDetails: func,
  onSelectRow: func,
}

Table.defaultProps = {
  theme: {},
  columns: [],
  rows: [],
  selectable: true,
  expandable: true,
  selectedRows: [],
  expandedRows: [],
  onOpenDetails: null,
  onSelectRow: null,
}

export default applyThemr(Table)
