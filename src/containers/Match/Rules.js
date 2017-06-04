class MatchRules{
    static computeWinner(players){
        let ranking = players
            .map((player) => ({...player, score: eval(player.rawScore)}))
            .sort((a, b) => b.score - a.score)

        let highestScore = ranking[0].score

        return ranking.map((player) => ({...player, winner: player.score === highestScore}))
    }
}

export default MatchRules