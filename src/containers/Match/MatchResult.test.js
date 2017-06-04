import React from 'react'
import MatchResult from './MatchResult';
import {mount, render} from 'enzyme';
import Immutable, {Map} from 'immutable'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import setupTestEnvironment from '../../utils/TestEnvironment'

setupTestEnvironment()

function createEnzymeContext() {
    let muiTheme = getMuiTheme()
    return {
        context: {muiTheme}, childContextTypes: {muiTheme: React.PropTypes.object}
    }
}

function beforeEach() {
    jest.spyOn(document, "querySelector").mockImplementation(() => {
        return {
            scrollIntoView: () => {
            }
        }
    })
}

it('computes the score correctly', () => {
    // let a = {name: "Israel", rawScore: "1+2+3"}

    // const wrapper = mount(
    //     <MatchResult playersScore={Immutable.fromJS()}/>, createEnzymeContext())
    //
    // expect(wrapper.state().data.toJS()).toMatchObject({
    //     ranking: [""]
    // })
});
