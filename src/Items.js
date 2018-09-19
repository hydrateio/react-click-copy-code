import React from 'react'
import { ClickContextConsumer } from './utils'

function Items ({ children }) {
    return (
      <ClickContextConsumer>
        {() => children}
      </ClickContextConsumer>
    )
  }

export default Items
