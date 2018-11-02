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
        var categoriesList = action.items.map( (item) => {
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
    case CategoriesActions.CHANGE:
      var categoriesList = state.items.map((item) => {
        if(_.includes(action.add_ids, item.id)){
          item.stream_ids.push(_.toString(action.stream))
        }
        if(_.includes(action.delete_ids, item.id)){
          _.remove(item.stream_ids, (c) => { return c == _.toString(action.stream) })
        }
        return item
      })
      return {
        ...state,
        items: categoriesList
      }
    default:
      return state
  }
}

export default Categories
