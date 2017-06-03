import {AppSettings} from "../AppSettings"

class MatchGatewayRemote {

    static fetchAllMatches() {
        return fetch(`${AppSettings.REMOTE_API}/match`).then(response => {
            return response.json()
        })
    }

}

export {MatchGatewayRemote}