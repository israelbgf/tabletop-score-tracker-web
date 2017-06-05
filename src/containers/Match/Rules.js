class MatchRules {
    static computeWinner(players) {
        let ranking = players
            .map(player => player.set('score', eval(player.get('rawScore'))))
            .sort((a, b) => b.get('score') - a.get('score'))

        let highestScore = ranking.get(0).get('score')

        return ranking.map(player => player.set('winner', player.get('score') === highestScore))
    }
}

export default MatchRules