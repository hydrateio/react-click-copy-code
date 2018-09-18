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

export default class ClickCopy extends Component {
  static Items = function Items ({ children }) { return children }
  static Notification = function ({ copyState }) {
    return (
      <div className="clickCopyNotificationWrapper">
        Hi
        { /* copyConsts[copyState].text */ }
      </div>
    )
  }

  state = {
    copyState: copyConsts.UNTRIED.name,
    itemId: '',
    itemText: ''
  }

  _resetCopyState = () => {
    setTimeout(() => this.setState({copyState: copyConsts.UNTRIED.name}), 1500)
  }

  componentWillMount = () => {
    // Finds and processes the item children, so we can copy their code
    const { children } = this.props

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

  copyClick = () => {
    try {
      copy(this.state.itemText)
      this.setState({copyState: copyConsts.SUCCESS.name}, this._resetCopyState)
    } catch (err) {
      this.setState({copyState: copyConsts.ERROR.name}, this._resetCopyState)
    }
  }

  render() {
    const { children, style } = this.props
    const { itemId } = this.state

    return (
      <div id={itemId} className={"clickCopyWrapper"} style={{"cursor":"pointer", ...style}} onClick={this.copyClick}>
        {children}
      </div>
    )
  }
}

// const ClickCopyWithNotification = () => {
//   return
// }

export { ClickCopy, /*ClickCopyWithNotification*/ }
