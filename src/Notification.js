import React, { Component } from 'react'
import styles from './styles.css'
import { ClickContextConsumer, copyConsts } from './utils'

export function Notification ({
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
          <div
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
          </div>
        )}
      </ClickContextConsumer>
  )
}
