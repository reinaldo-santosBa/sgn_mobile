import React, { useState, useContext } from 'react'
import * as C from './styles'
import Input from '../../input/textInput'
import { AuthContext } from '../../../contexts/contextApi'
import { useNavigation } from '@react-navigation/native'
import ModalAlert from '../modalAlert/index'
import { Modal } from 'react-native'
import axios from 'axios'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routes/fullScreen.routes'

interface props{
  func:()=>void
}

type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Pedidos'
>;

const ModalPasswordWorksheet: React.FC<props> = ({ func }) => {
  const { refreshToken, url, version, setAtt, att, arrayPurchaseWorksheet, setArrayPurchaseWorksheet } = useContext(AuthContext)
  const navigation = useNavigation<FullNavigationProp>()
  const [password, setPassword] = useState('')
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState([])
  const [err, setErr] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const request = () => {
    if (password === '') {
      setErr(true)
      setMessage(['Por favor digite sua senha'])
      setModal(!modal)
      return
    }
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        const config = {
          headers: { Authorization: `Bearer ${acessToken}` }
        }

        const bodyParameters = {
          password,
          pos: arrayPurchaseWorksheet[0].posAss,
          placCod: arrayPurchaseWorksheet[0].codigo
        }

        axios.patch(
          `${url}${version}/planilhaDeCompra`,
          bodyParameters,
          config
        ).then((json) => {
          setMessage([json.data])
          console.log(json.data)
          setErr(false)
          setModal(!modal)
          setAtt(!att)
          setArrayPurchaseWorksheet([])
        })
          .catch((error) => {
            if (error.response) {
              setErr(true)
              console.log(error.response.data)
              setMessage([error.response.data])
              setModal(!modal)
            } else if (error.request) {
              setErr(true)
              setMessage([error.request.data.message])
              setModal(!modal)
            } else {
              setErr(true)
              setMessage([error.data.message])
              setModal(!modal)
            }
          })
      })
      .catch(() => {
        setModalAlert(!modalAlert)
      })
  }

  return (
    <C.bg>

      <C.BtnExit
        onPress={
          () => {
            func()
          }
        }
      >

        <C.IconF

        />

      </C.BtnExit>

      <C.areaInput>

        <Input
          input={password}
          placeHolder={'Digite sua senha'}
          setInput={setPassword}
          placeHolderColor={'#999999'}
          name="lock"
          secureTextEntry={true}
        />

        <C.BtnArea
          onPress={() => {
            request()
          }}
        >

          <C.BtnText>
            APROVAR
          </C.BtnText>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
          >
            <ModalAlert
              message={message}
              func={() => {
                if (err === true) {
                  setModal(!modal)
                  func()
                } else {
                  func()
                  navigation.navigate('PurchaseWorksheet')
                }
              }}
              error={err}
            />
          </Modal>
        </C.BtnArea>

      </C.areaInput>
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
    </C.bg>
  )
}

export default ModalPasswordWorksheet
