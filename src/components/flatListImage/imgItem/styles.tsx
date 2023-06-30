import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  containerImage: {

    width: 'auto',
    height: 'auto',
    paddingLeft: 20,
    paddingRight: 20

  },

  image: {

    height: '100%',
    position: 'relative'

  },

  overlay: {

    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    borderRadius: 30

  },

  text: {

    position: 'absolute',
    color: '#fff',
    bottom: 20,
    left: 20,
    fontSize: 20,
    fontWeight: 'bold'

  }

})

export default styles
