import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MatchResult from "./MatchResult";
import {AppBar} from "material-ui";
import {GameGatewayRemote, PlayerGatewayRemote} from "../../gateways/Gateway";
import Immutable, {List, Map} from 'immutable'


class MatchContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: Immutable.fromJS({
                showResults: false,
                players: [
                    {name: "", rawScore: "", score: 0, winner: false}
                ],
                playersToSuggest: [],
                gamesToSuggest: [],
            })
        };

        this.onChangePlayerName = this.onChangePlayerName.bind(this)
        this.onChangePlayerScore = this.onChangePlayerScore.bind(this)
    }

    componentDidMount() {
        PlayerGatewayRemote.fetchAllPlayers()
            .then((playersToSuggest) => this.setState({data: this.state.data.setIn(['playersToSuggest'], List(playersToSuggest))}))
        GameGatewayRemote.fetchAllGames()
            .then((gamesToSuggest) => this.setState({data: this.state.data.setIn(['gamesToSuggest'], List(gamesToSuggest))}))
    }

    onChangePlayerScore(playerIndex, score) {
        this.setState({data: this.state.data.setIn(['players', playerIndex, 'rawScore'], score)})
    }

    onChangePlayerName(playerIndex, playerName) {
        let players = this.state.data.get('players');
        players = players.setIn([playerIndex, "name"], playerName)
        if (players.size === playerIndex + 1)
            players = players.push(Map({name: "", rawScore: "", score: 0, winner: false}))

        this.setState({data: this.state.data.setIn(['players'], players)})
    }

    render() {
        let playerStyle = {marginTop: "-50px"};
        let scoreStyle = {marginTop: "-50px"};

        let gamesToSuggest = this.state.data.get("gamesToSuggest").map(game => game.name).toJS()
        let playersToSuggest = this.state.data.get("playersToSuggest").map(player => player.name).toJS()

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
                                <SelectField floatingLabelText="Victory Condition" value={1} fullWidth={true}>
                                    <MenuItem value={1} primaryText="Highest"/>
                                    <MenuItem value={2} primaryText="Lowest"/>
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
                            <RaisedButton label="Show Results" primary={true} style={{marginTop: "20px"}}
                                          onClick={this.showMatchResults.bind(this)}/>
                        </div>

                        <br/>

                        {this.state.data.get("showResults") &&
                        <MatchResult playersScore={this.state.data.get("players")}/>}
                    </div>
                </div>
            </div>
        );
    }

    showMatchResults() {
        this.setState({data: this.state.data.set("showResults", true)});
    }

}

export default MatchContainer;
