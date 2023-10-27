import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/container'
import { AuthContext } from '../../contexts/contextApi'
import { ActivityIndicator, FlatList, Modal } from 'react-native'
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
// import BtnAdd from '../../components/buttons/btnAdd'
// import BtnListApproval from '../../components/buttons/btnListApproval'
import axios from 'axios'
import ModalSelectCrFilter from '../../components/modais/modalCRSelect'

const ServiceContractBulletin: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])
  const {
    refreshToken,
    attResponse,
    arrayContratoServicoBulletin,
    setArrayContratoServicoBulletin,
    setBgState,
    bgState,
    url,
    version
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
  const [crDesc, setCrDesc] = useState('Escolha um Cr')
  const [modalCr, setModalCr] = useState(false)
  const [crCod, setCrCod] = useState('')

  // const approvalList = () => {
  //   axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
  //     .then((json) => {
  //       const acessToken = json.data.acessToken
  //       axios.get(`${url}${version}/boletimServico/approveded`, { headers: { Authorization: `Bearer ${acessToken}` } })
  //         .then((json) => {
  //           setResponse(json.data)
  //           setLoading(true)
  //         })
  //         .catch((error) => {
  //           if (error.response) {
  //             setArrayContratoServicoBulletin([])
  //             setMessage([error.response.data])
  //             setErr(true)
  //             setModal(!modal)
  //           } else if (error.request) {
  //             setArrayContratoServicoBulletin([])
  //             setMessage(error.request.data)
  //             setErr(true)
  //             setModal(!modal)
  //           } else {
  //             setArrayContratoServicoBulletin([])
  //             setMessage(error.data)
  //             setErr(true)
  //             setModal(!modal)
  //           }
  //         })
  //     })
  //     .catch(() => {
  //       setLoading(true)
  //       setModalAlert(!modalAlert)
  //     })
  // }

  useEffect(() => {
    setLoading(false)
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/boletimServico`, { headers: { Authorization: `Bearer ${acessToken}` } })
          .then((json) => {
            setResponse(json.data)
            setLoading(true)
          })
          .catch((error) => {
            if (error.response) {
              setArrayContratoServicoBulletin([])
              setMessage([error.response.data])
              setErr(true)
              setModal(!modal)
            } else if (error.request) {
              setArrayContratoServicoBulletin([])
              setMessage(error.request.data)
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
        setLoading(true)
        setModalAlert(!modalAlert)
      })
  }, [attResponse])

  const search = () => {
    setLoading(false)
    if (inputCod !== '') {
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/boletimServico/contrato/${inputCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServicoBulletin([])
                setMessage([error.response.data])
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServicoBulletin([])
                setMessage(error.request.data)
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
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/boletimServico/numero/${inputNum}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServicoBulletin([])
                setMessage([error.response.data])
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServicoBulletin([])
                setMessage(error.request.data)
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
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/boletimServico/fornecedor/${supplierCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServicoBulletin([])
                setMessage([error.response.data])
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServicoBulletin([])
                setMessage(error.request.data)
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
          setModalAlert(!modalAlert)
        })
    } else if (crCod !== '') {
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/boletimServico/cr/${crCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServicoBulletin([])
                setMessage([error.response.data])
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServicoBulletin([])
                setMessage(error.request.data)
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
          setModalAlert(!modalAlert)
        })
    } else {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/boletimServico`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServicoBulletin([])
                setMessage([error.response.data])
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServicoBulletin([])
                setMessage(error.request.data)
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
          setModalAlert(!modalAlert)
        })
    }
    setLoading(true)
    setCrCod('')
    setCrDesc('Escolha um CR')
    setSupplierDesc('Escolha um fornecedor')
    setSupplierCod('')
    setInputNum('')
    setInputCod('')
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
        {/* <BtnAdd
          func={() => {
            navigation.navigate('BulletinCreate')
          }}
        />
        <BtnListApproval
          func={approvalList}
        /> */}

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

            crDesc={crDesc}
            setModalCr={setModalCr}
            modalCr={modalCr}
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
          visible={modalCr}
        >
          <ModalSelectCrFilter
            onChange={setCrCod}
            value={crCod}
            modalChange={
              () => {
                setModalCr(!modalCr)
              }
            }
            setCereDesc={setCrDesc}
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
