import React, { useState, useContext } from 'react'
import * as C from './styles'
import Input from '../../input/textInput'
import { AuthContext } from '../../../contexts/contextApi'
import { Modal } from 'react-native'
import ModalAlert from '../modalAlert'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

interface props {
  func: () => void,
  mudarCor: () => void
  refresh: () => void
}

const ModalPasswordLargScale: React.FC<props> = ({ func, mudarCor, refresh }) => {
  const { refreshToken, arrayPedido, setArrayPedido, att, setAtt, url, version } = useContext(AuthContext)
  const [err, setErr] = useState(false)
  const [message, setMessage] = useState([])
  const [modal, setModal] = useState(false)
  const [password, setPassword] = useState('')
  const [modalAlert, setModalAlert] = useState(false)
  const navigation = useNavigation<FullNavigationProp>()

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
          USUA_SENHA_APP: password,
          arrayPedido
        }
        console.log(bodyParameters)

        axios.patch(
          `${url}${version}/pedido/largeScale`,
          bodyParameters,
          config
        ).then((json) => {
          console.log(bodyParameters)

          setArrayPedido([])
          setErr(false)
          setMessage(json.data.message)
          setAtt(!att)
          mudarCor()
          refresh()
          setModal(!modal)
        })
          .catch((error) => {
            if (error.response) {
              setErr(true)
              if (error.response.data.message[0].slice(0, 15) === 'Senha incorreta') {
                setMessage(error.response.data.message[0])
              } else {
                setMessage(error.response.data.message)
              }
              setModal(!modal)
              mudarCor()
              setArrayPedido([])
            } else if (error.request) {
              setErr(true)
              setMessage(error.request.data.message)
              setModal(!modal)
              mudarCor()
              setArrayPedido([])
            } else {
              setErr(true)
              setMessage(error.data.message)
              setModal(!modal)
              mudarCor()
              setArrayPedido([])
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

        </C.BtnArea>

      </C.areaInput>
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
            }
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
    </C.bg>
  )
}

export default ModalPasswordLargScale
