import React, { Component } from 'react'
import Icon from './Icon'
import Message from './Message'

import ClickCopy from 'react-clip-copy-code'

export default class App extends Component {
  render () {
    return (
      <div className='container'>
        <ClickCopy className='inner'>
          <ClickCopy.Items>
           <Icon size={'50%'} duotone={true} />
          </ClickCopy.Items>
          <ClickCopy.Source />
          <Message>No notification; yes source. Click copies code.</Message>
        </ClickCopy>
        <ClickCopy className='inner'>
          <ClickCopy.Items>
          <Icon size={'50%'} baseColor={'#161f93'} accentColor={'#00baa9'} />
          </ClickCopy.Items>
          <ClickCopy.Notification />
          <Message>Includes default notification element.</Message>
        </ClickCopy>
        <ClickCopy
          className='inner'
          copyText={'Alternate click inducement. 👻'}
          onSuccess={() => console.log('I was successful.')}
        >
          <ClickCopy.Items>
          <Icon size={'50%'} baseColor={'#daa3ff'} accentColor={'#2bff00'} />
          <Icon size={'50%'} />
          <Message>I am inside Clickcopy.Items and will be copied, too!</Message>
          </ClickCopy.Items>
          <ClickCopy.Notification />
          <Message>Includes notification element with copyText and onSuccess handler.</Message>
        </ClickCopy>
      </div>
    )
  }
}
