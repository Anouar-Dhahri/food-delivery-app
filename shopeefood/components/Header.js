import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { IconButton, Colors, Badge} from 'react-native-paper';
import { useSelector } from 'react-redux'
import { cartTotalSelector } from "./../redux/selector";

const Header = ({ title }) => {

  const [visible, setVisible] = useState(true);

  const total = useSelector(cartTotalSelector);

  return (
    <View style={{ flexDirection: "row", alignItems: 'center', paddingHorizontal:20,}}>
      <View style={{ flex: 1 }}>
        <Text style={{fontSize:20, fontWeight:'bold'}}> { title }</Text>
      </View>
      <View>
        <Badge visible={visible} style={styles.badge}>{total}</Badge>
        <IconButton
          icon="shopping"
          color={Colors.blue500}
          size={30}
          onPress={() => console.log('Pressed')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 5,
    right: 2,
  },
})

export default Header