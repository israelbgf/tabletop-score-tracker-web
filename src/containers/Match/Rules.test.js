import MatchRules from "./Rules"
import Immutable from 'immutable'

it('computes the score correctly', () => {
    let players = Immutable.fromJS([
        {name: "Israel", rawScore: "1+0+0"},
        {name: "Juan", rawScore: "1+1+0"},
        {name: "Hudolf", rawScore: "0+1+2"},
        {name: "Modesto", rawScore: "0+0+3"}
    ])

    let result = MatchRules.computeScore(players)

    expect(result).toEqual(Immutable.fromJS(
        [
            {name: "Hudolf", rawScore: "0+1+2", score: 3, winner: true},
            {name: "Modesto", rawScore: "0+0+3", score: 3, winner: true},
            {name: "Juan", rawScore: "1+1+0", score: 2, winner: false},
            {name: "Israel", rawScore: "1+0+0", score: 1, winner: false},
        ]
    ))
});

it('computes the winner by highest score', () => {
    let players = Immutable.fromJS([
        {name: "Israel", rawScore: "100"},
        {name: "Hudolf", rawScore: "0"},
    ])

    let result = MatchRules.computeScore(players, 'highest')

    expect(result.getIn([0, 'winner'])).toBeTruthy()
});

it('lowest score may be configured to be the first place', () => {
    let players = Immutable.fromJS([
        {name: "Israel", rawScore: "100"},
        {name: "Hudolf", rawScore: "0"},
    ])

    let result = MatchRules.computeScore(players, 'lowest')

    expect(result.getIn([0, 'winner'])).toBeTruthy()
});

it('is resilient to incomplete math expressions', () => {
    let players = Immutable.fromJS([
        {name: "Israel", rawScore: "1  +0 +0+"},
        {name: "Juan", rawScore: "1+1+0-"},
        {name: "Hudolf", rawScore: "0+1+2  /"},
        {name: "Modesto", rawScore: "0+0+4  *"},
    ])

    let result = MatchRules.computeScore(players)

    expect(result.get(0).get('score')).toEqual(4)
    expect(result.get(1).get('score')).toEqual(3)
    expect(result.get(2).get('score')).toEqual(2)
    expect(result.get(3).get('score')).toEqual(1)
});

it('is resilient to text in the middle of the math', () => {
    let players = Immutable.fromJS([
        {name: "Israel", rawScore: "1 cow + 2 pigs"},
    ])

    let result = MatchRules.computeScore(players)

    expect(result.get(0).get('score')).toEqual(3)
});

it('return 0 if something really wrong happens', () => {
    let players = Immutable.fromJS([
        {name: "Israel", rawScore: "{exploit: 'time to mess this eval'}"},
        {name: "Israel", rawScore: "() => true"},
        {name: "Israel", rawScore: "() da *&!@$##%$$ˆ)  $"},
    ])

    let result = MatchRules.computeScore(players)

    expect(result.get(0).get('score')).toEqual(0)
    expect(result.get(1).get('score')).toEqual(0)
});