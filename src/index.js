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
  state = {
    copyState: copyConsts.UNTRIED.name,
    itemId: '',
    itemText: ''
  }

  _resetCopyState = () => {
    setTimeout(() => this.setState({copyState: copyConsts.UNTRIED.name}), 1500)
  }

  componentWillMount = () => {
    const { children, skippable = {} } = this.props

    const [{ itemId, itemText }] = React.Children.map(children, (kid) => {
      const { props: childProps, type: { name } } = kid

      const itemProperties = Object.entries(childProps)
        .filter(([key, val]) => {
            return !(skippable[key] && skippable[key] === val)
          })

      const itemId = flatten(itemProperties).join('-')

      const itemPropertiesString = itemProperties.reduce((str, prop) => {
        const val = typeof prop[1] === 'string' ? `'${prop[1]}'` : prop[1]
        const newStr = str += ` ${prop[0]}={${val}}`
        return newStr
      }, '')

      const itemText = `<${name}${itemPropertiesString} />`
      return { itemId, itemText }
    })

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
    const { children } = this.props
    const { itemId } = this.state

    return (
      <div id={itemId} style={{"cursor":"pointer"}} onClick={this.copyClick}>
        {children}
      </div>
    )
  }
}

export { ClickCopy }
