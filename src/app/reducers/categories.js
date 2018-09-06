import _ from 'lodash'
import * as CategoriesActions from '~/actions/categories'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: []
}

const Categories = (state = defaultState, action) => {
  switch(action.type) {
    case CategoriesActions.REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case CategoriesActions.LOAD:
      let categoriesList = action.items.map( (item) => {
        let idsStr = _.toString(item.stream_ids)
        if(_.isEmpty(idsStr)){
          item['stream_ids'] = []
        } else {
          item['stream_ids'] = idsStr.split(",") 
        }
        return item
      })
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: categoriesList
      }
    case CategoriesActions.ADD:
      state.items.push(action.item)
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        item: state.item
      }
    default:
      return state
  }
}

export default Categories
