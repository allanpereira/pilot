import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import IconArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import IconArrowDown from 'react-icons/lib/md/keyboard-arrow-down'

const applyThemr = themr('UISidebar')

const Item = ({
  active,
  icon,
  title,
  children,
  to,
  theme,
  onClick,
}) => (
  <li
    className={classNames(theme.item, {
      [theme.active]: active,
    })}
  >
    <a
      onClick={() => onClick(to)}
      className={theme.link}
      title={title}
      role="button"
      tabIndex="0"
    >
      {icon}
      <span>{title}</span>
    </a>
    {children}
  </li>
)

Item.propTypes = {
  theme: PropTypes.shape({
    active: PropTypes.string,
    item: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool,
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
}

Item.defaultProps = {
  active: false,
  icon: null,
  children: null,
}

const InfoItem = ({
  title,
  theme,
  subTitle,
  showInfos,
  onClick,
  children,
}) => {
  const infoClasses = classNames(theme.info, {
    [theme.showInfos]: showInfos,
  })

  return (
    <div className={infoClasses}>
      <p className={theme.title}>{title}</p>
      <div
        className={theme.toggle}
        onClick={onClick}
        role="button"
        tabIndex="0"
      >
        <p>
          {subTitle}
          {showInfos
            ? <IconArrowUp />
            : <IconArrowDown />}
        </p>
      </div>
      {children}
    </div>
  )
}

InfoItem.propTypes = {
  theme: PropTypes.shape({
    info: PropTypes.string,
    showInfos: PropTypes.string,
    toggle: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  showInfos: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

InfoItem.defaultProps = {
  active: false,
  icon: null,
  info: false,
}

const SidebarLink = props => (
  !props.info
    ? <Item {...props} />
    : <InfoItem {...props} />
)

SidebarLink.propTypes = {
  theme: PropTypes.shape({
    active: PropTypes.string,
    item: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool,
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  info: PropTypes.bool,
}

SidebarLink.defaultProps = {
  active: false,
  icon: null,
  children: null,
  info: false,
  to: '',
}

export default applyThemr(SidebarLink)
