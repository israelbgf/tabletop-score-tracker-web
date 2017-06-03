import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class MatchResult extends Component {
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
                    <tr className="is-selected">
                        <td>1th</td>
                        <td>Israel</td>
                        <td>38</td>
                        <td>Winner</td>
                    </tr>
                    <tr className="is-selected">
                        <td>1th</td>
                        <td>Juan</td>
                        <td>38</td>
                        <td>Winner</td>
                    </tr>
                    <tr>
                        <td>2nd</td>
                        <td>Bob</td>
                        <td>32</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>3rd</td>
                        <td>Modesto</td>
                        <td>20</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <div id="store-result" style={{display: "flex-box"}}>
                    <RaisedButton label="Store Result" primary={true} style={{"margin-top": "20px"}}/>
                </div>
            </div>
        );
    }

    componentDidMount(){
        document.querySelector('#store-result').scrollIntoView({
            behavior: 'smooth'
        })
    }
}

export default MatchResult;
