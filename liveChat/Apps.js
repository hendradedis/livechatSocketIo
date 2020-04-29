import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import WS from 'react-native-websocket'


export default class Apps extends Component {

  // componentDidMount() {

  // }
  
  render() {
    return (
      <View style={styles.container}>
        <WS
          ref={ref => {this.ws = ref}}
          url="http://10.100.8.100:3030"
          onOpen={() => {
            console.log('Open!')
            this.ws.send('Hello')
          }}
          onMessage={console.log('onMessage')}
          onError={console.log('errror')}
          onClose={console.log}
          reconnect // Will try to reconnect onClose
        />
        <Text style={{color:'red'}}> textInComponent </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
})