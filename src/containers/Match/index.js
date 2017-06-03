import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MatchResult from "./MatchResult";
import {AppBar} from "material-ui";

class Match extends Component {

    constructor(props) {
        super(props);
        this.state = {showResults: false};
    }

    render() {
        let playerStyle = {"margin-top": "-50px"};
        let scoreStyle = {"margin-top": "-50px"};
        let datasource = ["Schyte", "Mombasa", "PowerGrid", "Parade", "Agricola", "Ticket to Ride"];
        let players = ["Israel", "Hudolf", "Modesto", "Juan", "Bob"];

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
                                    dataSource={datasource}
                                    fullWidth="true"
                                    maxSearchResults={5}/>

                            </div>
                            <div className="column">
                                <SelectField floatingLabelText="Victory Condition" value={1} fullWidth="true">
                                    <MenuItem value={1} primaryText="Highest"/>
                                    <MenuItem value={2} primaryText="Lowest"/>
                                </SelectField>
                            </div>
                        </div>

                        {players.map((e, index) => (
                            <div className="columns is-mobile">
                                <div className="column">
                                    <AutoComplete hintText="Name" floatingLabelText={"Player " + (index + 1)}
                                                  style={playerStyle}
                                                  filter={AutoComplete.fuzzyFilter}
                                                  dataSource={players}
                                                  fullWidth="true"/>
                                </div>
                                <div className="column">
                                    <TextField hintText="0 + 3 + 15" floatingLabelText="Score" style={scoreStyle}
                                               fullWidth="true"/>
                                </div>
                            </div>
                        ))}
                        <div style={{display: "flex-box"}}>
                            <RaisedButton label="Show Results" primary={true} style={{"margin-top": "20px"}}
                                          onClick={this.showMatchResults.bind(this)}/>
                        </div>

                        <br/>

                        {this.renderResultTable()}
                    </div>
                </div>
            </div>
        );
    }

    showMatchResults() {
        this.setState({showResults: true});
    }

    renderResultTable() {
        return this.state.showResults ? <MatchResult/> : <div/>
    }
}

export default Match;
