import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  modalArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000099',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalAreaInterna: {
    width: '80%',
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  btnSearch: {
    width: '80%',
    backgroundColor: '#3470A4',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative'
  },
  iconSearch: {
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  textSearch: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 20
  },
  textInput: {
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
    borderWidth: 1,
    borderColor: '#3470A4',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default styles
