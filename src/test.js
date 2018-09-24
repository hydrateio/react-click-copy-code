import React from 'react'
import { cleanup, render, fireEvent } from 'react-testing-library'
import reactElementToJSXString from 'react-element-to-jsx-string';
import { ClickCopy } from './'
import Message from '../example/src/Message'

afterEach(cleanup)

describe('ClickCopy component', () => {

  const messages = [
    'I am the elephant message.',
    'I am the rabbit message.',
    'I am the tiger message.'
  ]

  const items = messages.map(((text, idx) => <Message key={idx}>{text}</Message>))

  it('displays one item', () => {
    const { getAllByTestId } = render(
      <ClickCopy>
        <ClickCopy.Items>
          {items[0]}
        </ClickCopy.Items>
      </ClickCopy>
    )


    const clickCopyItems = getAllByTestId('click-copy-items')

    expect(clickCopyItems).toHaveLength(1)
    expect(clickCopyItems[0].textContent).toBe(messages[0])
  })


  it('displays multiple items of the same type', () => {
    const { getAllByTestId } = render(
      <ClickCopy>
        <ClickCopy.Items>
          {items}
        </ClickCopy.Items>
      </ClickCopy>
    )

    const clickCopyItems = getAllByTestId('click-copy-items')

    expect(clickCopyItems).toHaveLength(3)

    clickCopyItems.forEach((item, idx) => {
      expect(item.textContent).toBe(messages[idx])
    })
  })

  it('displays multiple items of mixed type', () => {
    const { getAllByTestId } = render(
      <ClickCopy>
        <ClickCopy.Items>
          {items}
          <div data-testid='click-copy-items'>I am a little different.</div>
        </ClickCopy.Items>
      </ClickCopy>
    )

    const clickCopyItems = getAllByTestId('click-copy-items')

    expect(clickCopyItems).toHaveLength(4)

    clickCopyItems.forEach((item, idx) => {
      if (idx < 3) {
        expect(item.textContent).toBe(messages[idx])
      } else {
        expect(item.textContent).toBe('I am a little different.')
      }
    })
  })


  it('displays the Notification subcomponent when passed', () => {
    const { getAllByTestId } = render(
      <ClickCopy>
        <ClickCopy.Items>
          {items}
        </ClickCopy.Items>
        <ClickCopy.Notification />
      </ClickCopy>
    )

    const clickCopyItems = getAllByTestId('click-copy-items')
    const clickCopyNotes = getAllByTestId('click-copy-notification')

    expect(clickCopyItems).toHaveLength(3)
    expect(clickCopyNotes).toHaveLength(1)

    clickCopyItems.forEach((item, idx) => {
      expect(item.textContent).toBe(messages[idx])
    })

    expect(clickCopyNotes[0].textContent).toBe('Click to copy!')
  })

  it('displays the Source subcomponent with one item', () => {
    const { getAllByTestId } = render(
      <ClickCopy>
        <ClickCopy.Items>
          {items[0]}
        </ClickCopy.Items>
        <ClickCopy.Source />
      </ClickCopy>
    )


    const clickCopyItems = getAllByTestId('click-copy-items')
    const clickCopySource = getAllByTestId('click-copy-source')

    expect(clickCopyItems).toHaveLength(1)
    expect(clickCopySource).toHaveLength(1)

    expect(clickCopySource[0].textContent).toMatch(new RegExp(items[0]))

  })

  it('displays the Source subcomponent with multiple items of the same type', () => {
    const { getAllByTestId } = render(
      <ClickCopy>
        <ClickCopy.Items>
          {items}
        </ClickCopy.Items>
        <ClickCopy.Source />
      </ClickCopy>
    )

    const clickCopyItems = getAllByTestId('click-copy-items')
    const clickCopySource = getAllByTestId('click-copy-source')
    const itemsToString = items.map(item => reactElementToJSXString(item, {filterProps: ['key']})).join('')

    expect(clickCopyItems).toHaveLength(3)
    expect(clickCopySource).toHaveLength(1)
    expect(clickCopySource[0].textContent).toMatch(new RegExp(itemsToString))

  })

  it('displays the Source subcomponent with multiple items of different types', () => {
    const { getAllByTestId } = render(
      <ClickCopy>
        <ClickCopy.Items>
          {items}
          <div data-testid='click-copy-items'>I am a little different.</div>
        </ClickCopy.Items>
        <ClickCopy.Source />
      </ClickCopy>
    )

    const clickCopyItems = getAllByTestId('click-copy-items')
    const clickCopySource = getAllByTestId('click-copy-source')
    const itemsToString = [...items, <div data-testid='click-copy-items'>I am a little different.</div>]
      .map(item => reactElementToJSXString(item, {filterProps: ['key']})).join('')

    expect(clickCopyItems).toHaveLength(4)
    expect(clickCopySource).toHaveLength(1)
    expect(clickCopySource[0].textContent).toMatch(new RegExp(itemsToString))

  })

  it('displays the Source subcomponent and Notification subcomponent', () => {
    const { getAllByTestId } = render(
      <ClickCopy>
        <ClickCopy.Items>
          {items}
        </ClickCopy.Items>
        <ClickCopy.Notification />
        <ClickCopy.Source />
      </ClickCopy>
    )

    const clickCopyItems = getAllByTestId('click-copy-items')
    const clickCopySource = getAllByTestId('click-copy-source')
    const clickCopyNotes = getAllByTestId('click-copy-notification')

    expect(clickCopyItems).toHaveLength(3)
    expect(clickCopySource).toHaveLength(1)
    expect(clickCopyNotes).toHaveLength(1)

  })

  it('displays arbitrary code outside Items subcomponent', () => {
    const { getAllByTestId } = render(
      <ClickCopy>
        <ClickCopy.Items>
          {items}
        </ClickCopy.Items>
        <ClickCopy.Notification />
        <ClickCopy.Source />
        <div data-testid='outside'>I am an outside div.</div>
      </ClickCopy>
    )

    const outsideDiv = getAllByTestId('outside')
    expect(outsideDiv).toHaveLength(1)
    expect(outsideDiv[0].textContent).toBe('I am an outside div.')
  })

  it('triggers copy on click', () => {
    // This test results in a [caught] error because the test framework doesn't
    // mock the browser functionality. The copy library is tested so here
    // we are testing our click function is called. We just know it will fail.
    const { getAllByTestId } = render(
      <ClickCopy>
        <ClickCopy.Items>
          {items[0]}
        </ClickCopy.Items>
        <ClickCopy.Notification />
      </ClickCopy>
    )

    const clickCopyItems = getAllByTestId('click-copy-items')
    const clickCopyNotes = getAllByTestId('click-copy-notification')

    fireEvent.click(clickCopyItems[0])
    expect(clickCopyNotes[0].textContent).toBe('Oops. Try again.')
  })

  it('composes custom click', () => {
    const customClick = jest.fn()
    const { getAllByTestId } = render(
      <ClickCopy onClick={customClick}>
        <ClickCopy.Items>
          {items[0]}
        </ClickCopy.Items>
        <ClickCopy.Notification />
      </ClickCopy>
    )

    const clickCopyItems = getAllByTestId('click-copy-items')
    const clickCopyNotes = getAllByTestId('click-copy-notification')

    fireEvent.click(clickCopyItems[0])

    expect(clickCopyNotes[0].textContent).toBe('Oops. Try again.')
    expect(customClick).toHaveBeenCalled()

  })

  it('composes custom onError', () => {
    const customError = jest.fn()
    const { getAllByTestId } = render(
      <ClickCopy onError={customError}>
        <ClickCopy.Items>
          {items[0]}
        </ClickCopy.Items>
        <ClickCopy.Notification />
      </ClickCopy>
    )

    const clickCopyItems = getAllByTestId('click-copy-items')
    const clickCopyNotes = getAllByTestId('click-copy-notification')

    fireEvent.click(clickCopyItems[0])

    expect(clickCopyNotes[0].textContent).toBe('Oops. Try again.')
    expect(customError).toHaveBeenCalled()

  })

  it('composes custom text', () => {
    const { getAllByTestId } = render(
      <ClickCopy
        copyText={'Alternate click inducement.'}
        errorText={'Oh god nooooooo'}>
        <ClickCopy.Items>
          {items[0]}
        </ClickCopy.Items>
        <ClickCopy.Notification />
      </ClickCopy>
    )

    const clickCopyItems = getAllByTestId('click-copy-items')
    const clickCopyNotes = getAllByTestId('click-copy-notification')

    expect(clickCopyNotes[0].textContent).toBe('Alternate click inducement.')
    fireEvent.click(clickCopyItems[0])
    expect(clickCopyNotes[0].textContent).toBe('Oh god nooooooo')

  })
})
