
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput  
} from 'react-native';
import io from 'socket.io-client'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chatMessage:"",
      chatMessages:[]
    }
  }

  componentDidMount() {
    this.socket = io("http://192.168.1.4:3000");
    this.socket.on("chat message", msg => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]})
    })

  }

  submitChatMessage() {
    console.log(this.state.chatMessage, "auuu")
      this.socket.emit("chat message", this.state.chatMessage)
      this.setState({chatMessage:""})
  }

  render() {
    let chatMessages = this.state.chatMessages.map((chatMessages, index) => (
    <Text style={{marginTop:10, marginHorizontal:10}} key={chatMessages+index}>{chatMessages}</Text>
    ))
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <TextInput
              style={{height:40, borderWidth:1, borderColor:'grey', margin:10, paddingHorizontal:10, justifyContent:"flex-end" }}
              autoCorrect={false}
              value={this.state.chatMessage}
              onSubmitEditing={() => this.submitChatMessage()}
              onChangeText={chatMessage => {
                this.setState({chatMessage})
              }}
          />
          {chatMessages}
      </SafeAreaView>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f5fcff'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  }
});


