import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const ResultTable = ({players, onSelectPlayer}) => {
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Position</th>
                    <th>Player</th>
                    <th>Score</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {players.map((player, index) => (
                    <tr className={player.get('winner') ? "is-selected" : ""} key={index}
                        onClick={() => onSelectPlayer(index, player)}>
                        <td>{index + 1}</td>
                        <td>{player.get('name')}</td>
                        <td>{player.get('score')}</td>
                        <td>{player.get('winner') ? "winner" : ""}</td>
                    </tr>
                )).toArray()}
                </tbody>
            </table>
        </div>
    )
}

ResultTable.defaultProps = {
    onSelectPlayer: x => undefined,
}

export default ResultTable;
