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
import { themr } from 'react-css-themr'
import shortid from 'shortid'
import IconLongArrowDown from 'react-icons/lib/fa/long-arrow-down'
import IconLongArrowUp from 'react-icons/lib/fa/long-arrow-up'
import IconSort from 'react-icons/lib/fa/sort'

import Checkbox from '../Checkbox'

const applyThemr = themr('UITable')

const isAscending = order => (order === 'ascending')

const getOrderIcon = order => (
  isAscending(order) ?
    <IconLongArrowUp /> :
    <IconLongArrowDown />
)

class TableHead extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allSelected: false,
      columnIndex: props.columnIndex,
    }

    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
  }

  handleOrderChange () {
    const { onOrder, columnIndex } = this.props
    onOrder(columnIndex)
  }

  renderColumn (column, index) {
    const { theme, columnIndex, order } = this.props
    const selected = columnIndex === index
    const selectedClass = selected ? theme.active : ''

    return (
      <th
        key={`column_${index + 1}`}
        className={selectedClass}
        onClick={this.handleOrderChange}
      >
        <span> {column.title} </span>
        {
          selected &&
          <span>{ getOrderIcon(order) }</span>
        }
        {
          !selected &&
          <span><IconSort /></span>
        }
      </th>
    )
  }

  render () {
    const {
      allSelected,
      columns,
      expandable,
      onSelect,
      selectable,
      theme,
    } = this.props

    return (
      <thead className={theme.tableHead}>
        <tr>
          { selectable &&
            <th className={theme.check}>
              <Checkbox
                name="all"
                id={shortid()}
                value="all"
                label=""
                onChange={onSelect}
                checked={allSelected}
              />
            </th>
          }
          {
            columns.map(this.renderColumn)
          }
          { expandable &&
            <th className={theme.open} />
          }
        </tr>
      </thead>
    )
  }
}

TableHead.propTypes = {
  theme: shape({
    tableHead: string,
    ascending: string,
    descending: string,
    open: string,
  }),
  columns: arrayOf(shape({
    title: string.isRequired,
    acessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    renderer: func,
  })).isRequired,
  columnIndex: number.isRequired,
  onOrder: func,
  onSelect: func,
  order: string,
  expandable: bool,
  selectable: bool,
  allSelected: bool,
}

TableHead.defaultProps = {
  theme: {},
  onSelect: null,
  onOrder: null,
  order: 'ascending',
  expandable: false,
  selectable: false,
  allSelected: false,
}

export default applyThemr(TableHead)


// <tr>
//           <th className={theme.check}>
//             <Checkbox
//               name="all"
//               id="all"
//               value="all"
//               label=""
//               onChange={() => null}
//               checked={checked}
//             />
//           </th>
//           <th className={theme.status}>
//             <span>
//               Status
//             </span>
//             <span>
//               <IconLongArrowUp />
//             </span>
//           </th>
//           <th>
//             <div className={theme.title}>
//               <span>
//                 ID da transação
//               </span>
//               <span>
//                 <IconLongArrowUp />
//               </span>
//             </div>
//           </th>
//           <th>
//             <div className={theme.title}>
//               <span>
//               Data da transação
//               </span>
//               <span>
//                 <IconLongArrowUp />
//               </span>
//             </div>
//           </th>
//           <th>
//             <div className={theme.title}>
//               <span>
//               CPF / CNPJ
//               </span>
//               <span>
//                 <IconLongArrowUp />
//               </span>
//             </div>
//           </th>
//           <th>
//             <div className={theme.title}>
//               <span>
//               Forma de pagamento
//               </span>
//               <span>
//                 <IconLongArrowUp />
//               </span>
//             </div>
//           </th>
//           <th>
//             <div className={theme.title}>
//               <span>
//               Valor capturado
//               </span>
//               <span>
//                 <IconLongArrowUp />
//               </span>
//             </div>
//           </th>
//           <th className={theme.active}>
//             <div className={theme.title}>
//               <span>
//               Custo
//               </span>
//               <span>
//                 <IconLongArrowUp />
//               </span>
//             </div>
//           </th>
//           <th className={theme.open} />
//         </tr>
