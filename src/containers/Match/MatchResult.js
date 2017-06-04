import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class MatchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.playersScore
        };

    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Position</th>
                        <th>Player</th>
                        <th>Score</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((player, index) => (
                        <tr className={player.winner ? "is-selected" : ""} key={index}>
                            <td>{player.position}</td>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                            <td>{player.winner ? "winner" : ""}</td>
                        </tr>
                    )).toArray()}
                    </tbody>
                </table>
                <div id="store-result" style={{display: "flex-box"}}>
                    <RaisedButton label="Store Result" primary={true} style={{marginTop: "20px"}}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        document.querySelector('#store-result').scrollIntoView({
            behavior: 'smooth'
        })
    }
}

export default MatchResult;
