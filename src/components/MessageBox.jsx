import React from 'react';
import mui, {Card, TextField} from 'material-ui'
import $ from 'jquery';
import * as keys from '../key.config'
export default class MessageBox extends React.Component {
    constructor(props) {
        super(props);
    }
    _onSubmit(event) {
        let messageText = event.target.value
        let message = {
            text: messageText,
            username: "devin",
           roomname: "hovel"
        };
        $.ajax({
            // This is the url you should use to communicate with the parse API server.
            url: 'https://api.parse.com/1/classes/chatterbox',
            type: 'POST',
            data: JSON.stringify(message),
            beforeSend: function(jqXHR, settings) {
                jqXHR.setRequestHeader("X-Parse-Application-Id", keys.PARSE_APP_ID);
                jqXHR.setRequestHeader("X-Parse-REST-API-Key", keys.PARSE_API_ID);
            },
            contentType: 'application/json',
            success: function () {
                console.log('message submitted!')
            }.bind(this),
            error: function () {
                // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
                console.error('chatterbox: Failed to send message');
            }
        });
        console.log(message)
        event.target.value = ""
    }
    render() {
        return (
            <Card style={{
            maxWidth: 1200,
            margin: '30px auto 30px',
            padding: 30
            }}>
                <TextField
                       defaultValue="type your message here"
                       style={{
                    width: '100%',
                    borderColor: '#D0D0D0',
                    resize: 'none',
                    borderRadius: 3,
                    minHeight: 50,
                    color: '#555',
                    fontSize: 16,
                    // to prevent the textarea from being
                    // highlighted while you type
                    outline: 'auto 0px'
                }}
                onEnterKeyDown={this._onSubmit.bind(this)}
                />
            </Card>
        )
    }
}


