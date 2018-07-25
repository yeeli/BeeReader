export const LOAD_RSS = "LOAD_RSS"
export const REQUEST_RSS = "REQUEST_RSS"

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
    dispatch(load_rss(res.data.rss))
  })
}
