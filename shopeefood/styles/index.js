import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:45,
  },
  main: {
    flex:1,
    justifyContent: 'center',
    marginTop:40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
  },
  fullname: {
    flexDirection:'row',
    marginHorizontal:20,
  },
  mininput:{
    width:'49%',
    marginRight:5,
    marginBottom: 10,
  },
  input:{
    marginHorizontal:20,
    marginBottom:10,
  },
  button: {
    marginHorizontal:20,
    height: 60,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
    marginTop:10,
    margin:'1%'
  },
  infoBubble: {
    marginHorizontal:20,
    marginTop:15,
    flexDirection: 'row',
    justifyContent:'center',
  },
  info: {
    fontSize: 13,
    marginLeft:10,
    color: '#99A3A4',
  },
  link: {
    fontWeight: 'bold',
    color: Colors.blue500,
  },
  dropdown1BtnStyle: {
    width: '90%',
    marginHorizontal:20,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    marginBottom: 10,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
})

export default styles