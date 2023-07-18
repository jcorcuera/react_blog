// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client(url, { body, ...customConfig } = {}) {
  const base_url = 'https://jsonplaceholder.typicode.com'
  const endpoint = base_url + url

  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (url, customConfig = {}) {
  return client(url, { ...customConfig, method: 'GET' })
}

client.post = function (url, body, customConfig = {}) {
  return client(url, { ...customConfig, body })
}