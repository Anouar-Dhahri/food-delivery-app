import { StyleSheet, Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <Image source={require('./../assets/logo.png')} style={styles.image} />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 110,
    marginBottom: 30,
    marginHorizontal:20,
  },
})

export default Logo