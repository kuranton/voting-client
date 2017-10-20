import {List, Map, fromJS} from 'immutable'

import reducer from '../src/reducer'

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({Trainspotting: 1})
        })
      })
    }
    const nextState = reducer(initialState, action)

    expect(nextState).toEqual(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }))
  })

  it('processes SET_STATE with simple JS-load', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1}
        }
      }
    }

    const nextState = reducer(initialState, action)

    expect(nextState).toEqual(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }))
  })

  it('processes SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({Trainspotting: 1})
        })
      })
    }
    const nextState = reducer(undefined, action)

    expect(nextState).toEqual(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }))
  })

  it('processes VOTE by assagning hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    })
    const action = {type: 'VOTE', entry: 'Trainspotting'}
    const nextState = reducer(state, action)

    expect(nextState).toEqual(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    }))
  })

  it('in case of using an incorrect entry doesn\'t assign hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    })
    const action = {type: 'VOTE', entry: 'Sunshine'}
    const nextState = reducer(state, action)

    expect(nextState).toEqual(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }))
  })

  it('if the pair is changed clears hasVoted in SET_STATE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    })
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Sunshine', 'Slumdog Millionaire']
        }
      }
    }
    const nextState = reducer(initialState, action)

    expect(nextState).toEqual(fromJS({
      vote: {
        pair: ['Sunshine', 'Slumdog Millionaire']
      }
    }))
  })

})
