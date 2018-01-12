import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  func,
  number,
  oneOf,
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
 * @param {Boolean} selectable
 * @param {Boolean} expandable
 * @param {Number} columnsNumber - limit of showable columns except by the utility
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

const isAscending = order => order === 'ascending'

const getToggledOrder = ifElse(
  isAscending,
  () => 'descending',
  () => 'ascending'
)

const getExpansibleColumn = (columns, columnsNumber) =>
  columns.filter((col, idx) => idx >= columnsNumber)

class Table extends Component {
  constructor (props) {
    super(props)
    const {
      expandedRows,
      selectedRows,
      columnIndex,
    } = props
    this.state = {
      expandedRows,
      selectedRows,
      columnIndex,
    }
    this.handleColumnOrder = this.handleColumnOrder.bind(this)
    this.handleRowExpand = this.handleRowExpand.bind(this)
    this.handleRowSelect = this.handleRowSelect.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  componentWillReceiveProps ({ expandedRows, selectedRows }) {
    this.setState({
      expandedRows,
      selectedRows,
    })
  }

  handleRowSelect (rowIndex) {
    const rows = toggleRow(rowIndex, this.state.selectedRows)
    this.setState({
      selectedRows: rows,
    })
    if (this.props.onSelectRow) {
      this.props.onSelectRow(rows)
    }
  }

  handleRowExpand (rowIndex) {
    const rows = toggleRow(rowIndex, this.state.expandedRows)
    this.setState({
      expandedRows: rows,
    })
  }

  handleColumnOrder (index) {
    const { columnIndex } = this.state
    const { orderingSequence, onOrder } = this.props

    if (index === columnIndex) {
      onOrder(index, getToggledOrder(orderingSequence))
    } else {
      this.setState({
        columnIndex: index,
      })
      onOrder(index, orderingSequence)
    }
  }

  handleSelect () {
    const { selectedRows } = this.state
    const { rows } = this.props
    let newOrder = []
    if (selectedRows.length !== rows.length) {
      newOrder = rows.map((row, index) => index)
    }
    this.setState({
      selectedRows: newOrder,
    })
    if (this.props.onSelectRow) {
      this.props.onSelectRow(newOrder)
    }
  }

  renderRow (row, index) {
    const { expandedRows, selectedRows } = this.state
    const {
      columns,
      columnsNumber,
      selectable,
    } = this.props
    const isExpanded = contains(index, expandedRows)
    const isSelected = contains(index, selectedRows)
    const stripedClass = getStripedClass(index)
    const rowProps = {
      columns: columns.slice(0, columnsNumber),
      columnsNumber,
      data: row,
      expanded: isExpanded,
      index,
      key: shortid(),
      onExpand: this.handleRowExpand,
      onSelect: this.handleRowSelect,
      selectable,
      selected: isSelected,
      striped: stripedClass,
    }

    const newRow = <TableRow {...rowProps} />

    if (isExpanded) {
      const expanded = (<TableExpandedRow
        striped={stripedClass}
        data={row}
        columns={getExpansibleColumn(columns, columnsNumber)}
      />)

      return [
        newRow,
        expanded,
      ]
    }

    return newRow
  }

  render () {
    const {
      columnIndex,
      columns,
      columnsNumber,
      orderingSequence,
      rows,
      theme,
    } = this.props

    const allSelected = this.state.selectedRows.length === rows.length

    return (
      <table className={theme.table}>
        <TableHead
          columns={columns.slice(0, columnsNumber)}
          columnIndex={columnIndex}
          onOrder={this.handleColumnOrder}
          onSelect={this.handleSelect}
          selectable
          expandable
          allSelected={allSelected}
          order={orderingSequence}
        />
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
  columnIndex: number,
  columnsNumber: number,
  expandable: bool,
  expandedRows: arrayOf(number),
  onOrder: func.isRequired,
  onOpenDetails: func,
  onSelectRow: func,
  orderingColumn: number,
  orderingSequence: oneOf(['ascending', 'descending']),
  rows: arrayOf(shape({})).isRequired,
  selectable: bool,
  selectedRows: arrayOf(number),
}

Table.defaultProps = {
  columns: [],
  columnIndex: 0,
  columnsNumber: 7,
  expandable: true,
  expandedRows: [],
  onOpenDetails: null,
  onSelectRow: null,
  orderingColumn: 1,
  orderingSequence: 'ascending',
  rows: [],
  selectable: true,
  selectedRows: [],
  theme: {},
}

export default applyThemr(Table)
