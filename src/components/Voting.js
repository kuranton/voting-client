import React, {Component} from 'react'
import {connect} from 'react-redux'
import Winner from './Winner'
import Vote from './Vote'
import * as actionCreators from '../action_creators'

export class Voting extends Component {
  render() {
    return (
      <div>
        {this.props.winner
          ? <Winner ref="winner" winner={this.props.winner} />
          : <Vote {...this.props} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  }
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting)
