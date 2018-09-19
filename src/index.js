import React, { Component } from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard';
import reactElementToJSXString from 'react-element-to-jsx-string';
import styles from './styles.css'

import { copyConsts, callAll, ClickContext, ClickContextConsumer } from './utils'
import Items from './Items'
import Notification from './Notification'
import Source from './Source'

export default class ClickCopy extends Component {
  static Items = Items
  static Notification = Notification
  static Source = Source

  state = {
    copyState: copyConsts.COPY.name,
    itemSource: '',
    notificationMessages: {}
  }

  _addNotificationMessages = (copy, error, success) => {
    const notificationMessages = {
      [copyConsts.COPY.name]: copy,
      [copyConsts.ERROR.name]:   error,
      [copyConsts.SUCCESS.name]: success
    }
    this.setState({ notificationMessages })
  }

  _processItems = (children, formattingOptions) => {
    // Finds and processes the item children, so we can copy & display their code
    const itemChildren = React.Children.toArray(children).find(
      (child) => child.type.name && child.type.name === 'Items').props.children

    const itemSource = React.Children.map(itemChildren,
      (child) => reactElementToJSXString(child, {
        showDefaultProps: false,
        ...formattingOptions
      }))[0]

    this.setState({itemSource})
  }

  _resetCopyState = () => {
    setTimeout(() => this.setState({ copyState: copyConsts.COPY.name }), 1500)
  }

  componentWillMount = () => {
    const {
      children,
      copyText,
      formattingOptions,
      errorText,
      successText
    } = this.props

    this._processItems(children, formattingOptions)
    this._addNotificationMessages(copyText, errorText, successText)
  }

  copyClick = () => {
    try {
      copy(this.state.itemSource)
      this.setState({copyState: copyConsts.SUCCESS.name},
        callAll(this._resetCopyState, this.props.onSuccess))
    } catch (err) {
      this.setState({copyState: copyConsts.ERROR.name},
        callAll(this._resetCopyState, this.props.onError))
    }
  }

  render() {
    const { children, onClick, className } = this.props
    const { copyState, itemSource, notificationMessages } = this.state

    return (
      <ClickContext.Provider value={{
        copyState,
        itemSource,
        notificationMessages
      }}>
        <div
          className={`${styles.clickCopyWrapper} ${className || ''}`}
          onClick={callAll(this.copyClick, onClick)}
        >
          {children}
        </div>
      </ClickContext.Provider>
    )
  }
}
