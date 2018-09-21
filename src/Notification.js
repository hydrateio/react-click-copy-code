import React, { Component } from 'react'
import styles from './styles.css'
import { ClickContextConsumer, copyConsts } from './utils'

function Notification ({
  background = '#001eff',
  color = 'white',
  font = 'monospace',
  className,
  style,
  ...props
}) {
  return (
      <ClickContextConsumer>
        {({
          copyState,
          notificationMessages
        }) => (
          <button
            className={`${styles.clickCopyNotificationWrapper} ${className || ''}`}
            style={{
              background,
              color,
              fontFamily: font,
              ...style
            }}
            { ...props }
          >
            { notificationMessages[copyState] || copyConsts[copyState].text }
          </button>
        )}
      </ClickContextConsumer>
  )
}

export default Notification
