import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
            data-testid='click-copy-notification'
          >
            { notificationMessages[copyState] || copyConsts[copyState].text }
          </div>
        )}
      </ClickContextConsumer>
  )
}

Notification.displayName = 'ClickCopy.Notification'

Notification.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  font: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}
