import React, { Component } from 'react'
import Icon from './Icon'

import { ClickCopy } from 'react-clip-copy-code'

export default class App extends Component {
  render () {
    return (
      <div className='container'>
        <ClickCopy className='inner'>
          <ClickCopy.Items>
           <Icon size={'50%'} duotone={true} />
          </ClickCopy.Items>
        </ClickCopy>
        <ClickCopy className='inner'>
          <ClickCopy.Items>
          <Icon size={'50%'} baseColor={'#161f93'} accentColor={'#00baa9'} />
          </ClickCopy.Items>
          <ClickCopy.Notification />
        </ClickCopy>
        <ClickCopy
          className='inner'
          copyText={'Alternate click inducement. 👻'}
          onSuccess={() => console.log('I was successful.')}
        >
          <ClickCopy.Items>
          <Icon size={'50%'} baseColor={'#fb00ff'} accentColor={'#2bff00'} /><Icon size={'50%'} />
          </ClickCopy.Items>
          <ClickCopy.Notification />
        </ClickCopy>
      </div>
    )
  }
}
