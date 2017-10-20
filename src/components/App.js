import React from 'react'
import {List, Map} from 'immutable'
import {Route, Switch} from 'react-router-dom'
import {VotingContainer} from './Voting'
import {ResultsContainer} from './Results'

const App = (props) => {
  return(
    <Switch>
      <Route exact path='/'
        render={() => (<VotingContainer />)}
      />
      <Route path='/results'
        render={() => (<ResultsContainer />)}
      />
    </Switch>
  )
}

export default App
