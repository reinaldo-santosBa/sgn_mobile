import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/container'
import FlatListImage from '../../components/flatListImage'
import ScrollViewMenu from '../../components/menu/ScrollViewMenu'
import { ActivityIndicator, Alert, BackHandler, Modal, View } from 'react-native'
import FlatButtonExitHome from '../../components/FlatButtonExit'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AuthContext } from '../../contexts/contextApi'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ModalAlert from '../../components/modais/modalAlert'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true
  })
})

const Home: React.FC = () => {
  const {
    version,
    url,
    refreshToken,
    cnpj
  } = useContext(AuthContext)
  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
  >;
  const [att] = useState(false)
  const [err, setErr] = useState(false)
  const [response, setResponse] = useState([])
  const [response2, setResponse2] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState([])
  const [modalAlert, setModalAlert] = useState(false)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const headerAcessToken = {
      headers: { Authorization: `Bearer ${refreshToken}` }
    }
    axios.get(`${url}${version}/usuario/acessToken`,
      headerAcessToken
    )
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/usuario/modulo/${cnpj}`,
          {
            headers: {
              Authorization: `Bearer ${acessToken}`
            }
          })
          .then((json) => {
            setResponse(json.data)
            console.log('1 ====================================')
            console.log(`${url}${version}/usuario/modulo/${cnpj}`)
            console.log(json.data)
            console.log('====================================')
            setLoading(true)
          })
          .catch((error) => {
            setLoading(true)
            if (error.response) {
              setErr(true)
              setMessage([error.response.data])
              setModal(!modal)
            } else if (error.request) {
              setErr(true)
              setMessage([error.request.data])
              setModal(!modal)
            } else {
              setErr(true)
              setMessage(error.data.mesage)
              setModal(!modal)
            }
          })
      })
      .catch(() => {
        setLoading(true)
        setModalAlert(!modalAlert)
      })

    axios.get(`${url}${version}/usuario/acessToken`,
      headerAcessToken
    )
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/usuario/modulo`,
          {
            headers: {
              Authorization: `Bearer ${acessToken}`
            }
          })
          .then((json) => {
            console.log('2 ====================================')
            console.log(`${url}${version}/usuario/modulo`)
            console.log(json.data)
            console.log('====================================')
            setResponse2(json.data)
            setLoading(true)
          })
          .catch((error) => {
            setLoading(true)
            if (error.response) {
              setErr(true)
              setMessage([error.response.data])
              setModal(!modal)
            } else if (error.request) {
              setErr(true)
              setMessage([error.request.data])
              setModal(!modal)
            } else {
              setErr(true)
              setMessage(error.data.mesage)
              setModal(!modal)
            }
          })
      })
      .catch(() => {
        setLoading(true)
        setModalAlert(!modalAlert)
      })
  }, [att])

  const navigation = useNavigation<FullNavigationProp>()
  useEffect(() => {
    (
      async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
          const tokenExpo = (await Notifications.getExpoPushTokenAsync()).data
          const user = await AsyncStorage.getItem('user')
          axios.patch(`${url}${version}/usuario/setTokenApp`, {
            USUA_SIGLA: user,
            USUA_APP_TOKEN: tokenExpo
          },
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          }
          )
            .then(() => {
              alert('Token salvo com sucesso!')
            })
            .catch((e) => {
              alert('Erro ao salvar o token' + e)
            })
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
        }
      }
    )()
  }, [])

  const backAction = () => {
    Alert.alert('Atenção!', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'SIM',
        onPress: () => {
          navigation.navigate('Login')
          BackHandler.exitApp()
        }
      }
    ])
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <Container>

      {loading === false
        ? <View style={{ width: '100%', height: '100%', display: 'flex', backgroundColor: '#00000077', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                  </View>
        : ''}

      <FlatButtonExitHome/>

      <FlatListImage
        response={response} response2={response2} />

      <ScrollViewMenu
        response={response}
        response2={response2}
      />

      <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
        >
          <ModalAlert
            message={message}
            func={() => {
              navigation.navigate('Login')
              setModal(!modal)
            }}
            error={err}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAlert}
        >
          <ModalAlert
            message={['Sessão encerrada']}
            func={async () => {
              setModalAlert(!modalAlert)
              navigation.navigate('Login')
            }}
            error={true}
          />
        </Modal>
    </Container>
  )
}

export default Home
