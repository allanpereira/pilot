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
  SidebarLinks,
  SidebarLink,
} from '../../src/components/Sidebar'

import Tag from '../../src/components/Tag'
import SegmentedSwitch from '../../src/components/SegmentedSwitch'
import Balance from '../../src/components/Balance'

const items = [
  {
    value: 'minha-conta',
    title: 'Minha conta',
    icon: <MdEventNote />,
  },
  {
    value: 'transacoes',
    title: 'Transações',
    icon: <MdFreeBreakfast />,
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
      active: '',
      showInfos: false,
    }

    this.handleEnvironment = this.handleEnvironment.bind(this)
  }

  handleEnvironment (env) {
    this.setState({
      selectedEnvironment: env,
    })
  }

  render () {
    const {
      collapsed,
      selectedEnvironment,
      showInfos,
    } = this.state

    return (
      <Sidebar
        collapsed={collapsed}
        items={items}
        selected="transacoes.estornadas"
        onSwitchChange={this.handleEnvironment}
        selectedEnvironment={selectedEnvironment}
        infos={infos}
      >
        <SidebarHeader>
          <img src="https://assets.pagar.me/site/general/logo-light-3812e7ea6b596bdcc8c041f0edc4ff15.png" alt="Pagar.me" />
          <button onClick={() => this.setState({ collapsed: !collapsed })}>
            <MdMenu />
          </button>
        </SidebarHeader>

        <SidebarContent>
          {!collapsed ?
            <SegmentedSwitch
              items={['live', 'test']}
              selected={this.state.selectedEnvironment}
              name={`${this.id}-live-test`}
              onChange={this.handleEnvironment}
            />
            : <Tag key={selectedEnvironment}>{selectedEnvironment}</Tag>
          }
        </SidebarContent>

        { !collapsed &&
          <SidebarLink
            title="Nome da empresa"
            subTitle={showInfos ? 'ocultar saldo' : 'mostrar saldo'}
            info
            showInfos={showInfos}
            onClick={() => this.setState({ showInfos: !showInfos })}
          >
            {showInfos &&
              <Balance infos={infos.data} />
            }
          </SidebarLink>
        }

        <SidebarLinks>
          {items.map(item => (
            <SidebarLink
              active={item.value === this.state.active}
              to={item.value}
              title={item.title}
              icon={item.icon}
              onClick={to => this.setState({ active: to })}
            />
          ))}
        </SidebarLinks>
      </Sidebar>
    )
  }
}

storiesOf('Sidebar', module)
  .add('defaultTheme', () => <SidebarState />)
