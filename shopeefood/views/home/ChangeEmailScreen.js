import { View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, Text, Colors } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import { API } from './../../configs';
import { Header } from '../../components';
import styles from './../../styles'

const ChangeEmailScreen = ({ navigation }) => {

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();
  
  const onSubmitPressed = async () => {
    setLoading(true)
    if(!currentEmail) {
      toast.show("Current Email is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!newEmail) {
      toast.show("New Email is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      await axios.put(`${API}/auth/updatemail/${route.params.user._id}`, {
        currentEmail: currentEmail,
        newEmail: newEmail
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
          setCurrentEmail('');
          setNewEmail('');
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
      <Header title="Change Email" />
      <View style={styles.main} >
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            activeOutlineColor="#1687FF"
            mode="outlined"
            label="Current Email"
            value={currentEmail}
            onChangeText={text => setCurrentEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            activeOutlineColor="#1687FF"
            mode="outlined"
            label="New Email"
            value={newEmail}
            onChangeText={text => setNewEmail(text)}
            keyboardType="email-address"
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

export default ChangeEmailScreen