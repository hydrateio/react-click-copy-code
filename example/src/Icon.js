import React from 'react'
import PropTypes from 'prop-types'
import TreasureChest from './TreasureChest'

const Icon = ({
  size,
  style,
  baseColor,
  accentColor,
  duotone,
  ...props
}) => {

  const defaultDarkColor = '#53535c'
  const defaultAccentColor = '#ffce2e'
  const primaryColor = baseColor || defaultDarkColor
  const secondaryColor = accentColor || (duotone && defaultAccentColor) || primaryColor

  const properties = {
    size: size,
    style: { ...style, width: size, height: size },
    primaryColor: primaryColor,
    secondaryColor: secondaryColor
  }

  return (
    <TreasureChest {...props} {...properties} />
  )
}

Icon.propTypes = {
  size: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
  baseColor: PropTypes.string,
  accentColor: PropTypes.string,
  duotone: PropTypes.bool
}

Icon.defaultProps = {
  size: 20
}

export default Icon
