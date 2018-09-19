import React from 'react'

const copyConsts = {
  COPY: {
    name: 'COPY',
    text: 'Click to copy!'
  },
  SUCCESS: {
    name: 'SUCCESS',
    text: 'Copied!'
  },
  ERROR: {
    name: 'ERROR',
    text: 'Oops. Try again.'
  }
}

const callAll = (...fns) => (...args) =>
  fns.forEach((fn) => fn && fn(...args))

const ClickContext = React.createContext()

function ClickContextConsumer(props) {
  return (
    <ClickContext.Consumer {...props}>
      {(context) => {
        if (!context) {
          throw new Error(
            `ClickCopy compound components cannot be rendered outside the ClickCopy component`,
          )
        }
        return props.children(context)
      }}
    </ClickContext.Consumer>
  )
}

export { copyConsts, callAll, ClickContext, ClickContextConsumer }
