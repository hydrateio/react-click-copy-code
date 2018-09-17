import React, { Component } from 'react'
import Icon from './Icon'

import { ClickCopy } from 'react-clip-copy-code'

export default class App extends Component {
  render () {
    return (
      <div style={{'width': '15vw', 'height': '15vh'}}>
        <ClickCopy><Icon size={"100%"} /></ClickCopy>
        <ClickCopy><Icon size={"100%"} duotone={true} /></ClickCopy>
        <ClickCopy><Icon size={"100%"} baseColor={"#161f93"} accentColor={"#00baa9"} /></ClickCopy>
      </div>
    )
  }
}
