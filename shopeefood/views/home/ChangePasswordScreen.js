import {View } from 'react-native'
import React, { useState } from 'react'
import { Header } from '../../components';
import { TextInput, Button, Text, Colors } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import { API } from './../../configs';
import styles from './../../styles'

const ChangePasswordScreen = ({ navigation }) => {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();

  const onSubmitPressed = async () => {
    setLoading(true)
    if(!currentPassword) {
      toast.show("Current Password is required !", {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!newPassword) {
      toast.show("New Password is required  !", {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      await axios.put(`${API}/auth/updatepassword/${route.params.user._id}`, {
        currentPassword: currentPassword,
        newPassword: newPassword
      }).then((result) => {
        if(result.data.success) {
          toast.show(result.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
          setCurrentPassword('');
          setNewPassword('');
          navigation.navigate("LoginScreen");
        }else {
          toast.show(result.data.message, {
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
      <Header title="Change Password" />
      <View style={styles.main} >
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            activeOutlineColor="#1687FF"
            secureTextEntry={true} 
            mode="outlined"
            label="Current Password"
            value={currentPassword}
            onChangeText={text => setCurrentPassword(text)}
          />
          <TextInput
            style={styles.input}
            activeOutlineColor="#1687FF"
            secureTextEntry={true} 
            mode="outlined"
            label="New Password"
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
          />
        </View>
        <Button 
          mode="contained" 
          loading={loading}
          color="#00ABB3"
          onPress={onSubmitPressed}
          style={styles.button}
        >
          Submit
        </Button>
        <View style={styles.infoBubble}>
          <Ionicons name="information-circle-sharp" size={35} color={Colors.red500}/>
          <Text style={styles.info}>You will be redirected to the <Text style={styles.link}>login page</Text> after updating your password</Text>
        </View>
      </View>
    </View>
  )
}

export default ChangePasswordScreen