import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://jj4xjl5211.execute-api.us-east-1.amazonaws.com/dev/getApp`,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
