import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarcodeScanner } from 'expo-barcode-scanner';

export default class BookTransactionScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      hasCameraPermission:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal',
    }
  }
  getCameraPermission = async()=>{
    const{status} = await Permissions.askAsync(Permission.Camera);
    this.setState({
      hasCameraPermission:status === "granted"
    })
  }
  handleBarCodeScanned = async({type,data})=>{
      this.setState({
          scanned:true,
          scannedData:data,
          buttonState:'normal',
      })
  }
    render(){
        const hasCameraPermission = this.state.hasCameraPermission;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState === 'clicked' && hasCameraPermission){
            return(
                <BarCodeScanner
                  onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned}
                  style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState === 'normal'){

        return(
            <View style = {styles.container}>
              <Text>
                  {hasCameraPermission === true?this.state.scannedData:"Request Camera Permission"}
              </Text>
              <TouchableOpacity
              onPress = {
                  this.getCameraPermission
              }
              style = {styles.scanButton}>
                  <Text style = {styles.buttonText}>
                      Scan QR Code
                  </Text>
              </TouchableOpacity>
            </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  scanButton:{
    backgroundColor:'#FF00F0',
    padding:10,
    margin:10,
  },
  buttonText:{
    fontSize:15,
    textDecorationLine:'underline',
  },
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})