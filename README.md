# react-clip-copy-code

> Copies any child component's code to clipboard. Great for example pages.

[![NPM](https://img.shields.io/npm/v/react-clip-copy-code.svg)](https://www.npmjs.com/package/react-clip-copy-code) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![clip-copy-code-demo](example/clip-copy-code-demo.gif)

## Install

```bash
npm install --save react-clip-copy-code
```

## Usage

```jsx
import React, { Component } from 'react'

import ClickCopy from 'react-clip-copy-code'

class Example extends Component {
  render () {
    return (
      <ClickCopy>
      {/* Put anything you want in here. Including subcomponents. */}
        <ClickCopy.Items>
        {/* Components to copy go inside here. */}
         <Icon size={'50%'} duotone={true} />
        </ClickCopy.Items>
        {/* Optional Source and Notification friends */}
        <ClickCopy.Source />
        <ClickCopy.Notification />
      </ClickCopy>
    )
  }
}
```

## Properties

### ClickCopy
| Property | Type | Default |  Description |
| -------- | ----------- | ---- | ------- |
| copyText | string | 'Click to copy!' | Text shown in notification when ready to copy. |
| formattingOptions | object | { showDefaultProps: false } | Any option from [react-element-to-jsx-string options](https://github.com/algolia/react-element-to-jsx-string)
| errorText | string | 'Oops. Try again.' | Text shown in notification when copy action fails. |
| onClick | function | Copies text and sets state to success/fail. | Function called when element is clicked. Custom will be called alongside default. |
| onError | function | Resets state to ready to copy. | Function called when copy action fails. Custom will be called alongside default. |
| onSuccess | function | Resets state to ready to copy. | Function called when when copy action succeeds. Custom will be called alongside default. |
| successText | string | 'Copied!' | Text shown in notification when copy action succeeds. |

### ClickCopy.Items
This space intentionally left blank — no props for the `Items`!

### ClickCopy.Notification
| Property | Default | Type | Description |
| -------- | ----------- | ---- | ------- |
| background | #001eff | string | Set background color of notification overlay. |
| color | white | string | Set text color of notification overlay. |
| font | monospace | string | Set font family of notification overlay. |
| className | ----------- | string | Composes with internal classes. |
| style | ----------- | object | Overwrites internal style attributes. |


### ClickCopy.Source
| Property | Default | Type | Description |
| -------- | ----------- | ---- | ------- |
| background | #dadadd | string | Set background color of source box. |
| color | #53535c | string | Set text color of source box. |
| font | monospace | string | Set font family of source box. |
| className | string | ---- | Composes with internal classes. |
| style | object | ---- | Overwrites internal style attributes. |


## License

MIT © [hydrate.io](https://github.com/hydrateio)
