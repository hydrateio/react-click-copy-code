import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { ClickContextConsumer } from './utils'

export function Source ({
  background = '#dadadd',
  color = '#53535c',
  font = 'monospace',
  className,
  style,
  ...props
}) {
  return (
    <ClickContextConsumer>
      {({ itemSource }) => (
        <div
          className={`${styles.clickCopySourceWrapper} ${className || ''}`}
          style={{
            background,
            color,
            fontFamily: font,
            ...style
            }}
          { ...props }
          data-testid='click-copy-source'>
          {itemSource}
        </div>
      )}
    </ClickContextConsumer>
  )
}

Source.displayName = 'ClickCopy.Source'

Source.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  font: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}
