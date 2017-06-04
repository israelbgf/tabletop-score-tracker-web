import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const MatchResult = (props) =>
    (
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
                {this.props.players.map((player, index) => (
                    <tr className={player.winner ? "is-selected" : ""} key={index}
                        onClick={this.props.onSelectPlayer(player)}>
                        <td>{player.position}</td>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                        <td>{player.winner ? "winner" : ""}</td>
                    </tr>
                )).toArray()}
                </tbody>
            </table>
        </div>
    );

export default MatchResult;
