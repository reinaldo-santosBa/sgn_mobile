import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 20,
    margin: 20,
    display: 'flex',
    padding: 20,
    marginBottom: 20
  },
  areaText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    maxWidth: '90%',
    marginTop: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    textAlign: 'left'
  },
  description: {
    fontSize: 17,
    maxWidth: '90%',
    textAlign: 'left'
  }
})

export default styles
