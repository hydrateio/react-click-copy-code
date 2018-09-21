import React from 'react'
import { ClickContextConsumer } from './utils'

export function Items ({ children }) {
    return (
      <ClickContextConsumer>
        {() => children}
      </ClickContextConsumer>
    )
  }

Items.displayName = 'ClickCopy.Items'

export default Items
