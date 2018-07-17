import * as DatasActions from '~/actions/datas'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: {}
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
      let listDatas = {}
      for(let data of action.items) {
        listDatas[data["entry_id"]] = data 
      }
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: listDatas
      }
    default:
      return state
  }
}

export default Datas
