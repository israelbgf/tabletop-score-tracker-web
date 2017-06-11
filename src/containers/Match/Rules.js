function calculate(rawScore) {
    let result = eval(rawScore.replace(/[^\d*\/+\-]/g, '').replace(/[+\-*\/]$/, ''));
    return result || 0
}

class MatchRules {
    static computeScore(players) {
        let ranking = players
            .map(player => player.set('score', calculate(player.get('rawScore'))))
            .sort((a, b) => b.get('score') - a.get('score'))

        let highestScore = ranking.get(0).get('score')

        return ranking.map(player => player.set('winner', player.get('score') === highestScore))
    }
}

export default MatchRules