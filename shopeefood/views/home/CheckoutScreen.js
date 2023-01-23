import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React,{ useState } from 'react'
import { IconButton, Colors, Badge, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios'
import { API } from './../../configs'
import { cartTotalPriceSelector, cartTotalSelector } from "./../../redux/selector";
import {
  clear,
} from "./../../redux/features/CartSlice";
import { HOST } from './../../configs';

const CheckoutScreen = ({ navigation }) => {

  const [visible, setVisible] = useState(true);

  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector(cartTotalPriceSelector);
  const total = useSelector(cartTotalSelector);

  const dispatch = useDispatch()

  const toast = useToast()
  const route = useRoute();

  const onOrderSubmit = async () => {
    await axios.post(`${API}/orders/create`, {
      clientId: route.params.user._id,
      items: cart,
      restaurantId: route.params.restaurant._id,
      totalPrice:totalPrice,
      paymentType: "Cash on delivery",
      paid: false,
      state:route.params.user.state
    }).then((result) => {
      if(result.data.success) {
        toast.show(result.data.message, {
          type: "success",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
        dispatch(clear())
        navigation.navigate('Restaurents')
      }else {
        toast.show(result.data.message, {
          type: "danger",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
      }
    })
  }
  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center',
      flexGrow:1
    }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: 'center'}}>
          <View style={{ flex: 1 }}>
            <Text style={{fontSize:20, fontWeight:'bold'}}> Checkout</Text>
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
        <View style={styles.card}>
          <Text style={{fontSize:20, fontWeight:'bold', color: '#3C4048', marginBottom:10} }>Items</Text>
          {
            cart.map((item, index) => (
              <TouchableOpacity key={index} style={styles.minicard}>
                <Image style={styles.minicardimage}source={{uri:HOST+item.image}} />
                <View style={styles.minicarddetails}>
                  <Text style={{fontSize:20, fontWeight:'bold', color: '#3C4048', marginLeft:5}}>{item.name}</Text>
                  <Text style={{fontSize:15, fontWeight:'bold', color: '#3C4048', marginLeft:5}}>{item.quantity+' x '+item.price} DT</Text>
                </View>
              </TouchableOpacity>
            ))
          }
          <Text style={{fontSize:15, fontWeight:'bold', color: '#3C4048', marginLeft:5} }></Text>
          <Button 
            mode="text" 
            color="#3C4048"
            style={styles.button}
          >
              Total : {totalPrice} DT
          </Button>
          <Button 
            mode="contained" 
            color="#00ABB3"
            onPress={onOrderSubmit}
            style={styles.button}
          >
              Order
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:45,
    paddingHorizontal:20,
    marginBottom:5
  },
  card:{
    flex:1,
    width:'100%',
    marginVertical:20,
    backgroundColor:'#FFF',
    padding:15,
    borderRadius:10,
    borderWidth:1,
    borderColor:"#dadada"
  },
  minicard:{
    flexDirection:'row',
    alignItems: 'center',
    marginBottom:10,
    borderWidth:1,
    borderColor:"#00ABB3",
    borderRadius:10,
    padding:10,
  },
  minicardimage:{
    width:100,
    height:100,
    borderRadius:10
  },
  minicarddetails:{
    flex:1,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 2,
  },
  totalPrice:{
    alignItems:'center',
    width:'100%',
    marginVertical:10,
    backgroundColor:'#FFF',
    minHeight:40,
    padding:15,
    borderRadius:10,
    borderColor:"#000"
  },
  button: {
    width:'100%',
    height: 60,
    marginTop: 10,
    justifyContent: "center",
    borderRadius: 30,
    margin:'1%'
  },
})

export default CheckoutScreen