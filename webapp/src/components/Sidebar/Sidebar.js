import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import shortid from 'shortid'
import cx from 'classnames'

const applyThemr = themr('UISidebar')

class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: '',
      showInfos: false,
    }

    this.id = shortid.generate()

    this.handleSelection = this.handleSelection.bind(this)
    this.handleInfosClick = this.handleInfosClick.bind(this)
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

  render () {
    const {
      theme,
      children,
      collapsed,
    } = this.props

    const sidebarClasses = cx(theme.sidebar, {
      [theme.collapsed]: collapsed,
    })

    return (
      <div className={sidebarClasses}>
        { children }
      </div>
    )
  }
}

Sidebar.propTypes = {
  theme: PropTypes.shape({
    item: PropTypes.string,
    itemSelected: PropTypes.string,
    text: PropTypes.string,
    option: PropTypes.string,
    options: PropTypes.string,
    link: PropTypes.string,
    sidebar: PropTypes.string,
    collapsed: PropTypes.string,
    switchContainer: PropTypes.string,
    showInfos: PropTypes.string,
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
