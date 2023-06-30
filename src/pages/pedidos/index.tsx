import { ActivityIndicator, FlatList, Modal } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/contextApi'
import Container from '../../components/container'
import CardPedido from '../../components/cards/cardPedido'
import BtnFilter from '../../components/buttons/btnFilter'
import ModalFilter from '../../components/modais/modalFilter'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ModalPasswordLargScale from '../../components/modais/modalPasswordLargScale'
import BtnEmMassa from '../../components/buttons/btnPedidoMassa'
import axios from 'axios'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { useNavigation } from '@react-navigation/native'
import MenuConainer from '../../components/menu/menuContainerCompras'
import ModalAlert from '../../components/modais/modalAlert'
import TextWithoutData from '../../components/input/textWithoutData'
import ModalSelectEmployee from '../../components/modais/modalEmployee'
import ModalSelectSupplier from '../../components/modais/modalSupplier'

type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Pedidos'
>;
const Pedidos: React.FC<FullNavigationProp> = () => {
  const navigation = useNavigation<FullNavigationProp>()
  const { refreshToken, bgState, setBgState, arrayPedido, setArrayPedido, url, version, att } = useContext(AuthContext)
  const [response, setResponse] = useState([])
  const [modal, setModal] = useState(false)
  const [inputNum, setInputNum] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalPassword, setModalPassword] = useState(false)
  const [modalFilter, setModalFilter] = useState(false)
  const [message, setMessage] = useState([])
  const [err, setErr] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const [supplierDesc, setSupplierDesc] = useState('Escolha o fornecedor')
  const [employeeDesc, setEmployeeDesc] = useState('Escolha o funcionario')
  const [modalEmployee, setModalEmployee] = useState(false)
  const [employeeCod, setEmployeeCod] = useState('')
  const [modalSupplier, setModalSupplier] = useState(false)
  const [supplierCod, setSupplierCod] = useState('')

  const search = () => {
    setLoading(false)
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        if (inputNum !== '') {
          axios.get(`${url}${version}/pedido/numero/${inputNum}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
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
        } else if (supplierDesc !== 'Escolha o fornecedor') {
          axios.get(`${url}${version}/pedido/forn/${supplierDesc}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
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
        } else if (employeeDesc !== 'Escolha o funcionario') {
          axios.get(`${url}${version}/pedido/func/${employeeDesc}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
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
        } else {
          axios.get(`${url}${version}/pedido`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
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
        setLoading(true)
        setModalFilter(!modalFilter)
        setInputNum('')
        setEmployeeDesc('Escolha um funcionario')
        setSupplierDesc('Escolha um fornecedor')
      })
      .catch(() => {
        setLoading(false)
        setModalAlert(!modalAlert)
      })
  }

  useEffect(() => {
    const headerAcessToken = {
      headers: { Authorization: `Bearer ${refreshToken}` }
    }
    axios.get(`${url}${version}/usuario/acessToken`,
      headerAcessToken
    )
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/pedido`,
          {
            headers: {
              Authorization: `Bearer ${acessToken}`
            }
          })
          .then((json) => {
            setResponse(json.data)
            setLoading(true)
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
      })
      .catch(() => {
        setLoading(false)
        setModalAlert(!modalAlert)
      })
  }, [att])

  return (
    <MenuConainer>

      <Container>
        {loading === false ? <ActivityIndicator /> : ''}
        <BtnFilter

          func={() => {
            setModalFilter(!modalFilter)
          }}

        />
        {arrayPedido.length > 0
          ? <BtnEmMassa
            func={() => {
              setModalPassword(!modalPassword)
            }}
          />
          : ''
        }
        {
          response.length > 0 || loading === false
            ? <FlatList

              style={{ width: '100%' }}
              renderItem={(item) => {
                return (
                  <CardPedido
                    datas={item}
                    responseFunc={() => {
                      setResponse([])
                    }}
                  />
                )
              }}
              data={response}
            />
            : <TextWithoutData/>
        }
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalFilter}
          onRequestClose={() => {
            setModalFilter(!modalFilter)
          }}
        >
          <ModalFilter
            type={'pedido'}
            funcSearch={() => {
              search()
            }}

            func={() => {
              return setModalFilter(!modalFilter)
            }}

            inputNum={inputNum}
            setModalEmployee={setModalEmployee}
            modalEmployee={modalEmployee}
            setInputNum={setInputNum}
            employeeDesc={employeeDesc}
            supplierDesc={supplierDesc}
            setModalSupplier={setModalSupplier}
            modalSupplier={modalSupplier}
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
          <ModalPasswordLargScale
            func={() => {
              setModalPassword(!modalPassword)
              setArrayPedido([])
              setBgState(!bgState)
              navigation.navigate('Pedidos')
            }}
            mudarCor={() => {
              setBgState(!bgState)
            }}
            refresh={() => {
              setResponse([])
            }}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalEmployee}
        >
          <ModalSelectEmployee
            onChange={setEmployeeCod}
            value={employeeCod}
            modalChange={
              () => {
                setModalEmployee(!modalEmployee)
              }
            }
            setEmployee={setEmployeeDesc}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSupplier}
        >
          <ModalSelectSupplier
            onChange={setSupplierCod}
            value={supplierCod}
            modalChange={
              () => {
                setModalSupplier(!modalSupplier)
              }
            }
            setSupplier={setSupplierDesc}
          />
        </Modal>
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
    </MenuConainer >
  )
}

export default Pedidos
