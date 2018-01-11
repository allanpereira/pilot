import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  func,
  oneOf,
  oneOfType,
  shape,
  string,
  number,
} from 'prop-types'
import {
  path,
  has,
} from 'ramda'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import shortid from 'shortid'

import IconArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import IconArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import Button from '../Button'
import Checkbox from '../Checkbox'

const applyThemr = themr('UITable')

const hasRenderer = has('renderer')

const accessColumnData = acessor => path(acessor)

const getColData = (column, data) => {
  const key = shortid()
  if (hasRenderer(column)) {
    return <td key={key}> {column.renderer(data)} </td>
  }
  const getColumnData = accessColumnData(column.acessor)
  const columnData = getColumnData(data)
  if (columnData) {
    return <td key={key}> {columnData} </td>
  }
  return <td key={key}> special </td>
}

const renderCells = (columns, data) =>
  columns.map(col => getColData(col, data))


class TableRow extends Component {
  constructor (props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
  }

  handleExpand () {
    const { index, onExpand } = this.props
    onExpand(index)
  }

  handleSelect () {
    const { index, onSelect } = this.props
    onSelect(index)
  }

  render () {
    const {
      className,
      columns,
      data,
      striped,
      theme,
      expanded,
      selected,
      index,
    } = this.props

    const tableRow = classNames(
      theme[striped],
      className
    )

    return (
      <tr className={tableRow}>
        <td>
          <Checkbox
            name={`line_${index + 1}`}
            id={shortid()}
            value={`${index}`}
            label=""
            onChange={this.handleSelect}
            checked={selected}
          />
        </td>
        {
          renderCells(columns, data)
        }
        <td className={theme.open}>
          <Button
            type="button"
            fill="outline"
            size="tiny"
            relevance="low"
            className={theme.arrow}
            onClick={this.handleExpand}
          >
            { !expanded && <IconArrowDown />}
            { expanded && <IconArrowUp />}
          </Button>
        </td>
      </tr>
    )
  }
}

TableRow.propTypes = {
  theme: shape({
    even: string,
    odd: string,
    check: string,
    status: string,
    open: string,
  }),
  className: string,
  columns: arrayOf(shape({
    title: string.isRequired,
    acessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    renderer: func,
  })).isRequired,
  data: shape({}).isRequired,
  expanded: bool,
  onExpand: func,
  onSelect: func,
  selected: bool,
  striped: oneOf(['even', 'odd']),
  index: number.isRequired,
}

TableRow.defaultProps = {
  className: '',
  expanded: false,
  onExpand: () => null,
  onSelect: () => null,
  selected: false,
  striped: 'even',
  theme: {},
}

export default applyThemr(TableRow)
