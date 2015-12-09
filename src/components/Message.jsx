import React from 'react';
import mui, {ListItem, Avatar} from 'material-ui'
import moment from 'moment'
export default class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
                <ListItem style= {{
                flexWrap: 'wrap',
                wordWrap: 'break-word'
                }}
                    //leftAvatar={<Avatar src="https://avatars1.githubusercontent.com/u/3196313?v=3&s=460" />}
                >
                    <span style={{width: '99%'}}>
                        {this.props.message.username} : {this.props.message.text} created at {moment(this.props.message.createdAt).fromNow()}
                    </span>
                </ListItem>
        )
    }
}


