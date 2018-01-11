import React from 'react'
import { themr } from 'react-css-themr'
import {
  shape,
  string,
} from 'prop-types'

const applyThemr = themr('UITable')

const TableEmptyItem = ({ theme }) => (
  <span className={theme.empty} />
)

TableEmptyItem.propTypes = {
  theme: shape({
    empty: string,
  }),
}

TableEmptyItem.defaultProps = {
  theme: {},
}

export default applyThemr(TableEmptyItem)
