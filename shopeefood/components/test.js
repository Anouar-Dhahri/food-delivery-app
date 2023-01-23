import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import React from 'react'
import {Ionicons, Fontisto} from 'react-native-vector-icons';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios'
import { API } from './../../configs';

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('./../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.footer} >
        <Text style={styles.title}>
        Created By : Anouar Dhahri
        </Text>
        <Text style={styles.text}>Developed With : </Text>
        <View style={styles.devView}>
          <Ionicons name="logo-react" size={90} color="#03E1E1"/>
          <Ionicons name="logo-angular" size={90} color="#F3321F"/>
          <Ionicons name="logo-nodejs" size={90} color="#34495E"/>
          <Fontisto name="mongodb" size={90} color="#2ECC71"/>
        </View>
      </View>
    </View>
  )
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    width: height_logo,
    height: height_logo,
    borderRadius:height_logo / 2,

  },
  title: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    color: 'grey',
    marginTop:5
  },
  devView: {
    justifyContent:'center',
    marginTop:20,
    flexDirection:'row',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 20
  },
})

export default AboutScreen