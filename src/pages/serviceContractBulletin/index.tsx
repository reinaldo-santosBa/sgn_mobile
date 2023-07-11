import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/container'
import { FlatList } from 'react-native-gesture-handler'
import { api } from '../../services/axios'
import { AuthContext } from '../../contexts/contextApi'
import { ActivityIndicator, Modal } from 'react-native'
import BtnEmMassa from '../../components/buttons/btnPedidoMassa'
import BtnFilter from '../../components/buttons/btnFilter'
import ModalAlert from '../../components/modais/modalAlert'
import { CardServiceContractBulletin } from '../../components/cards/cardServiceContractBulletin'
import MenuContainer from '../../components/menu/menuContainerCompras'
import TextWithoutData from '../../components/input/textWithoutData'
import { FullNavigationProp } from '../comprasHome'
import { useNavigation } from '@react-navigation/native'
import ModalPasswordContratoServicoBulletin from '../../components/modais/modalPasswordContServBulletin'
import ModalFilter from '../../components/modais/modalFilter'
import ModalSelectSupplier from '../../components/modais/modalSupplier'
import BtnAdd from '../../components/buttons/btnAdd'

const ServiceContractBulletin: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])
  const {
    refreshToken,
    attResponse,
    arrayContratoServicoBulletin,
    setArrayContratoServicoBulletin,
    setBgState,
    bgState
  } = useContext(AuthContext)
  const [modalPassword, setModalPassword] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const [err, setErr] = useState(false)
  const [message, setMessage] = useState([])
  const navigation = useNavigation<FullNavigationProp>()
  const [supplierDesc, setSupplierDesc] = useState('Escolha um fornecedor')
  const [modalSupplier, setModalSupplier] = useState(false)
  const [supplierCod, setSupplierCod] = useState('')
  const [inputCod, setInputCod] = useState('')
  const [inputNum, setInputNum] = useState('')
  const [modalFilter, setModalFilter] = useState(false)

  useEffect(() => {
    setLoading(false)
    api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        api.get('boletimServico', { headers: { Authorization: `Bearer ${acessToken}` } })
          .then((json) => {
            setResponse(json.data)

            setLoading(true)
          })
          .catch((error) => {
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
              setMessage(error.data)
              setErr(true)
              setModal(!modal)
            }
          })
      })
      .catch(() => {
        setLoading(false)
        setModalAlert(!modalAlert)
      })
  }, [attResponse])

  const search = () => {
    setLoading(false)
    if (inputCod !== '') {
      setLoading(false)
      api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          api.get(`boletimServico/contrato/${inputCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              console.log('====================================')
              console.log(json.data)
              console.log('====================================')
              setResponse(json.data)
            })
            .catch((error) => {
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
                setMessage(error.data)
                setErr(true)
                setModal(!modal)
              }
            })
        })
        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else if (inputNum !== '') {
      setLoading(false)
      api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          api.get(`boletimServico/numero/${inputNum}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
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
                setMessage(error.data)
                setErr(true)
                setModal(!modal)
              }
            })
        })
        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else if (supplierCod !== '') {
      setLoading(false)
      api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          api.get(`boletimServico/fornecedor/${supplierCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
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
                setMessage(error.data)
                setErr(true)
                setModal(!modal)
              }
            })
        })
        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else {
      api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          api.get('boletimServico', { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
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
                setMessage(error.data)
                setErr(true)
                setModal(!modal)
              }
            })
        })
        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    }
    setLoading(true)
  }

  return (
    <MenuContainer>
      <Container>

        {loading === false ? <ActivityIndicator /> : ''}

        {arrayContratoServicoBulletin.length > 0 && loading === true
          ? <BtnEmMassa
            func={() => {
              setModalPassword(!modalPassword)
            }}
          />
          : ''
        }
        <BtnAdd
          func={() => {
            navigation.navigate('BulletinCreate')
          }}
        />
        <BtnFilter
          func={() => {
            setModalFilter(!modalFilter)
          }}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalFilter}
          onRequestClose={() => {
            setModalFilter(!modalFilter)
          }}
        >
          <ModalFilter
            type={'boletim'}
            funcSearch={() => {
              search()
              setInputCod('')
              setInputNum('')
              setSupplierCod('')
              setSupplierDesc('Escolha um fornecedor')
              setModalFilter(!modalFilter)
            }}

            func={() => {
              setModalFilter(!modalFilter)
            }}

            inputCod={inputCod}
            setInputCod={setInputCod}

            supplierDesc={supplierDesc}
            setModalSupplier={setModalSupplier}
            modalSupplier={modalSupplier}

            inputNum={inputNum}
            setInputNum={setInputNum}

          />
        </Modal>
        {
          response.length > 0
            ? <FlatList
              style={{ width: '100%' }}
              renderItem={(item) => {
                return (
                  <CardServiceContractBulletin
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
            : <TextWithoutData />
        }

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalPassword}
          onRequestClose={() => {
            setModalPassword(!modalPassword)
          }}
        >
          <ModalPasswordContratoServicoBulletin
            func={function (): void {
              setModalPassword(!modalPassword)
              setBgState(!bgState)
              setArrayContratoServicoBulletin([])
            }}
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
              setModal(!modal)
            }}
            error={err}
          />
        </Modal>
      </Container>
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
    </MenuContainer>
  )
}

export default ServiceContractBulletin
