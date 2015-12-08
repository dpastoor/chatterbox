import React, { Component } from 'react';
import Message from "./Message.jsx"
import mui, {Card, List } from 'material-ui'

export default class MessageList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var lastMessages = _.take(this.props.roomData, 10).reverse()
        console.log('last messages: ')
        console.log(lastMessages)
        var messageNodes = lastMessages.map((message, i) => {
            return (
                <Message message={message} key={message.objectId} />
            );
        });
        return (
            <Card style={{
            flexGrow: 4,
            marginLeft: 30
            }}>
                <List>
                    <div style={{
                    color: 'black',
                    fontSize: 20,
                    textAlign: 'center'
                       }}>
                        Messages
                    </div>
                    {messageNodes}
                </List>
            </Card>
        )
    }
}


