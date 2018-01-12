import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import cx from 'classnames'

const applyThemr = themr('UISidebar')

const Sidebar = ({ theme, collapsed, children }) => (
  <div
    className={cx(theme.sidebar, {
      [theme.collapsed]: collapsed,
    })}
  >
    {children}
  </div>
)

Sidebar.propTypes = {
  theme: PropTypes.shape({
    sidebar: PropTypes.string,
    collapsed: PropTypes.string,
  }).isRequired,
  collapsed: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

Sidebar.defaultProps = {
  collapsed: false,
}

export default applyThemr(Sidebar)
