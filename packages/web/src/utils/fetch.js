const fetchJson = async (url, headers) => {
  const res = await fetch(url, headers)
  return res.json()
}

export const fetchWithCookies = async (url, req) => {
  const opts = {
    credentials: 'include',
    headers: {
      cookie: req ? req.headers.cookie : null
    }
  }
  return await fetchJson(url, opts)
}

function search(query, cb) {
  return fetch(`api/food?q=${query}`, {
    accept: 'application/json'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function authenticateWithGithub(cb) {
  return fetch(`auth/github`, {
    mode: 'no-cors',
    credentials: 'include'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  console.log(error)
  throw error
}

function parseJSON(response) {
  return response.json()
}

const Client = { authenticateWithGithub, search }
export default Client
