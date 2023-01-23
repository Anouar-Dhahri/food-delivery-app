import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, Text, Colors } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import { API } from './../../configs';
import { Header } from '../../components';
import styles from './../../styles'

const ProfileScreen = ({ navigation }) => {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [etat, setEtat] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();

  const states = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kébili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Médenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan"
  ];

  const onSubmitPressed = async () => {
    setLoading(true)
    if(!nom) {
      toast.show("Name is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!prenom) {
      toast.show(" Surname is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!telephone) {
      toast.show("Phone number is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!adresse) {
      toast.show("adress is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!etat) {
      toast.show("State is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      await axios.put(`${API}/auth/profile/${route.params.user._id}`, {
        nom: nom,
        prenom:prenom,
        telephone: telephone,
        adresse:adresse,
        etat:etat
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
          setNom("");
          setPrenom("");
          setTelephone("");
          setAdresse("");
          setEtat("");
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
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' ,
      flexGrow: 1
    }}>
      <View style= {styles.container}>
        <Header title="Profile" />
        <View style={styles.main} >
          <View style={styles.inputView}>
            <View style={styles.fullname}>
              <TextInput
                style={styles.mininput}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Name"
                value={nom}
                onChangeText={text => setNom(text)}
              />

              <TextInput
                style={styles.mininput}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Surname"
                value={prenom}
                onChangeText={text => setPrenom(text)}
              />
            </View>
            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              mode="outlined"
              label="Phone Number"
              value={telephone}
              onChangeText={text => setTelephone(text)}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              mode="outlined"
              label="Adress"
              value={adresse}
              onChangeText={text => setAdresse(text)}
            />

            <SelectDropdown
              data={states}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setEtat(selectedItem)
              }}
              defaultButtonText={'Select State'}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}

              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
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
    </ScrollView>
  )
}

export default ProfileScreen