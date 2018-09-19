import React, { Component, Fragment } from 'react'
import Icon from './Icon'

import { ClickCopy } from 'react-clip-copy-code'

export default class App extends Component {
  render () {
    return (
      <Fragment>
        <ClickCopy>
          <ClickCopy.Items>
           <Icon size={"25%"} duotone={true} />
          </ClickCopy.Items>
          <ClickCopy.Notification />
        </ClickCopy>
        <ClickCopy
          copyText={"Alternate click inducement. 👻"}
          onSuccess={() => console.log("I was successful.")}
        >
          <ClickCopy.Items>
          <Icon size={"25%"} baseColor={"#fb00ff"} accentColor={"#2bff00"} /><Icon size={"25%"} />
          </ClickCopy.Items>
          <ClickCopy.Notification />
        </ClickCopy>
        <ClickCopy>
          <ClickCopy.Items>
          <Icon size={"25%"} baseColor={"#161f93"} accentColor={"#00baa9"} />
          </ClickCopy.Items>
          <ClickCopy.Notification />
        </ClickCopy>
      </Fragment>
    )
  }
}
