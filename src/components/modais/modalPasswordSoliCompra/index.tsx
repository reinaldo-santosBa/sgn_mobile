import React, { useState, useContext } from 'react'
import * as C from './styles'
import Input from '../../input/textInput'
import { AuthContext } from '../../../contexts/contextApi'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routes/fullScreen.routes'
import axios from 'axios'
import ModalAlert from '../modalAlert'
import { Modal } from 'react-native'

interface props {
  func: () => void;
  posAss: string;
  cod: string;
  valor: string;
}

type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetalheSolicitacao'
>;

const ModalPasswordSoliCompra: React.FC<props> = ({ func, posAss, cod, valor }) => {
  const { refreshToken, attResponse, setAttResponse, url, version } = useContext(AuthContext)
  const navigation = useNavigation<FullNavigationProp>()
  const [password, setPassword] = useState('')
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState([])
  const [err, setErr] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const request = () => {
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        const config = {
          headers: { Authorization: `Bearer ${acessToken}` }
        }

        const bodyParameters = {
          USUA_SENHA_APP: password,
          arraySolicitacaoCompra: [[
            cod,
            posAss,
            valor
          ]]
        }

        axios.patch(
          `${url}${version}/solicitacaoCompra`,
          bodyParameters,
          config
        )
          .then((json) => {
            setErr(false)
            setMessage([json.data.message])
            setModal(!modal)
          })
          .catch((error) => {
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
          func={async () => {
            if (err === false) {
              func()
              setAttResponse(!attResponse)
              navigation.navigate('SolicitacaoCompra')
            }
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
    </C.bg>
  )
}

export default ModalPasswordSoliCompra
