import React, { Component } from 'react';
import Message from "./Message.jsx"
import mui, {Card, List } from 'material-ui'

export default class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                'hello how are you',
                'I am fine, and you'
            ]
        }
    }
    render() {
        var messageNodes = this.state.messages.map((message) => {
            return (
                <Message message={message} />
            );
        });
        return (
            <Card style={{
            flexGrow: 4,
            marginLeft: 30
            }}>
                <List>
                    {messageNodes}
                </List>
            </Card>
        )
    }
}


