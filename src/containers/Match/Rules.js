function calculate(rawScore) {
    let result = eval(rawScore.replace(/[^\d*/+-]/g, '').replace(/[*/+-/]$/, ''));
    return result || 0
}

function descending(a, b) {
    return b.get('score') - a.get('score')
}

function ascending(a, b) {
    return a.get('score') - b.get('score')
}

class MatchRules {
    static computeScore(players, victoryCondition) {
        let sortOrder = victoryCondition === 'lowest' ? ascending : descending
        let ranking = players
            .map(player => player.set('score', calculate(player.get('rawScore'))))
            .sort(sortOrder)

        let highestScore = ranking.get(0).get('score')

        return ranking.map(player => player.set('winner', player.get('score') === highestScore))
    }
}

export default MatchRules