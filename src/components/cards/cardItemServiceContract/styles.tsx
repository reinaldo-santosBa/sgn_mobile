import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 3,
    borderRadius: 10,
    padding: 10,
    borderColor: '#3474A4',
    borderWidth: 1,
    backgroundColor: '#FFFFFF'
  },
  cardTopTextArea: {
    maxWidth: '100%',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#3474A4',
    paddingBottom: 10
  },
  title: {
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 18
  },
  cardTextArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10
  },
  cardTextAreaInternalRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    marginTop: 10
  },
  cardTextAreaInternalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: 10
  },
  cardTextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    textAlign: 'left',
    color: '#000'
  },
  cardTextBody: {
    fontSize: 16,
    maxWidth: '80%',
    textAlign: 'left'
  }
})

export default styles
