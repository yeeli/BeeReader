import * as CategoriesActions from '@/actions/categories'

const Categories = (state = [], action) => {
  switch(action.type) {
    case CategoriesActions.LOAD:
      return action.items
    default:
      return state
  }
}

export default Subscriptions
