import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useState, useCallback} from 'react'
import {Ionicons, MaterialCommunityIcons} from 'react-native-vector-icons';
import { Searchbar, Chip, IconButton, Colors, Avatar, Badge} from 'react-native-paper';
import axios from 'axios'
import { useToast } from 'react-native-toast-notifications';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { API, HOST } from './../../configs';
import { cartTotalSelector } from "./../../redux/selector";

const RestaurentsScreen = ({ navigation }) => {

  const [restaurants, setRestaurants] = useState([])
  const [backup, setBackup] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const cart = useSelector((state) => state.cart);

  const [visible, setVisible] = useState(true);

  const route = useRoute();

  const total = useSelector(cartTotalSelector);

  useFocusEffect(
    useCallback(() => {
      fetchAPI()
      return () => {
        console.log('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [])
  );

  const fetchAPI = async () => {
    await axios.get(`${API}/restaurants/get`)
    .then((result) => {
      if(result.data.success){
        setRestaurants(result.data.restaurants)
        setBackup(result.data.restaurants)
      }
    })
  }

  const onChangeSearch = (text) => {
    const query = backup.filter((item) => {
      const item_data = `${item.name.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchQuery(text);
    setRestaurants(query);
    console.log(query);
  }

  const searchBySpeciality = (Speciality) => {
    if(Speciality == 'all' ){
      setRestaurants(backup)
    }else {
      console.log(Speciality)
      const query = backup.filter((item) => {
        const item_data = `${item.speciality.toUpperCase()}`;
        const text_data = Speciality.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setRestaurants(query);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' 
    }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: 'center'}}>
          <View style={{ flex: 1 }}>
            <Text style={{fontSize:20, fontWeight:'bold'}}> Welcome {route.params.user.name}</Text>
            <View 
              style={{ 
                flexDirection: "row", 
                marginLeft:5,
                alignItems:'center' 
              }}
            >
              <Ionicons 
                name="location-outline" 
                color="gray" 
                size={15}
              />
              <Text 
                style={{
                  color:"gray", 
                  marginLeft:5
                }}
              >
                {route.params.user.state}, Tunisia
              </Text>
            </View>
          </View>
          <View>
            <Badge visible={visible} style={styles.badge}>{total}</Badge>
            <IconButton
              icon="shopping"
              color={Colors.blue500}
              size={30}
            />
          </View>

        </View>

        <Searchbar
          placeholder="Search"
          style={{
            marginVertical:15,
            padding:8,
            borderRadius:30,
            backgroundColor:'#e3e3e3'
          }}
          clearIcon={()=><Ionicons name="ios-filter-outline" color="#000" size={20}/>}
          onChangeText={(text) => onChangeSearch(text)}
          value={searchQuery}
        />
        <ScrollView 
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ flexDirection: "row"}}>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('./../../assets/resetfood.jpg')} />}
              onPress={() => searchBySpeciality("all")} 
              style={{height:40, marginRight:10}}
            >
              All
            </Chip>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('./../../assets/fish.jpg')} />}
              onPress={() => searchBySpeciality("Fish")} 
              style={{height:40, marginRight:10}}
            >
              Fish
            </Chip>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('./../../assets/meat.jpg')} />}
              onPress={() => searchBySpeciality("Meats")} 
              style={{height:40, marginRight:10}}
            >
              Meat
            </Chip>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('./../../assets/roast-chicken-1.jpg')} />}
              onPress={() => searchBySpeciality("Roasted Chicken")} 
              style={{height:40, marginRight:10}}
            >
              Roasted Chicken
            </Chip>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('./../../assets/Hombourger.jpg')} />}
              onPress={() => searchBySpeciality("Hamburger")} 
              style={{height:40, marginRight:10}}
            >
              Hamburger
            </Chip>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('./../../assets/Pizza.jpg')} />}
              onPress={() => searchBySpeciality("Pizza")} 
              style={{height:40, marginRight:10}}
            >
              Pizza
            </Chip>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('./../../assets/plats.jpg')} />}
              onPress={() => searchBySpeciality("Dishes")} 
              style={{height:40, marginRight:10}}
            >
              Dishes
            </Chip>
          </View>
        </ScrollView>
        {
          restaurants.map((restaurant, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.card} 
              onPress={() => navigation.navigate('MenuItemScreen', { restaurant:restaurant, user:route.params.user })}
            >
              <Image source={{uri: HOST+restaurant.image}} style={{width:"100%",height:200}}/>
              <Text style={{ fontSize:20, fontWeight:'bold',marginVertical:5}}>{restaurant.name} </Text>
              <View 
                style={{
                  flexDirection: "row", 
                  alignItems:'center' ,
                  marginVertical:5
                }} 
              >
                <Ionicons 
                  name="location-outline" 
                  color="gray" 
                  size={15}
                />
                <Text 
                  style={{
                    color:"gray", 
                    marginLeft:5
                  }}
                >
                  {restaurant.address}, {restaurant.state}
                </Text>
                <Text>  </Text>
                <Ionicons 
                  name="md-star" 
                  color="orange" 
                  size={15}
                />
                <Text            
                  style={{
                    color:"gray", 
                    marginLeft:5
                  }}>
                  5
                </Text>
              </View>

              <View 
                style={{
                  flexDirection: "row", 
                  alignItems:'center' 
                }} 
              >
                <Ionicons 
                  name="call-outline" 
                  color="gray" 
                  size={15}
                />
                <Text 
                  style={{
                    color:"gray", 
                    marginLeft:5
                  }}
                >
                  {restaurant.phone}
                </Text>
                <Text>  </Text>
                <MaterialCommunityIcons 
                  name="chef-hat" 
                  color="gray" 
                  size={15}
                />
                <Text 
                  style={{
                    color:"gray", 
                    marginLeft:5
                  }}
                >
                  Speciality : {restaurant.speciality}
                </Text>
                <Text>  </Text>
              </View>

            </TouchableOpacity>
          ))
        }

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:45,
    paddingHorizontal:20,
  },
  card:{
    width:'100%',
    marginVertical:20,
    backgroundColor:'#FFF',
    minHeight:250,
    padding:15,
    borderRadius:10,
    borderColor:"#000"
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 2,
  },

})

export default RestaurentsScreen