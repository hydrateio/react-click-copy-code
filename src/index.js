import React, { Component } from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard';

import styles from './styles.css'

const copyConsts = {
  UNTRIED: {
    name: 'UNTRIED',
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

const flatten = (arr) => [].concat.apply([], arr)
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

export default class ClickCopy extends Component {
  static Items = function Items ({ children }) {
    return (
      <ClickContextConsumer>
        {() => children}
      </ClickContextConsumer>
    )
  }

  static Notification = function ({
    background = 'hsla(233, 100%, 50%, 1)',
    color = 'white',
    font = 'monospace',
    style,
    className
  }) {
    return (
        <ClickContextConsumer>
          {({
            copyState,
            notificationMessages
          }) => (
            <div
              className={`${styles.clickCopyNotificationWrapper} ${className}`}
              style={{
                background,
                color,
                fontFamily: font,
                ...style
              }}
            >
              { notificationMessages[copyState] || copyConsts[copyState].text }
            </div>
          )}
        </ClickContextConsumer>
    )
  }

  state = {
    copyState: copyConsts.UNTRIED.name,
    itemId: '',
    itemText: '',
    notificationMessages: {}
  }

  _addNotificationMessages = (untried, error, success) => {
    const notificationMessages = {
      [copyConsts.UNTRIED.name]: untried,
      [copyConsts.ERROR.name]:   error,
      [copyConsts.SUCCESS.name]: success
    }
    this.setState({notificationMessages})
  }

  _processItems = (children) => {
    // Finds and processes the item children, so we can copy their code
    const itemChildren = React.Children.toArray(children).find(
      (child) => child.type.name && child.type.name === 'Items').props.children

    const { itemId, itemText } = React.Children.map(itemChildren, (kid) => {
      const { props: childProps, type: { defaultProps, name = 'Unknown' } } = kid

      const itemProperties = Object.entries(childProps)
        .filter(([key, val]) => {
            return !(defaultProps[key] && defaultProps[key] === val)
          })

      const itemId = flatten(itemProperties).join('-')

      const itemPropertiesString = itemProperties.reduce((str, prop) => {
        const val = typeof prop[1] === 'string' ? `'${prop[1]}'` : prop[1]
        const newStr = str += ` ${prop[0]}={${val}}`
        return newStr
      }, '')

      const itemText = `<${name}${itemPropertiesString} />`
      return { itemId, itemText }
    }).reduce((acc, { itemId, itemText }) => {
      return {
        itemId:   acc.itemId.concat(itemId),
        itemText: acc.itemText.concat(itemText)
      }
    }, {itemId: '', itemText: ''})

    this.setState({itemId, itemText})
  }

  _resetCopyState = () => {
    setTimeout(() => this.setState({copyState: copyConsts.UNTRIED.name}), 1500)
  }

  componentWillMount = () => {
    const { children, copyText, errorText, successText} = this.props

    this._processItems(children)
    this._addNotificationMessages(copyText, errorText, successText)
  }

  copyClick = () => {
    try {
      copy(this.state.itemText)
      this.setState({copyState: copyConsts.SUCCESS.name},
        callAll(this._resetCopyState, this.props.onSuccess))
    } catch (err) {
      this.setState({copyState: copyConsts.ERROR.name},
        callAll(this._resetCopyState, this.props.onError))
    }
  }

  render() {

    const {
      children,
      copyText,
      errorText,
      successText,
      onClick,
      onError,
      onSuccess,
      wrapperStyles
    } = this.props

    const { copyState, itemId, notificationMessages } = this.state

    return (
      <ClickContext.Provider value={{
        copyState,
        itemId,
        notificationMessages
      }}>
        <div
          id={itemId}
          className={styles.clickCopyWrapper}
          style={wrapperStyles}
          onClick={callAll(this.copyClick, onClick)}
        >
          {children}
        </div>
      </ClickContext.Provider>
    )
  }
}

export { ClickCopy }
