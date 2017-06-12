import React from 'react';
import {Map} from 'immutable'
import {formatPosition} from './Util'

const ResultTable = ({players=Map(), onSelectPlayer}) => {
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Position</th>
                    <th>Player</th>
                    <th>Score</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {players
                    .map((player, index) => (
                        <tr className={player.get('winner') ? "is-selected" : ""} key={index}
                            onClick={() => onSelectPlayer(index, player)}>
                            <td>{formatPosition(index + 1)}</td>
                            <td>{player.get('name')}</td>
                            <td>{player.get('score')}</td>
                            <td style={{width: "100px"}}>{player.get('winner') ? "winner" : "loser"}</td>
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
