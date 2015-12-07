import React, { Component } from 'react';
import Message from "./Message.jsx"
import mui, {Card, List } from 'material-ui'

export default class MessageList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var messageNodes = this.props.roomData.map((message, i) => {
            return (
                <Message message={message} key={i} />
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


