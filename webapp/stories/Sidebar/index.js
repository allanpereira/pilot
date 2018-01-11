import React from 'react'
import { storiesOf } from '@storybook/react'

import MdMenu from 'react-icons/lib/md/menu'
import MdEventNote from 'react-icons/lib/md/event-note'
import MdFreeBreakfast from 'react-icons/lib/md/free-breakfast'
import shortid from 'shortid'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
} from '../../src/components/Sidebar'

import Tag from '../../src/components/Tag'
import SegmentedSwitch from '../../src/components/SegmentedSwitch'

const items = [
  {
    value: 'minha-conta',
    title: 'Minha conta',
    icon: MdEventNote,
  },
  {
    value: 'transacoes',
    title: 'Transações',
    icon: MdFreeBreakfast,
    options: [
      {
        value: 'estornadas',
        title: 'Estornadas',
      },
      {
        value: 'pagas',
        title: 'Pagas',
      }
    ]
  },
]

const infos = {
  title: 'Nome da empresa',
  showMsg: 'Mostrar saldo',
  hideMsg: 'Ocultar saldo',
  data: [
    {
      title: 'Disponível',
      value: <p><small>R$</small> 150000</p>,
      actionTitle: 'Sacar',
      action: (a) => console.log(a),
    },
    {
      title: 'A receber',
      value: <p><small>R$</small> 70000</p>,
      actionTitle: 'Antecipar',
      action: (a) => console.log(a),
    }
  ]
}

class SidebarState extends React.Component {
  constructor (props) {
    super(props)

    this.id = shortid.generate()

    this.state = {
      collapsed: false,
      selectedEnvironment: 'live',
    }

    this.handleEnvironment = this.handleEnvironment.bind(this)
  }

  handleEnvironment (env) {
    this.setState({
      selectedEnvironment: env,
    })
  }

  render() {
    const {
      collapsed,
      selectedEnvironment,
    } = this.state

    return (
      <Sidebar
        collapsed={collapsed}
        items={items}
        selected="transacoes.estornadas"
        onSwitchChange={this.handleEnvironment}
        selectedEnvironment={this.state.selectedEnvironment}
        infos={infos}
      >
        <SidebarHeader>
          <img src="https://assets.pagar.me/site/general/logo-light-3812e7ea6b596bdcc8c041f0edc4ff15.png" alt="Pagar.me" />
          <button onClick={() => this.setState({ collapsed: !collapsed })}>
            <MdMenu />
          </button>
        </SidebarHeader>

        <SidebarContent>
          {!collapsed
            ? <SegmentedSwitch
                items={['live', 'test']}
                selected={this.state.selectedEnvironment}
                name={`${this.id}-live-test`}
                onChange={this.handleEnvironment}
              />
            : <Tag key={selectedEnvironment}>{selectedEnvironment}</Tag>
          }
        </SidebarContent>
      </Sidebar>
    )
  }
}

storiesOf('Sidebar', module)
  .add('defaultTheme', () => <SidebarState />)
