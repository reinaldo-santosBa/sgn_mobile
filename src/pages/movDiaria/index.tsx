import { FlatList, ActivityIndicator, BackHandler, Modal } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/contextApi'
import CardMovimentacao from '../../components/cards/cardMovimentacao'
import axios from 'axios'
import MenuConainerGerencial from '../../components/menu/menuContainerGerencial'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/container'
import TextWithoutData from '../../components/input/textWithoutData'
import ModalAlert from '../../components/modais/modalAlert'

export type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MovDiaria'
  >;

const MovDiaria: React.FC = () => {
  const { refreshToken, url, version } = useContext(AuthContext)
  const [response, setResponse] = useState([])
  const [dados] = useState([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)

  const navigation = useNavigation<FullNavigationProp>()

  const backAction = () => {
    navigation.navigate('Gerencial')
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  useEffect(() => {
    setLoading(true)
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/dailyMoviment`, { headers: { Authorization: `Bearer ${acessToken}` } })
          .then((json) => {
            console.log('====================================')
            console.log(json)
            console.log('====================================')
            setResponse(json.data)
            setLoading(false)
          })
          .catch(
            (error) => {
              setLoading(false)
              if (error.response) {
                alert(error.response.data)
              } else if (error.request) {
                alert(error.request.data)
              } else {
                alert(error)
              }
            }
          )
      })
      .catch(
        () => {
          setLoading(false)
          setModal(!modal)
        }
      )
  }, [dados])

  return (
    <MenuConainerGerencial>
      <Container>

        {loading === true ? <ActivityIndicator /> : ''}
        {
          response.length > 0 || loading === true
            ? <FlatList
              style={{ backgroundColor: '#FFF', minHeight: '100%', width: '100%' }}
              renderItem={(item) => {
                return <CardMovimentacao datas={item} />
              }}
              data={response}
            />
            : <TextWithoutData/>
        }
      </Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <ModalAlert
          message={['Sessão encerrada']}
          func={async () => {
            setModal(!modal)
            navigation.navigate('Login')
          }}
          error={true}
        />
      </Modal>
    </MenuConainerGerencial>
  )
}

export default MovDiaria
