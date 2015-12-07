import React from 'react';
import mui, {ListItem} from 'material-ui'

export default class Channel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ListItem style={{background: 'blue'}}>
                 {this.props.channel}
            </ListItem>
        )
    }
}


