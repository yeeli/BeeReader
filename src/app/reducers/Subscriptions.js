import * as SubscriptionsActions from '../actions/Subscriptions'

const Subscriptions = (state = [], action) => {
  switch(action.type) {
    case SubscriptionsActions.LOAD:
      return action.items
    default:
      return state
  }
}

export default Subscriptions
