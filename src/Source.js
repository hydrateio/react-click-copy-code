import React, { Component } from 'react'
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
          { ...props }>
          {itemSource}
        </div>
      )}
    </ClickContextConsumer>
  )
}
