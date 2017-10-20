import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import {List} from 'immutable'
import {Voting} from '../../src/components/Voting'

describe('Voting', () => {

  it('component renders a pair of buttons', () => {
    const component = TestUtils.renderIntoDocument(
      <Voting pair={['Trainspotting', '28 Days Later']} />
    )
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).toBe(2)
    expect(buttons[0].textContent).toBe('Trainspotting')
    expect(buttons[1].textContent).toBe('28 Days Later')
  })

  it('invokes callback when a button is clicked', () => {
    let votedWith
    const vote = (entry) => votedWith = entry

    const component = TestUtils.renderIntoDocument(
      <Voting
        pair={['Trainspotting', '28 Days Later']}
        vote={vote}
      />
    )
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
    TestUtils.Simulate.click(buttons[0])

    expect(votedWith).toBe('Trainspotting')
  })

  it('disables buttons after user has voted', () => {
    const component = TestUtils.renderIntoDocument(
      <Voting
        pair={['Trainspotting', '28 Days Later']}
        hasVoted='Trainspotting'
      />
    )
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).toBe(2)
    expect(buttons[0].hasAttribute('disabled')).toBe(true)
    expect(buttons[1].hasAttribute('disabled')).toBe(true)
  })

  it('adds a label to an entry that has been voted for', () => {
    const component = TestUtils.renderIntoDocument(
      <Voting
        pair={['Trainspotting', '28 Days Later']}
        hasVoted='Trainspotting'
      />
    )
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons[0].textContent).toContain('Voted')
  })

  it('only renders a winner', () => {
    const component = TestUtils.renderIntoDocument(
      <Voting
        winner='Trainspotting'
      />
    )
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).toBe(0)
    const winner = ReactDOM.findDOMNode(component.refs.winner)
    expect((winner).textContent).toContain('Trainspotting')
  })

  it('renders as a pure component', () => {
    const pair = ['Trainspotting', '28 Days Later']
    const container = document.createElement('div')
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    )

    let firstButton = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).toBe('Trainspotting')

    pair[0] = 'Sunshine'
    component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    )
    firstButton = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).toBe('Trainspotting')
  })

  it('updates DOM if prop is changed', () => {
    const pair = List.of('Trainspotting', '28 Days Later')
    const container = document.createElement('div')
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    )

    let firstButton = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).toBe('Trainspotting')

    const newPair = pair.set(0, 'Sunshine')
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    )
    firstButton = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).toBe('Sunshine')
  })

})
