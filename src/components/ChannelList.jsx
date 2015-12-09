import React, { Component } from 'react';
import Channel from "./Channel.jsx"
import mui, {Card, List } from 'material-ui'

export default class ChannelList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var channelNodes = this.props.rooms.map((room) => {
            return (
                <Channel channel={room} setRoom={this.props.setRoom}/>
            );
        });
        return (
            <Card style={{
                flexGrow: 1,
                minWidth: '33vw',
                overflowY: 'auto'
            }}>
                <List>
                       <div style={{
                    color: 'black',
                    fontSize: 20,
                    textAlign: 'center'
                       }}>
                           Channel List
                       </div>
                    {channelNodes}
                </List>
            </Card>
        )
    }
}


