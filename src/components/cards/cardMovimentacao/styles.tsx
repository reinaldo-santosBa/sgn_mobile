import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    elevation: 3
  },
  cardTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10
  },
  credito: {
    color: 'green',
    fontSize: 16
  },
  debito: {
    color: 'red',
    fontSize: 16
  },
  data: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  data2: {
    fontSize: 18,
    fontWeight: '400'
  }
})

export default styles
