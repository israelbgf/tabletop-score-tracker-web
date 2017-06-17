import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ResultTable from "./ResultTable";
import {AppBar, Snackbar} from "material-ui";
import {GameGatewayRemote, MatchGatewayRemote, PlayerGatewayRemote} from "../../gateways/Gateway";
import Immutable, {List, Map} from 'immutable'
import MatchRules from './Rules'

class MatchContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: Immutable.fromJS({
                victoryCondition: "highest",
                showResults: false,
                players: [
                    {name: "", rawScore: ""}
                ],
                ranking: [],
                playersToSuggest: [],
                gamesToSuggest: [],
                snackbar: {
                    message: "",
                    open: false
                }
            })
        };

        this.onChangePlayerName = this.onChangePlayerName.bind(this)
        this.onChangePlayerScore = this.onChangePlayerScore.bind(this)
        this.onSelectPlayer = this.onSelectPlayer.bind(this)
        this.onClickShowResults = this.onClickShowResults.bind(this)
        this.onClickStoreResults = this.onClickStoreResults.bind(this)
        this.onChangeVictoryConditionSelect = this.onChangeVictoryConditionSelect.bind(this)
    }

    componentDidMount() {
        PlayerGatewayRemote.fetchAllPlayers()
            .then((playersToSuggest) => this.setState({data: this.state.data.setIn(['playersToSuggest'], List(playersToSuggest))}))
        GameGatewayRemote.fetchAllGames()
            .then((gamesToSuggest) => this.setState({data: this.state.data.setIn(['gamesToSuggest'], List(gamesToSuggest))}))

        let scoreResult = document.querySelector('#store-result')
        if (scoreResult)
            scoreResult.scrollIntoView({behavior: 'smooth'})
    }

    onChangePlayerName(playerIndex, playerName) {
        let players = this.state.data.get('players');
        players = players.setIn([playerIndex, "name"], playerName)
        if (players.size === playerIndex + 1)
            players = players.push(Map({name: "", rawScore: ""}))

        this.setState({data: this.state.data.setIn(['players'], players)})
    }

    onChangePlayerScore(playerIndex, rawScore) {
        let victoryCondition = this.state.data.get('victoryCondition')
        let updatedPlayers = this.state.data.setIn(['players', playerIndex, 'rawScore'], rawScore)
        this.updatePlayerScoreState(updatedPlayers, victoryCondition);
    }

    onChangeVictoryConditionSelect(event, index, option) {
        let newState = this.state.data.set('victoryCondition', option)
        this.updatePlayerScoreState(newState, option)
    }

    onClickShowResults() {
        let showResults = !this.state.data.get('showResults');
        this.setState({data: this.state.data.set('showResults', showResults)});
    }

    onClickStoreResults() {
        MatchGatewayRemote.createMatch(this.state.data.get('ranking').toJS())
            .then(response => {
                this.setState({
                    data: this.state.data.merge({
                        snackbar: {
                            message: "New match stored",
                            open: true
                        }
                    })
                });
            })
    }

    onSelectPlayer(playerIndex, player) {
        let newState = this.state.data.setIn(['ranking', playerIndex, 'winner'], !player.get('winner'))
        this.setState({data: newState});
    }

    updatePlayerScoreState(currentState, victoryCondition) {
        let validPlayerToComputeScore = currentState.get('players')
            .filter(player => player.get('name'))
        let updatedPlayersAndRanking = currentState.set(
            'ranking',
            MatchRules.computeScore(validPlayerToComputeScore, victoryCondition)
        )

        this.setState({data: updatedPlayersAndRanking})
    }

    render() {
        let playerStyle = {marginTop: "-50px"};
        let scoreStyle = {marginTop: "-50px"};

        let gamesToSuggest = this.state.data.get("gamesToSuggest").map(game => game.name).toJS()
        let playersToSuggest = this.state.data.get("playersToSuggest").map(player => player.name).toJS()

        let resultButtonLabel = this.state.data.get("showResults") ? "Hide Results" : "Show Results"

        return (
            <div>
                <AppBar title="New Match" showMenuIconButton={false}/>
                <div style={{margin: "10px"}}>

                    <div>
                        <div className="columns is-mobile">
                            <div className="column">
                                <AutoComplete
                                    floatingLabelText="Game"
                                    openOnFocus={true}
                                    filter={AutoComplete.fuzzyFilter}
                                    dataSource={gamesToSuggest}
                                    fullWidth={true}
                                    maxSearchResults={5}/>

                            </div>
                            <div className="column">
                                <SelectField floatingLabelText="Victory Condition"
                                             value={this.state.data.get('victoryCondition')}
                                             fullWidth={true} onChange={this.onChangeVictoryConditionSelect}>
                                    <MenuItem value={"highest"} primaryText="Highest"/>
                                    <MenuItem value={"lowest"} primaryText="Lowest"/>
                                </SelectField>
                            </div>
                        </div>

                        {this.state.data.get("players").map((player, index) => (
                            <div className="columns is-mobile" key={index}>
                                <div className="column">
                                    <AutoComplete hintText="Name" floatingLabelText={"Player " + (index + 1)}
                                                  style={playerStyle}
                                                  filter={AutoComplete.fuzzyFilter}
                                                  dataSource={playersToSuggest}
                                                  searchText={player.name}
                                                  onUpdateInput={(text) => this.onChangePlayerName(index, text)}
                                                  openOnFocus={true}
                                                  fullWidth={true}/>
                                </div>
                                <div className="column">
                                    <TextField hintText="0 + 3 + 15" floatingLabelText="Score" style={scoreStyle}
                                               onChange={(event, text) => this.onChangePlayerScore(index, text)}
                                               fullWidth={true}/>
                                </div>
                            </div>
                        ))}
                        <div style={{display: "flex-box"}}>
                            <RaisedButton label={resultButtonLabel} primary={true} style={{marginTop: "20px"}}
                                          onClick={this.onClickShowResults}/>
                        </div>

                        <br/>

                        {this.state.data.get("showResults") &&
                        <div>
                            <ResultTable players={this.state.data.get("ranking")} onSelectPlayer={this.onSelectPlayer}/>
                            <div id="store-result" style={{display: "flex-box"}}>
                                <RaisedButton label="Store Result" primary={true} style={{marginTop: "20px"}}
                                              onClick={this.onClickStoreResults}/>
                            </div>
                        </div>}
                    </div>
                </div>

                <Snackbar
                    open={this.state.data.getIn(['snackbar', 'open'])}
                    message={this.state.data.getIn(['snackbar', 'message'])}
                />
            </div>
        );
    }
}

export default MatchContainer;
