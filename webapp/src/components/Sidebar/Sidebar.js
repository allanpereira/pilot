import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import shortid from 'shortid'
import cx from 'classnames'
import IconArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import IconArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import Tag from '../Tag'
import Button from '../Button'

const applyThemr = themr('UISidebar')

class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: '',
      showInfos: false,
    }

    this.id = shortid.generate()

    this.renderList = this.renderList.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
    this.handleInfosClick = this.handleInfosClick.bind(this)
    this.renderInfos = this.renderInfos.bind(this)
  }

  handleSelection (value) {
    this.setState({
      selected: value,
    })
  }

  handleInfosClick () {
    this.setState({
      showInfos: !this.state.showInfos,
    })
  }

  renderInfos () {
    const {
      infos,
      theme,
    } = this.props

    const infoClasses = cx(theme.info, {
      [theme.showInfos]: this.state.showInfos,
    })

    return (
      <div className={infoClasses}>
        <p className={theme.title}>{infos.title}</p>
        <div
          className={theme.toggle}
          onClick={this.handleInfosClick}
          role="button"
          tabIndex="0"
        >
          {
            this.state.showInfos
              ? <p>{infos.hideMsg} <IconArrowUp /></p>
              : <p>{infos.showMsg} <IconArrowDown /></p>
          }
        </div>

        {this.state.showInfos &&
          <div className={theme.infoOptions}>
            <ul>
              {infos.data.map(info => (
                <li>
                  <p>{info.title}</p>
                  <p>{info.value}</p>
                  <Button
                    onClick={info.action}
                    fill="outline"
                  >
                    {info.actionTitle}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    )
  }

  renderList () {
    const {
      theme,
      items,
      collapsed,
    } = this.props

    return items.map((item) => {
      const classes = cx(theme.item, {
        [theme.itemSelected]: item.value === this.state.selected,
      })

      if (item.options) {
        return (
          <li
            key={`${this.id}-${item.value}`}
            className={classes}
          >
            <div
              className={theme.text}
              role="button"
              onClick={() => this.handleSelection(item.value)}
              tabIndex="0"
            >
              <item.icon size={collapsed ? 25 : 21} />

              <span>
                {item.title}
                {
                  this.state.selected === item.value
                    ? <IconArrowUp size={18} />
                    : <IconArrowDown size={18} />
                }
              </span>
            </div>
            {(item.value === this.state.selected && !collapsed) &&
              <ul className={theme.options}>
                {item.options.map(opt => (
                  <li className={theme.option}><a className={theme.link}>{opt.title}</a></li>
                ))}
              </ul>
            }
          </li>
        )
      }

      return (
        <li key={`${this.id}-${item.value}`}>
          <div
            className={classes}
            role="button"
            onClick={() => this.handleSelection(item.value)}
            tabIndex="0"
          >
            <a className={theme.link}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </div>
        </li>
      )
    })
  }

  render () {
    const {
      theme,
      children,
      selectedEnvironment,
      collapsed,
    } = this.props

    const sidebarClasses = cx(theme.sidebar, {
      [theme.collapsed]: collapsed,
    })

    return (
      <div className={sidebarClasses}>
        { children }
        <div className={theme.section}>
          {!collapsed &&
            <div>
              {this.renderInfos()}
            </div>
          }

          {collapsed &&
            <div className={theme.selectedEnvironment}>
              <Tag key={selectedEnvironment}>{selectedEnvironment}</Tag>
            </div>
          }

          <nav className={theme.items}>
            <ul>
              {this.renderList()}
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  theme: PropTypes.shape({
    items: PropTypes.string,
    item: PropTypes.string,
    itemSelected: PropTypes.string,
    text: PropTypes.string,
    option: PropTypes.string,
    options: PropTypes.string,
    link: PropTypes.string,
    sidebar: PropTypes.string,
    collapsed: PropTypes.string,
    switchContainer: PropTypes.string,
    selectedEnvironment: PropTypes.string,
    showInfos: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })),
  })).isRequired,
  selectedEnvironment: PropTypes.string.isRequired,
  infos: PropTypes.shape({
    title: PropTypes.string,
    showMsg: PropTypes.string,
    hideMsg: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
      actionTitle: PropTypes.string,
      action: PropTypes.func,
    })),
  }),
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
}

Sidebar.defaultProps = {
  theme: {},
  infos: {},
  collapsed: false,
}

export default applyThemr(Sidebar)
