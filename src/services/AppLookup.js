import Api from './Api'

// var config = { headers: { 'Authorization': }}
export default {
    getRpm (app) { 
        return Api().get(`?app=${app.name}&user=${app.user}&group=${app.group}&home=${app.home}`)
    }
}