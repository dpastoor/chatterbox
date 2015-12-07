import React from 'react';
import mui, {ListItem} from 'material-ui'

export default class Channel extends React.Component {
    constructor(props) {
        super(props);
    }

    _handleClick(room) {
        this.props.setRoom(room);
    }
    render() {
        return (
            <ListItem onClick={this._handleClick.bind(this, this.props.channel)}>
                 {this.props.channel}
            </ListItem>
        )
    }
}


