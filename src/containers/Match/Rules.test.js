import MatchRules from "./Rules"
import Immutable from 'immutable'

it('computes the score correctly', () => {
    let players = Immutable.fromJS([
        {name: "Israel", rawScore: "1+0+0"},
        {name: "Juan", rawScore: "1+1+0"},
        {name: "Hudolf", rawScore: "0+1+2"},
        {name: "Modesto", rawScore: "0+0+3"}
    ])

    let result = MatchRules.computeWinner(players)

    expect(result).toEqual(Immutable.fromJS(
        [
            {name: "Hudolf", rawScore: "0+1+2", score: 3, winner: true},
            {name: "Modesto", rawScore: "0+0+3", score: 3, winner: true},
            {name: "Juan", rawScore: "1+1+0", score: 2, winner: false},
            {name: "Israel", rawScore: "1+0+0", score: 1, winner: false},
        ]
    ))
});
