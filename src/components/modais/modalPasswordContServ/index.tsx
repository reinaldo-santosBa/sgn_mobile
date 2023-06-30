import React, { useState, useContext } from 'react'
import * as C from './styles'
import Input from '../../input/textInput'
import { api } from '../../../services/axios'
import { AuthContext } from '../../../contexts/contextApi'
import { Modal } from 'react-native'
import ModalAlert from '../modalAlert'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import { useNavigation } from '@react-navigation/native'

interface props {
  func: () => void;
}
const ModalPasswordContratoServico: React.FC<props> = ({ func }) => {
  const { refreshToken, arrayContratoServico, setArrayContratoServico, setAttResponse, attResponse } = useContext(AuthContext)
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(false)
  const [message, setMessage] = useState([])
  const [modal, setModal] = useState(false)
  const navigation = useNavigation<FullNavigationProp>()
  const [modalAlert, setModalAlert] = useState(false)
  const request = () => {
    if (password === '') {
      setErr(true)
      setMessage(['Por favor digite sua senha'])
      setModal(!modal)
      return
    }
    api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        const config = {
          headers: { Authorization: `Bearer ${acessToken}` }
        }

        const bodyParameters = {
          password,
          arrayCocs: arrayContratoServico
        }

        api.patch(
          'contratoServico',
          bodyParameters,
          config
        ).then((json) => {
          // func()
          setArrayContratoServico([])
          setAttResponse(!attResponse)
          setMessage(json.data.message)
          setErr(false)
          setModal(!modal)
        })
          .catch(
            (error) => {
              if (error.response) {
                setArrayContratoServico([])
                setMessage(error.response.data.message)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServico([])
                setMessage(error.request.data.message)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayContratoServico([])
                setMessage(error.data.message)
                setErr(true)
                setModal(!modal)
              }
              setArrayContratoServico([])
            }

          )
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
              navigation.navigate('ServiceContract')
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

export default ModalPasswordContratoServico
