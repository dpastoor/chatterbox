import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import _ from 'lodash'
import './css/styles.css'
import mui, {AppBar, Styles, TextField} from 'material-ui'
import MessageList from './components/MessageList.jsx'
import ChannelList from './components/ChannelList.jsx'
import MessageBox from './components/MessageBox.jsx'
import * as keys from './key.config'
const ThemeManager = Styles.ThemeManager;
const MyRawTheme = require('./css/MyRawTheme');


export default class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {rawData: [],
          rooms: [],
          roomData: [],
          userName: ""
      }
  }

// want to add colors to context to make available to other components
  static childContextTypes = {
    //just declares we will stick on child context, not actually setting it
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
    };
  }
  _getRooms(dataArray) {
      var rooms = _.uniq(_.map(dataArray, (m) => m.roomname)).sort()
      console.log('unique rooms: ' + JSON.stringify(rooms))
      this.setState({rooms: rooms})

  }

  _getAllMessages() {
      $.ajax({
          // This is the url you should use to communicate with the parse API server.
          url: 'https://api.parse.com/1/classes/chatterbox',
          type: 'GET',
          beforeSend: function(jqXHR, settings) {
              jqXHR.setRequestHeader("X-Parse-Application-Id", keys.PARSE_APP_ID);
              jqXHR.setRequestHeader("X-Parse-REST-API-Key", keys.PARSE_API_ID);
          },
          data: 'limit=200',
          contentType: 'application/json',
          success: function (data) {
             // console.log(data)
              this._getRooms(data.results);
              console.log(data.results);
             // console.log(rooms)
              this.setState({rawData: data});
              if (this.state.hasOwnProperty('currentRoom')) {
                  this._filterMessages(this.state.currentRoom);
              }
          }.bind(this),
          error: function (data) {
              // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
              console.error('chatterbox: Failed to send message');
          }
      });
  }

  _filterMessages(roomName) {
      let rawData = this.state.rawData;
      let roomData = _.filter(this.state.rawData.results, (d) => {
          //console.log(d);
          //console.log(d.roomname + ' ===' + roomName);
          return d.roomname === roomName
      });
      this.setState({roomData: roomData})
  }
  componentWillMount() {
      this._getAllMessages()

      setInterval(() => {
          this._getAllMessages()
      },5000)
  }

  _setCurrentRoom(roomName) {
    this.setState({
        currentRoom: roomName
    });
    this._filterMessages(roomName);
  }
  _setUser(e) {
      this.setState({
          userName: e.target.value
      });
      e.target.value = ""
  }

  render() {
        return (
            <div>

                <AppBar title={"Welcome to chatterbox " + this.state.userName + "!"}> </AppBar>
                {
                    (this.state.userName === "") ?
                <TextField
                    hintText="Who are you?"
                    style={{
                    width: '100%',
                    height: '100%',
                    borderColor: '#D0D0D0',
                    resize: 'none',
                    borderRadius: 3,
                    minHeight: 50,
                    color: '#555',
                    fontSize: 70,
                    // to prevent the textarea from being
                    // highlighted while you type
                    outline: 'auto 0px'
                }}
                    onEnterKeyDown={this._setUser.bind(this)}
                /> :

                <div style={{
                display: 'flex',
                flexFlow: 'row no-wrap',
                maxWidth: 1200,
                maxHeight: '500',
                width: '100%',
                margin: '30px auto 30px'
                }}>
                    <ChannelList rooms={this.state.rooms} setRoom={this._setCurrentRoom.bind(this)} />
                    <MessageList roomData={this.state.roomData} > </MessageList>
                </div>
                    }
                { (this.state.currentRoom) ?

                <MessageBox room={this.state.currentRoom} user={this.state.userName} /> : null

                    }
            </div>
        );
  }
}



