import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { themr } from 'react-css-themr'

const applyThemr = themr('UISidebar')

const SidebarLink = ({
  active,
  icon,
  title,
  children,
  to,
  theme,
}) => (
  <li
    className={classnames(theme.item, {
      [theme.active]: active,
    })}
  >
    <a className={theme.link} href={to} title={title}>
      {icon}
      <span>{title}</span>
    </a>
    {children}
  </li>
)

SidebarLink.propTypes = {
  theme: PropTypes.shape({
    active: PropTypes.string,
    item: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool,
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
}

SidebarLink.defaultProps = {
  active: false,
  icon: null,
  children: null,
}

export default applyThemr(SidebarLink)
