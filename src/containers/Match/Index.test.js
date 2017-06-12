import React from 'react';
import MatchContainer from "./Index";
import {shallow} from "enzyme";
import Immutable from "immutable"

it('correctly handle changing player score', () => {
    let wrapper = shallow(
        <MatchContainer/>
    );

    wrapper.instance().onChangePlayerName(0, "Israel")
    wrapper.instance().onChangePlayerName(1, "Juan")
    wrapper.instance().onChangePlayerScore(0, '10')
    wrapper.instance().onChangePlayerScore(1, '20')

    expect(wrapper.state('data').toJS()).toMatchObject({
        victoryCondition: "highest",
        showResults: false,
        players: [
            {name: "Israel", rawScore: "10"},
            {name: "Juan", rawScore: "20"},
            {name: "", rawScore: ""}
        ],
        ranking: [
            {name: "Juan", score: 20, winner: true},
            {name: "Israel", score: 10, winner: false}
        ],
        playersToSuggest: [],
        gamesToSuggest: [],
    })

});