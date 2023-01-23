import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import React from 'react'
import {Ionicons, Fontisto} from 'react-native-vector-icons';
import { Header } from '../../components';

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="About" />
      <View style={styles.footer} >
        <Image 
          source={require('./../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>
        Created By : Anouar Dhahri
        </Text>
        <Text style={styles.text}>Developed With : </Text>
        <View style={styles.devView}>
          <Ionicons name="logo-react" size={90} color="#03E1E1"/>
          <Ionicons name="logo-nodejs" size={90} color="#34495E"/>
          <Fontisto name="mongodb" size={90} color="#2ECC71"/>
        </View>
      </View>
    </View>
  )
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:45,
  },
  footer: {
    flex:1,
    justifyContent: 'center',
    marginTop:40,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
  },
  logo:{
    width: height_logo,
    height: height_logo,
    borderRadius:height_logo / 2,
  },
  title: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    color: 'grey',
    marginTop:5
  },
  devView: {
    marginTop:20,
    flexDirection:'row',
  },
})

export default AboutScreen