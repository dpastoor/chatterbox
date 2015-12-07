import React from 'react';
import mui, {ListItem, Avatar} from 'material-ui'
export default class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ListItem
                //leftAvatar={<Avatar src="https://avatars1.githubusercontent.com/u/3196313?v=3&s=460" />}
            >
                {this.props.message.username}  {this.props.message.text}
            </ListItem>
        )
    }
}


