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
import InputSchedule from '../../components/input/textInputSchedule'

const AgendaHome: React.FC = () => {
  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ComprasHome'
  >;

  const navigation = useNavigation<FullNavigationProp>()
  const { refreshToken, url, version } = useContext(AuthContext)
  const [response, setResponse] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [att] = useState(true)
  const [modal, setModal] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  useEffect(() => {
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/agenda`,
          { headers: { Authorization: `Bearer ${acessToken}` } }
        )
          .then((json) => {
            setResponse(json.data)
            setList(json.data)
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

  useEffect(() => {
    if (textSearch !== '') {
      setList(
        response.filter(item => {
          const nome = item.NOME.toLowerCase()
          if (nome.indexOf(textSearch.toLowerCase()) > -1) {
            return true
          }
          return false
        })
      )
    } else {
      setList(response)
    }
  }, [textSearch])

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
      <InputSchedule
        placeHolder={'Digite o nome'}
        setInput={setTextSearch}
        input={textSearch}
        placeHolderColor={'#e1e1e1'}
        name={'user'}
        secureTextEntry={false}
      />
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
        data={list}
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
