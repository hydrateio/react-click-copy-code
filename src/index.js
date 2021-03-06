import React, { Component } from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard';
import reactElementToJSXString from 'react-element-to-jsx-string';
import styles from './styles.css'

import { copyConsts, callAll, ClickContext, ClickContextConsumer } from './utils'
import { Items } from './Items'
import { Notification } from './Notification'
import { Source } from './Source'

export class ClickCopy extends Component {
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
      (child) => child.type.displayName && child.type.displayName === 'ClickCopy.Items').props.children

    return React.Children.map(itemChildren,
      (child) => reactElementToJSXString(child, {
        showDefaultProps: false,
        filterProps: ['key'],
        ...formattingOptions
      })).reduce((acc, sourceString) => acc.concat(sourceString))
  }

  _resetCopyState = () => {
    setTimeout(() => this.setState({ copyState: copyConsts.COPY.name }), 1500)
  }

  _setSource = (itemSource) => {
    this.setState({itemSource})
  }

  componentWillMount = () => {
    const {
      children,
      copyText,
      formattingOptions,
      errorText,
      sourceOverwrite,
      successText
    } = this.props

    const textToCopy = sourceOverwrite || this._processItems(children, formattingOptions)

    this._setSource(textToCopy)
    this._addNotificationMessages(copyText, errorText, successText)
  }

  copyClick = () => {
    try {
      copy(this.state.itemSource)
      this.setState({copyState: copyConsts.SUCCESS.name},
        callAll(this._resetCopyState, this.props.onSuccess))
    } catch (err) {
      this.setState({copyState: copyConsts.ERROR.name},
        callAll(this._resetCopyState, this.props.onError)(err))
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
        <button
          className={`${styles.clickCopyWrapper} ${className || ''}`}
          onClick={callAll(this.copyClick, onClick)}
          data-testid='click-copy-wrapper'
        >
          {children}
        </button>
      </ClickContext.Provider>
    )
  }
}

ClickCopy.propTypes = {
  copyText: PropTypes.string,
  formattingOptions: PropTypes.object,
  errorText: PropTypes.string,
  onClick: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  sourceOverwrite: PropTypes.string,
  successText: PropTypes.string
}
