import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://nexus.ossim.io/nexus/content/repositories/omar-local-snapshot`,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin":  "*"
     }
  })
}