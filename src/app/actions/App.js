export const LOAD_RSS = "LOAD_RSS"
export const REQUEST_RSS = "REQUEST_RSS"
export const SYNCING = "SYNCING"
export const SYNCED = "SYNCED"

export const load_rss = (item) => ({
  type: LOAD_RSS,
  item: item
})

export const fetchRss = (url) => (dispatch, state) => {
  return dispatch({
    type: REQUEST_RSS,
    sync: { 
      url: 'rssStreamsPath',
      params: { url: url }
    }
  }).then( res => {
    if (res.meta.status == "success") {
      dispatch(load_rss(res.data.rss))
    } else {
      console.log(res)
    }
  })
}

export const syncing = () => ({
  type: SYNCING
})

export const synced = () => ({
  type: SYNCED
})
