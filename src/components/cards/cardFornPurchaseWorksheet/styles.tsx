import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  card: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    elevation: 3,
    padding: 20,
    borderColor: '#3474A4',
    borderRadius: 8,
    borderWidth: 1
  },
  cardTextArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    maxWidth: '90%',
    marginTop: 10

  },
  cardTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    textAlign: 'left',
    color: '#000'
  },
  cardTextBody: {
    fontSize: 17,
    maxWidth: '80%',
    textAlign: 'left'
  },
  cardTopTextArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#3474A4',
    paddingBottom: 10

  },
  cardTopTextRight: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#000'
  },
  cardTopTextLeft: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000'
  },
  buttonAprovar: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    elevation: 3,
    padding: 20,
    backgroundColor: '#7BAC3B',
    aligItems: 'center',
    justifyContent: 'center'
  },
  textBtn: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#fff'
  }
})

export default styles
