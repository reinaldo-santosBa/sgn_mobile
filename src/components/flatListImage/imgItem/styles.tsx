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
    bottom: 20,
    left: 20,
    fontSize: 20,
    fontWeight: '900'

  }

})

export default styles
