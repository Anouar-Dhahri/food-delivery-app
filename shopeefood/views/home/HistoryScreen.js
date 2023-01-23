import { ScrollView ,View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React,{ useState, useCallback } from 'react'
import { Header } from '../../components';
import { Searchbar, IconButton, Colors, Badge, Button} from 'react-native-paper';
import {Ionicons, MaterialCommunityIcons} from 'react-native-vector-icons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios'
import { API } from './../../configs';

const HistoryScreen = ({ navigation }) => {

  const [orders, setOrders] = useState([]);
  const [backup, setBackup] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(true);

  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      fetchAPI()
      return () => {
        console.log('Screen was unfocused');   
      };
    }, [])
  );

  const fetchAPI = async () => {
    await axios.get(`${API}/orders/history/${route.params.user._id}`)
    .then((result) => {
      if(result.data.success) {
        setOrders(result.data.orders);
        setBackup(result.data.orders)
      }
    })
  }

  const onChangeSearch = (text) => {
    const query = backup.filter((item) => {
      const item_data = `${item.createdAt.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchQuery(text);
    setOrders(query);
    console.log(query);
  }

  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center',
      flexGrow:1
    }}>
      <View style={styles.container}>
        <Header title="Order History" />
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
        {
          orders.map((order, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.card} 
              disabled={true}
            >
              <View style={styles.cardcontent}>
                <Image style={styles.cardimage} source={require('./../../assets/orders.jpg')} />
                <View style={styles.carddetails}>
              
                  <View 
                    style={{ 
                      flexDirection: "row", 
                      marginLeft:20,
                      alignItems:'center',
                      marginVertical:5
                    }}
                  >
                    <Ionicons 
                      name="pricetag-outline" 
                      color={Colors.black500} 
                      size={15}
                    />
                    <Text style={{fontSize:20, fontWeight:'bold', color: Colors.black500, marginLeft:5} }>{ order.totalPrice} DT</Text>
                  </View>

                  <View 
                    style={{ 
                      flexDirection: "row", 
                      marginLeft:20,
                      alignItems:'center' 
                    }}
                  >
                    <Ionicons 
                      name="md-time-outline" 
                      color="gray" 
                      size={15}
                    />
                    <Text 
                      style={{
                        color:"gray", 
                        marginLeft:5
                      }}
                    >
                      {new Date(order.createdAt).toLocaleDateString()+ ' '+new Date(order.createdAt).toLocaleTimeString()}
                    </Text>
                  </View>
                {
                  order.statut === true ?
                    <View 
                      style={{ 
                        flexDirection: "row", 
                        marginLeft:20,
                        alignItems:'center',
                        marginTop:20
                      }}
                    >
                      <MaterialCommunityIcons 
                        name="thumb-up-outline" 
                        color={Colors.green500} 
                        size={15}
                      />
                      <Text 
                        style={{
                          color:Colors.green500, 
                          marginLeft:5
                        }}
                      >
                        Valid
                      </Text>
                    </View>
                  :
                    <View 
                      style={{ 
                        flexDirection: "row", 
                        marginLeft:20,
                        alignItems:'center',
                        marginTop:20
                      }}
                    >
                      <MaterialCommunityIcons 
                        name="thumb-down-outline" 
                        color={Colors.red500} 
                        size={15}
                      />
                      <Text 
                        style={{
                          color:Colors.red500, 
                          marginLeft:5
                        }}
                      >
                        Invalid
                      </Text>

                    </View>
                  }
                </View>
              </View>
              <View style={styles.cardaction}>
                <Button icon="format-list-text" mode="text" compact={true} onPress={() => navigation.navigate('OrderDetailScreen', { orders: order.items})}>
                  details
                </Button>
                <Button icon="map-marker-circle" mode="text" compact={true} color={Colors.blue500} onPress={() => navigation.navigate('MapScreen')}>
                  Track
                </Button>
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
    marginBottom:20
  },
  card:{
    width:'100%',
    marginVertical:5,
    backgroundColor:'#FFF',
    minHeight:100,
    padding:15,
    borderRadius:10,
    borderWidth:1,
    borderColor:"#dadada"
  },
  cardcontent:{
    flexDirection:'row',
    alignItems: 'center'
  },
  cardimage:{
    width:100,
    height:100,
    borderRadius:10
  },
  carddetails:{
    flex:1,
  },
  cardaction:{
    flexDirection:'row',
    marginTop:20
  },
})

export default HistoryScreen