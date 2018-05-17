import array from 'lodash/array'
import lang from 'lodash/lang'

export const LOAD = 'SUBSCRIPTIONS_LOAD'
export const loadSubscriptions = (items) => ({
  type: LOAD,
  items: items
})

export const fetchSubscriptions = () => (dispatch,state)=> {
}
