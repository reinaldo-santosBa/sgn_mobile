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
  func: () => void;
}
const ModalPasswordContratoServicoBulletin: React.FC<props> = ({ func }) => {
  const {
    refreshToken,
    setAttResponse,
    attResponse,
    setArrayContratoServicoBulletin,
    arrayContratoServicoBulletin,
    version,
    url
  } = useContext(AuthContext)
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
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        const config = {
          headers: { Authorization: `Bearer ${acessToken}` }
        }

        const bodyParameters = {
          password,
          arrayBoletimC: arrayContratoServicoBulletin
        }

        axios.patch(
          `${url}${version}/boletimServico`,
          bodyParameters,
          config
        ).then((json) => {
          // func()
          setArrayContratoServicoBulletin([])
          setAttResponse(!attResponse)
          setMessage(json.data.message)
          setErr(false)
          setModal(!modal)
        })
          .catch(
            (error) => {
              console.log('====================================')
              console.log(error.response)
              console.log('====================================')
              if (error.response) {
                setArrayContratoServicoBulletin([])
                setMessage(error.response.data.message)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServicoBulletin([])
                setMessage(error.request.data.message)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayContratoServicoBulletin([])
                setMessage(error.data.message)
                setErr(true)
                setModal(!modal)
              }
              setArrayContratoServicoBulletin([])
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
              navigation.navigate('ServiceContractBulletin')
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

export default ModalPasswordContratoServicoBulletin
