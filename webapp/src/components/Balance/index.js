import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import Button from '../Button'

const applyThemr = themr('UIBalance')

const Balance = ({
  infos,
  theme,
}) => (
  <div className={theme.balance}>
    <ul>
      {infos.map(info => (
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
)

Balance.propTypes = {
  theme: PropTypes.shape({
    balance: PropTypes.string,
  }).isRequired,
  infos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.element,
    action: PropTypes.func,
    actionTitle: PropTypes.string,
  })).isRequired,
}

export default applyThemr(Balance)
