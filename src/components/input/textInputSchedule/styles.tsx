import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  inputArea: {

    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'

  },

  area: {

    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 7,
    fontSize: 17,
    color: '#333',
    height: 50,
    padding: 10,
    elevation: 5,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10

  },

  input: {

    flex: 1,
    color: '#333'

  },

  icon: {

    paddingLeft: 10,
    paddingRight: 10

  }

})

export default styles
