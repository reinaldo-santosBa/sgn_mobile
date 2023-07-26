import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, BackHandler, Modal } from 'react-native'
import Button from '../../components/buttons/button'
import Container from '../../components/container'
import ImageLogo from '../../components/imageLogo'
import Input from '../../components/input/textInput'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import ModalAlert from '../../components/modais/modalAlert'
import { AuthContext } from '../../contexts/contextApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>

const SignUp: React.FC<SignUpProps> = ({ navigation }: SignUpProps) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState([])
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('CNPJ', cnpj)
      await AsyncStorage.setItem('user', user)
    } catch (e) {
      alert('Error ' + e)
    }
  }
  const {
    setUrl,
    setDataBase,
    version,
    linkSGN
  } = useContext(AuthContext)

  const update = () => {
    setLoading(true)
    if (user === '' || password === '' || cnpj === '') {
      setErr(true)
      setMessage(['Preencha todos os campos'])
      setModal(!modal)
      setLoading(false)
      return
    }

    axios({
      method: 'get',
      url: `${linkSGN}/${version}/dataConnection/${cnpj}`
    })
      .then((resp) => {
        setUrl(resp.data.message.DACO_URL)
        setDataBase(resp.data.message.DACO_DATABASE)
        axios.patch(`${resp.data.message.DACO_URL}${version}/usuario`,
          {

            USUA_SIGLA: user,
            USUA_SENHA_APP: password,
            DATABASE: resp.data.message.DACO_DATABASE
          }
        )
          .then(
            () => {
              storeData()
              setLoading(false)
              setErr(false)
              setMessage(['Senha trocada com sucesso'])
              setModal(!modal)
            }

          )
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
              setMessage(error.data.mesage)
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
          setMessage(error.data.mesage)
          setModal(!modal)
        }
      })
  }

  const backAction = () => {
    navigation.navigate('Login')
    return true
  }

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

  useEffect(() => {
    getData()
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

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

      <Button

        functionOnpress={() => {
          update()
        }}
       textButton={'Trocar senha'}

      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <ModalAlert
          message={message}
          func={() => {
            if (!err) {
              navigation.navigate('Login')
            }
            setModal(!modal)
          }}
          error={err}
        />
      </Modal>

    </Container>

  )
}

export default SignUp
