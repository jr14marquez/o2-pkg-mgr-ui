import Api from './Api'

// var config = { headers: { 'Authorization': }}
export default {
    getAppVersions (app) {
        return Api().get(`/${app.groupId}/${app.artifactId}/maven-metadata.xml`,)
    },
    getAppLts (app) {
    	return Api().get(`/${app.groupId}/${app.artifactId}/${ltsVersion}/maven-metadata.xml`)
    }
}