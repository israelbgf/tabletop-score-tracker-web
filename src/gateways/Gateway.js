import {AppSettings} from "../AppSettings"

class MatchGatewayRemote {

    static createMatch(data) {
        return fetch(`${AppSettings.REMOTE_API}/match`, {
            method: 'post',
            body: JSON.stringify(data)
        })
    }

    static fetchAllMatches() {
        return fetch(`${AppSettings.REMOTE_API}/match`).then(response => {
            return response.json()
        })
    }

}

class PlayerGatewayRemote {

    static fetchAllPlayers() {
        return fetch(`${AppSettings.REMOTE_API}/player`).then(response => {
            return response.json()
        })
    }

}

class GameGatewayRemote {

    static fetchAllGames() {
        return fetch(`${AppSettings.REMOTE_API}/game`).then(response => {
            return response.json()
        })
    }

}

export {
    MatchGatewayRemote,
    PlayerGatewayRemote,
    GameGatewayRemote
}