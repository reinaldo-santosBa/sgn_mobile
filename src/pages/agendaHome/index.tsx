import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/container'
import { FlatList } from 'react-native-gesture-handler'
import { ActivityIndicator, BackHandler, Modal } from 'react-native'
import { AuthContext } from '../../contexts/contextApi'
import CardAgenda from '../../components/cards/cardAgenda'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import axios from 'axios'
import ModalAlert from '../../components/modais/modalAlert'

const AgendaHome: React.FC = () => {
  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ComprasHome'
  >;

  const navigation = useNavigation<FullNavigationProp>()
  const { refreshToken, url, version } = useContext(AuthContext)
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)
  const [att] = useState(true)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/agenda`,
          { headers: { Authorization: `Bearer ${acessToken}` } }
        )
          .then((json) => {
            setResponse(json.data)
            setLoading(true)
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
  }, [att])

  const backAction = () => {
    navigation.navigate('Home')
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <Container>
      {loading === false ? <ActivityIndicator/> : ''}

      <FlatList
        style={{ width: '100%' }}
        renderItem={(item) => {
          return (
            <CardAgenda
              TELEFONE={item.item.TELEFONE}
              EMAIL={item.item.EMAIL}
              NOME={item.item.NOME}
              ENDERECO={item.item.ENDERECO}
              CIDADE={item.item.CIDADE}
              UF={item.item.UF}
            />
          )
        }}
        data={response}
      />
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
    </Container>
  )
}

export default AgendaHome
