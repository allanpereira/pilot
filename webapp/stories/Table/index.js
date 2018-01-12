import React, { PureComponent } from 'react'
import {
  compose,
  ifElse,
  path,
  pipe,
  prop,
  reverse,
  sortBy,
  toLower,
} from 'ramda'
import { storiesOf } from '@storybook/react'

import Table from '../../src/components/Table'
import Legend from '../../src/components/Legend'

import style from './style.css'

const mock = {
  columns: [
    {
      title: 'Status',
      renderer: item => (
        <Legend
        color={item.status_color}
        acronym={item.status_acronym}
        hideLabel
        >
        {item.status}
        </Legend>
      ),
      acessor: ['status'],
    },
    { title: 'Id da transacao', acessor: ['id'] },
    { title: 'Data da transacao', acessor: ['date_created'] },
    { title: 'Cpf/Cnpj', acessor: ['document_number'] },
    { title: 'Forma de pagamento', acessor: ['payment_method'] },
    { title: 'Valor capturado', acessor: ['paid_amount'] },
    { title: 'Custo', acessor: ['cost'] },
    { title: 'Valor Líquido', acessor: ['amount'] },
    { title: 'E-mail', acessor: ['customer','email'] },
    { title: 'Razão da recusa', acessor: ['refuse_reason'] },
    { title: 'Antifraude', acessor: ['antifraud_score'] },
    { title: 'Parcelas', acessor: ['installments'] },
    { title: 'Nome', acessor: ['customer','name'] },
    { title: 'Bandeira', acessor: ['card_brand'] },
    { title: 'Link do boleto', acessor: ['link'] },
  ],
  rows: [
    {
      antifraud_score: null,
      card_brand: null,
      cost: 'R$ 100.000,00',
      customer: {
        email: null,
        name: null,
      },
      date_created: '23/09/2017 - 14:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597000',
      installments: 1,
      link: 'link maroto do boleto',
      paid_amount: 'R$ 999.999.999,00',
      amount: 'R$ 999.999.999,00',
      payment_method: 'Boleto',
      refuse_reason: null,
      status: 'Boleto pago com valor inferior',
      status_acronym: 'BPVI',
      status_color: '#244d85',
    },
    {
      antifraud_score: 'Approved',
      card_brand: 'master',
      cost: 'R$ 12.000,00',
      paid_amount: 'R$ 100.000,00',
      customer: {
        email: 'null@undefined.com',
        name: 'null da undefined de NaN',
      },
      date_created: '23/09/2017 - 15:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597001',
      installments: '4X',
      link: null,
      amount: 'R$ 400.000,00',
      payment_method: 'Cartão de credito',
      refuse_reason: null,
      status: 'Pago',
      status_acronym: 'P',
      status_color: '#57be76',
    },
    {
      antifraud_score: 'Approved',
      card_brand: 'master',
      cost: 'R$ 13.000,00',
      paid_amount: 'R$ 100.000,00',
      customer: {
        email: 'null@undefined.com',
        name: 'null da undefined de NaN',
      },
      date_created: '23/09/2017 - 16:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597003',
      installments: '5X',
      link: null,
      amount: 'R$ 500.000,00',
      payment_method: 'Cartão de credito extrangeiro',
      refuse_reason: null,
      status: 'Chargeback',
      status_acronym: 'CB',
      status_color: '#e47735',
    },
    {
      amount: 'R$ 600.000,00',
      antifraud_score: null,
      card_brand: 'master',
      cost: 'R$ 14.000,00',
      customer: {
        email: 'null@undefined.com',
        name: 'null da undefined de NaN',
      },
      date_created: null,
      document_number: null,
      id: '2229597004',
      installments: '6X',
      link: null,
      paid_amount: null,
      payment_method: null,
      refuse_reason: null,
      status: 'Processing',
      status_acronym: 'PR',
      status_color: '#951e3c',
    },
  ],
}

const isAscending = order => order === 'ascending'

const rowSort = acessor =>
  sortBy(compose(toLower, path(acessor)))

const getSort = (acessor, order) =>
  isAscending(order) ?
  rowSort(acessor) :
  pipe(rowSort(acessor), reverse)

const getRowsSort = (rows, columns) =>
  (columnIndex, order) => {
    const referenceColumn = columns[columnIndex]
    const referenceAcessor = referenceColumn.acessor
    const sort = getSort(referenceAcessor, sort)
    return sort(rows)
  }

class TableState extends PureComponent {
  constructor () {
    super()
    this.state = {
      columnIndex: 0,
      order: 'ascending',
      rows: mock.rows,
      columns: mock.columns,
      seleectedRows: [],
      expandedRows: []
    }
    this.handleOrderChange = this.handleOrderChange.bind(this)
  }
  handleOrderChange (index, order) {
    const { rows, columns } = this.state
    const sortByColumnIndex = getRowsSort(rows, columns)
    const sortedRows = sortByColumnIndex(index, order)
    this.setState({
      columnIndex: index,
      order,
      rows: sortedRows,
      seleectedRows: [],
      expandedRows: [],
    })
  }

  render () {
    const {
      columnIndex,
      columns,
      order,
      rows,
      seleectedRows,
      expandedRows,
    } = this.state
    return (
      <div className={style.container}>
        <Table
          columns={columns}
          rows={rows}
          selectable
          expandable
          selectedRows={seleectedRows}
          expandedRows={expandedRows}
          onOrder={this.handleOrderChange}
          orderingSequence={order}
          columnIndex={columnIndex}
        />
      </div>
    )
  }
}

storiesOf('Table', module)
  .add('defaultTheme', () => <TableState />)

