import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {withRouter} from 'react-router'
import {MatchGatewayRemote} from "./Gateway";
import {AppBar} from "material-ui";

class Ranking extends Component {

    constructor(props) {
        super(props);
        this.state = {matches: []};
    }

    componentDidMount() {
        MatchGatewayRemote.fetchAllMatches()
            .then((matches) => this.setState({matches}))
    }

    render() {
        return (
            <div>
                <AppBar title="Last Matches" showMenuIconButton={false}/>
                <div style={{margin: "10px"}}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Game</th>
                            <th>Winner</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.matches.map((match) => (
                            <tr key={match.id}>
                                <td>{match.date}</td>
                                <td>{match.game_name}</td>
                                <td>{match.winner_name}</td>
                                <td>{match.winner_score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <FloatingActionButton mini={true} onTouchTap={() => this.props.history.push('/match')}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}

export default withRouter(Ranking);
