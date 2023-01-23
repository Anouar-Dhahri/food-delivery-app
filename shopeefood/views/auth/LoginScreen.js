import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, Text } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { API } from './../../configs';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const storeData = async (token, user) => {
    try {
      const userObject = JSON.stringify(user);
      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@user', userObject);
      navigation.navigate("Hello", {user: user});
    } catch (e) {
      console.log(e);
    }
  }

  const onLoginPressed = async () => {
    setLoading(true)
    if(!email) {
      toast.show("Entrer votre email !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!password) {
      toast.show("Entrer votre mot de passe !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      await axios.post(`${API}/auth/login`, {
        email:email,
        password: password
      }).then((response) => {
        if(response.data.success) {
          toast.show(response.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
          storeData(response.data.token, response.data.user)
          setEmail("");
          setPassword("");
          
        }else {
          toast.show(response.data.message, {
            type: "danger",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
        }
      })
    }
  }

  return (
    <View style= {styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}></Text>
      </View>
      <View style={styles.main} >
        <Text style={{fontSize: 30, color: '#000', fontWeight: 'bold'}}>
            Welcome Back
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            activeOutlineColor="#1687FF"
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            activeOutlineColor="#1687FF"
            secureTextEntry={true} 
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button 
          mode="contained" 
          loading={loading}
          compact={false} 
          color="#1687FF"
          onPress={onLoginPressed}
          style={styles.button}
        >
          LOGIN
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#009387'
  },
  header: {
    marginVertical: 20,
    marginHorizontal:20,
    width:'100%',
    height:100
  },
  title:{
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  inputView:{
    marginTop:50
  },
  input:{
    marginBottom:20,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgot: {
    fontSize: 13,
    color: '#99A3A4',
  },
  button: {
    height: 60,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
    marginTop:10,
    margin:'1%'
  },
  row: {
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 10,
  },
  link: {
    fontWeight: 'bold',
    color: '#CACFD2',
  },
})

export default LoginScreen