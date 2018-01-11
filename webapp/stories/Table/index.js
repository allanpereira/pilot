import React, { PureComponent } from 'react'

import { storiesOf } from '@storybook/react'

import Table from '../../src/components/Table'
import Legend from '../../src/components/Legend'

import style from './style.css'

const mock = {
  columns: [
    { title: 'Id da transacao', acessor: ['id'] },
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
    },
    { title: 'Data da transacao', acessor: ['date_created'] },
    { title: 'Cpf/Cnpj', acessor: ['document_number'] },
    { title: 'Forma de pagamento', acessor: ['payment_method'] },
    { title: 'Valor capturado', acessor: ['paid_amount'] },
    { title: 'Custo', acessor: ['cost'] },
  ],
  data: [
    {
      status: 'Boleto pago com valor inferior',
      status_acronym: 'BPVI',
      status_color: '#244d85',
      id: '2229597000',
      date_created: '23/09/2017 - 14:15h',
      document_number: '67.484.928/0001-60',
      payment_method: 'boleto',
      paid_amount: 'R$ 999.999.999,00',
      cost: 'R$ 100.000,00',
    },
    {
      status: 'Pago',
      status_acronym: 'P',
      status_color: '#57be76',
      id: '2229597000',
      date_created: '23/09/2017 - 14:15h',
      document_number: '67.484.928/0001-60',
      payment_method: 'boleto',
      paid_amount: 'R$ 999.999.999,00',
      cost: 'R$ 100.000,00',
    },
  ],
}

class TableState extends PureComponent {
  constructor () {
    super()
    this.state = {
      columnIndex: 0,
      order: 'ascending'
    }
    this.handleOrderChange = this.handleOrderChange.bind(this)
  }
  handleOrderChange (index, order) {
    this.setState({
      columnIndex: index,
      order
    })
  }
  render () {
    const {
      columnIndex,
      order,
    } = this.state
    return (
      <div className={style.container}>
        <Table
          columns={mock.columns}
          rows={mock.data}
          selectable
          expandable
          selectedRows={[0]}
          expandedRows={[1]}
          onSelectRow={() => null}
          onExpandRow={() => null}
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

