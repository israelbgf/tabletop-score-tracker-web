import MatchRules from "./Rules"

it('computes the score correctly', () => {
    let players = [
        {name: "Israel", rawScore: "1+0+0"},
        {name: "Juan", rawScore: "1+1+0"},
        {name: "Hudolf", rawScore: "0+1+2"},
        {name: "Modesto", rawScore: "0+0+3"}
    ]

    let result = MatchRules.computeWinner(players)

    expect(result).toEqual([
            {name: "Hudolf", rawScore: "0+1+2", score: 3, winner: true},
            {name: "Modesto", rawScore: "0+0+3", score: 3, winner: true},
            {name: "Juan", rawScore: "1+1+0", score: 2, winner: false},
            {name: "Israel", rawScore: "1+0+0", score: 1, winner: false},
        ]
    )
});
