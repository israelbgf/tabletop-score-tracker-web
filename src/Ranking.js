import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {withRouter} from 'react-router'

class Ranking extends Component {
    render() {
        return (
            <div>
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
                    <tr>
                        <td>2017/10/23</td>
                        <td>Mombasa</td>
                        <td>Israel</td>
                        <td>37</td>
                    </tr>
                    <tr>
                        <td>2017/10/23</td>
                        <td>Scythe</td>
                        <td>Hudolf</td>
                        <td>27</td>
                    </tr>
                    </tbody>
                </table>
                <FloatingActionButton mini={true} onTouchTap={() => this.props.history.push('/match')}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default withRouter(Ranking);
