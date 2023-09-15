import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState, useContext, useEffect } from 'react'
import Button from '../../components/buttons/button'
import ButtonOnly from '../../components/buttons/buttonOnly'
import Container from '../../components/container'
import ImageLogo from '../../components/imageLogo'
import Input from '../../components/input/textInput'
import { AuthContext } from '../../contexts/contextApi'
import { ActivityIndicator, Alert, BackHandler, Modal, Platform, Linking } from 'react-native'
import axios from 'axios'
import ModalAlert from '../../components/modais/modalAlert'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'
import * as Notifications from 'expo-notifications'
import { CheckBox } from '../../components/checkBoxTerm'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login: React.FC<LoginProps> = ({ navigation }: LoginProps) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [cnpj, setCnpj] = useState('')
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState([])
  const [err, setErr] = useState(false)
  const [att, setAtt] = useState('')
  const [linkAtt, setLinkAtt] = useState('')
  const [termoAceito, setTermAceito] = useState(false)
  const [nameIcon, setNameIcon] = useState(false)

  const log = 0
  const {
    setRefreshToken,
    setUrl,
    setDataBase,
    version,
    versionApp,
    linkSGN,
    refreshToken,
    setCNPJ
  } = useContext(AuthContext)
  const storeData = async (cnpj:string, user:string, password: string) => {
    try {
      await AsyncStorage.setItem('CNPJ', cnpj)
      await AsyncStorage.setItem('user', user)
      await AsyncStorage.setItem('password', password)
      await AsyncStorage.setItem('termAccept', 'true')
    } catch (e) {
      alert('Error ' + e)
    }
  }
  const login = async (usuaSenha, cnpjLogin, usuaSigla, termAceito) => {
    setLoading(true)
    if (!termAceito) {
      if (!nameIcon) {
        setErr(true)
        setMessage(['Aceito o termo'])
        setModal(!modal)
        setLoading(false)
        return
      }
    }
    if (usuaSigla === '' || usuaSenha === '' || cnpjLogin === '') {
      setErr(true)
      setMessage(['Preencha todos os campos'])
      setModal(!modal)
      setLoading(false)
      return
    }

    axios({
      method: 'get',
      url: `${linkSGN}/${version}/dataConnection/${cnpjLogin}`
    })
      .then((resp) => {
        setUrl(resp.data.message.DACO_URL)
        setDataBase(resp.data.message.DACO_DATABASE)
        setCNPJ(cnpj)
        axios.post(`${resp.data.message.DACO_URL}${version}/usuario/login`,
          {

            USUA_SIGLA: usuaSigla,
            USUA_SENHA_APP: usuaSenha,
            DATABASE: resp.data.message.DACO_DATABASE,
            CNPJ: cnpjLogin
          }
        )
          .then(
            (response) => {
              storeData(cnpjLogin, usuaSigla, usuaSenha)
              setLoading(false)
              setRefreshToken(response.data.refreshToken)
              setPassword('')
              navigation.navigate('Home')
            }

          )
          .catch((error) => {
            setPassword('')
            setLoading(false)
            if (error.response) {
              setErr(true)
              setMessage([error.response.data.message])
              setModal(!modal)
            } else if (error.request) {
              setErr(true)
              setMessage([error.request.data.mesage])
              setModal(!modal)
            } else {
              setErr(true)
              setMessage([error.data.mesage])
              setModal(!modal)
            }
          })
      })
      .catch((error) => {
        setLoading(false)
        if (error.response) {
          setErr(true)
          setMessage([error.response.data.message])
          setModal(!modal)
        } else if (error.request) {
          setErr(true)
          setMessage([error.request.data.mesage])
          setModal(!modal)
        } else {
          setErr(true)
          setMessage([error.data.mesage])
          setModal(!modal)
        }
      })
  }

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
          BackHandler.exitApp()
        }
      }
    ])
    return true
  }

  const termVerification = async () => {
    const termAccept = await AsyncStorage.getItem('termAccept')
    if (termAccept === 'true') {
      setTermAceito(true)
    } else {
      setTermAceito(false)
    }
  }

  useEffect(() => {
    (
      async () => {
        await termVerification()
      }
    )()
  }, [])

  const getData = async () => {
    try {
      const valueCNPJ = await AsyncStorage.getItem('CNPJ')
      const valueUSER = await AsyncStorage.getItem('user')

      if (valueCNPJ !== null) {
        setCnpj(valueCNPJ)
      }
      if (valueUSER !== null) {
        setUser(valueUSER)
      }
    } catch (e) {
      alert('Error ' + e)
    }
  }

  const biometricLogin = async () => {
    if (refreshToken === '') {
      const compatible = await LocalAuthentication.hasHardwareAsync()

      const savedBiometrics = await LocalAuthentication.isEnrolledAsync()
      const termAccept = await AsyncStorage.getItem('termAccept')
      const termoAceite = (termAccept === 'true')
      const valuePassword = await AsyncStorage.getItem('password')
      const valueCNPJ = await AsyncStorage.getItem('CNPJ')
      const valueUSER = await AsyncStorage.getItem('user')

      if (valuePassword !== null && valueCNPJ !== null && valueUSER !== null) {
        if (compatible) {
          if (savedBiometrics) {
            const validAuth = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Login com biometria'
            })

            if (validAuth.success) {
              login(valuePassword, valueCNPJ, valueUSER, termoAceite)
            } else {
              try {
                await AsyncStorage.setItem('password', '')
              } catch (e) {
                alert('Error ' + e)
              }
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    getData()
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  useEffect(() => {
    const platform = Platform.OS

    axios({
      method: 'get',
      url: `${linkSGN}/${version}/atualizacao/${platform}/${versionApp}`
    })
      .then(async (resp) => {
        setLinkAtt(resp.data.link)
        setAtt(resp.data.message)
        if (resp.data.message === 'desatualizado') {
          setModal(!modal)
          setErr(true)
          setMessage(['Atualize seu aplicativo'])
        } else {
          biometricLogin()
        }
      })
      .catch((error) => {
        if (error.response) {
          setErr(true)
          setMessage([error.response.data])
          setModal(!modal)
        } else if (error.request) {
          setErr(true)
          setMessage([error.request.data.mesage])
          setModal(!modal)
        } else {
          setErr(true)
          setMessage([error.data.mesage])
          setModal(!modal)
        }
      })
  }, [log])

  return (

    <Container>
      {loading === true ? <ActivityIndicator /> : ''}

      <ImageLogo/>

      <Input

        input={user}
        placeHolder={'Digite seu usuario'}
        setInput={setUser}
        placeHolderColor={'#999999'}
        name="user"
        secureTextEntry={false}

      />

      <Input

        input={password}
        placeHolder={'Digite sua senha'}
        setInput={setPassword}
        placeHolderColor={'#999999'}
        name="lock"
        secureTextEntry={true}

      />

      <Input

        input={cnpj}
        placeHolder={'Digite o cnpj da empresa'}
        setInput={setCnpj}
        placeHolderColor={'#999999'}
        name="building"
        secureTextEntry={false}

      />

      {
        !termoAceito
          ? <CheckBox
              nameIcon={nameIcon}
              setNameIcon={setNameIcon}
            />
          : <></>
      }

      <Button

        functionOnpress={() => {
          login(password, cnpj, user, termoAceito)
        }}
       textButton={'LOGIN'}

      />

      <ButtonOnly

        text={' Esqueceu a senha? clique aqui '}

        func={
          () => {
            navigation.navigate('SignUp')
          }
        }

      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <ModalAlert
          message={message}
          func={async () => {
            setModal(!modal)
            if (att === 'desatualizado') {
              await Linking.openURL(linkAtt)
            }
          }}
          error={err}
        />
      </Modal>

    </Container>

  )
}

export default Login
