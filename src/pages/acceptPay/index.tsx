import { ActivityIndicator, FlatList, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MenuConainer from '../../components/menu/menuContainerPagar'
import Container from '../../components/container'
import { AuthContext } from '../../contexts/contextApi'
import { api } from '../../services/axios'
import TextWithoutData from '../../components/input/textWithoutData'
import BtnFilter from '../../components/buttons/btnFilter'
import BtnEmMassa from '../../components/buttons/btnPedidoMassa'
import CardPay from '../../components/cards/cardPay'
import ModalPasswordPay from '../../components/modais/modalPasswordPay'
import ModalAlert from '../../components/modais/modalAlert'
import { useNavigation } from '@react-navigation/native'
import { FullNavigationProp } from '../comprasHome'

const AcceptPay: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])
  const {
    refreshToken,
    attResponse,
    bgState,
    setBgState,
    arrayPagar,
    setArrayPagar
  } = useContext(AuthContext)
  const [modal, setModal] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const [modalPassword, setModalPassword] = useState(false)
  const [err, setErr] = useState(false)
  const [message, setMessage] = useState([])
  const navigation = useNavigation<FullNavigationProp>()

  useEffect(() => {
    setLoading(false)
    api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        console.log('====================================')
        console.log(1)
        console.log('====================================')
        const acessToken = json.data.acessToken
        api.get('pagar', { headers: { Authorization: `Bearer ${acessToken}` } })
          .then((json) => {
            console.log('====================================')
            console.log(json.data)
            console.log('====================================')
            setResponse(json.data)
            setLoading(true)
          })
          .catch((error) => {
            if (error.response) {
              setArrayPagar([])
              setMessage([error.response.data.message])
              setErr(true)
              setModal(!modal)
            } else if (error.request) {
              setArrayPagar([])
              setMessage([error.request.data.message])
              setErr(true)
              setModal(!modal)
            } else {
              setArrayPagar([])
              setMessage([error.data.message])
              setErr(true)
              setModal(!modal)
            }
          })
      })
      .catch((e) => {
        console.log('====================================')
        console.log(e)
        console.log('====================================')
        setLoading(true)
        setModalAlert(!modalAlert)
      })
  }, [attResponse])

  return (
    <MenuConainer>
      <Container>
        {loading === false ? <ActivityIndicator /> : ''}

        {arrayPagar.length
          ? <BtnEmMassa
            func={() => {
              setModalPassword(!modalPassword)
            }}
          />
          : ''
        }
        <BtnFilter

          func={() => {
            setModal(!modal)
          }}

        />
        {
          response.length > 0 && loading === true
            ? <FlatList
              style={{ width: '100%' }}
              renderItem={(item) => {
                return (
                  <CardPay
                    datas={item}
                    loadingFunc={() => {
                      setLoading(!loading)
                    }}
                    responseFunc={() => {
                      setResponse([])
                    }}
                  />
                )
              }}
              data={response}
            />
            : ''
        }

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
              } else {
                navigation.navigate('AcceptPay')
              }
            }}
            error={err}
          />
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalPassword}
          onRequestClose={() => {
            setModalPassword(!modalPassword)
          }}
        >
          <ModalPasswordPay
            func={function (): void {
              setModalPassword(!modalPassword)
              setBgState(!bgState)
              setArrayPagar([])
            }}
          />
        </Modal>
        {
          response.length === 0 && loading === true
            ? <TextWithoutData />
            : ''
        }
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
    </MenuConainer>
  )
}

export default AcceptPay
