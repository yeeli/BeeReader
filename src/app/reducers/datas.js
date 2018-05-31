import * as DatasActions from '@/actions/datas'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: []
}

const Datas = (state = [], action) => {
  switch(action.type) {
    case DatasActions.REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case DatasActions.LOAD:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: action.items
      }
    default:
      return state
  }
}

export default Datas
