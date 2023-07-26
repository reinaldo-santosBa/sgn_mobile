import { ActivityIndicator, FlatList, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MenuConainer from '../../components/menu/menuContainerPagar'
import Container from '../../components/container'
import { AuthContext } from '../../contexts/contextApi'
import TextWithoutData from '../../components/input/textWithoutData'
import BtnFilter from '../../components/buttons/btnFilter'
import BtnEmMassa from '../../components/buttons/btnPedidoMassa'
import CardPay from '../../components/cards/cardPay'
import ModalPasswordPay from '../../components/modais/modalPasswordPay'
import ModalAlert from '../../components/modais/modalAlert'
import { useNavigation } from '@react-navigation/native'
import { FullNavigationProp } from '../comprasHome'
import ModalSelectSupplier from '../../components/modais/modalSupplier'
import ModalFilter from '../../components/modais/modalFilter'
import axios from 'axios'
import ModalSelectCrFilter from '../../components/modais/modalCRSelect'

const AcceptPay: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])
  const {
    refreshToken,
    attResponse,
    bgState,
    setBgState,
    arrayPagar,
    setArrayPagar,
    url,
    version
  } = useContext(AuthContext)
  const [modal, setModal] = useState(false)
  const [modalFilter, setModalFilter] = useState(false)

  const [modalAlert, setModalAlert] = useState(false)
  const [modalPassword, setModalPassword] = useState(false)
  const [err, setErr] = useState(false)
  const [message, setMessage] = useState([])
  const navigation = useNavigation<FullNavigationProp>()
  const [modalSupplier, setModalSupplier] = useState(false)
  const [supplierCod, setSupplierCod] = useState('')
  const [supplierDesc, setSupplierDesc] = useState('Escolha o fornecedor')
  const [modalCr, setModalCr] = useState(false)
  const [crCod, setCrCod] = useState('')
  const [crDesc, setCrDesc] = useState('Escolha o cr')
  const [numDoc, setNumDoc] = useState('')
  const [inputNum, setInputNum] = useState('')
  const [dtFormatadaRequestEnd, setDtFormatadaRequestEnd] = useState('')
  const [dtFormatadaEnd, setDtFormatadaEnd] = useState('Escolha uma data final')
  const [dtFormatadaRequestIni, setDtFormatadaRequestIni] = useState('')
  const [dtFormatadaIni, setDtFormatadaIni] = useState('Escolha uma data inicial')
  const resetFilter = () => {
    setLoading(true)
    setModalFilter(!modalFilter)
    setSupplierCod('')
    setSupplierDesc('Escolha o fornecedor')
    setInputNum('')
    setNumDoc('')
    setCrDesc('Escolha o cr')
    setCrCod('')
    setDtFormatadaRequestEnd('')
    setDtFormatadaEnd('Escolha uma data final')
    setDtFormatadaRequestIni('')
    setDtFormatadaIni('Escolha uma data')
  }
  useEffect(() => {
    setLoading(false)
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/pagar`, { headers: { Authorization: `Bearer ${acessToken}` } })
          .then((json) => {
            setResponse(json.data)
            setLoading(true)
          })
          .catch((error) => {
            setLoading(true)
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
      .catch(() => {
        setLoading(true)
        setLoading(true)
        setModalAlert(!modalAlert)
      })
  }, [attResponse])

  const search = () => {
    setLoading(false)
    if (supplierCod !== '') {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/pagar/fornecedor/` + supplierCod, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              console.log('====================================')
              console.log('certo')
              console.log('====================================')
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
        .catch(() => {
          setModalAlert(!modalAlert)
        })
    } else if (numDoc !== '') {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/pagar/numeroDoc/` + numDoc, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
              if (error.response) {
                setArrayPagar([])
                setMessage([error.response.data])
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayPagar([])
                setMessage([error.request.data])
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
        .catch(() => {
          setModalAlert(!modalAlert)
        })
    } else if (inputNum !== '') {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/pagar/numero/` + inputNum, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              console.log('====================================')
              console.log('certo')
              console.log('====================================')
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
        .catch(() => {
          setModalAlert(!modalAlert)
        })
    } else if (crCod !== '') {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/pagar/cr/` + crCod, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              console.log('====================================')
              console.log('certo')
              console.log('====================================')
            })
            .catch((error) => {
              if (error.response) {
                setArrayPagar([])
                setMessage([error.response.data])
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayPagar([])
                setMessage([error.request.data])
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
        .catch(() => {
          setModalAlert(!modalAlert)
        })
    } else if (dtFormatadaRequestEnd !== '' || dtFormatadaRequestIni !== '') {
      if (dtFormatadaRequestIni === '') {
        alert('preencha a data inicial')
      } else if (dtFormatadaRequestEnd === '') {
        alert('preencha a data final')
      }
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/pagar/periodo/${dtFormatadaRequestIni}/${dtFormatadaRequestEnd}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              console.log('====================================')
              console.log('certo')
              console.log('====================================')
            })
            .catch((error) => {
              console.log('====================================')
              console.log(error)
              console.log('====================================')
              if (error.response) {
                setArrayPagar([])
                setMessage([error.response.data])
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
        .catch(() => {
          setModalAlert(!modalAlert)
        })
    }
    resetFilter()
  }

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
            setModalFilter(!modalFilter)
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
          animationType="fade"
          transparent={true}
          visible={modalFilter}
          onRequestClose={() => {
            setModalFilter(!modalFilter)
          }}
        >
          <ModalFilter
            type={'pagar'}
            funcSearch={() => {
              search()
            }}

            func={() => {
              resetFilter()
              return setModalFilter(!modalFilter)
            }}

            supplierDesc={supplierDesc}
            setModalSupplier={setModalSupplier}
            modalSupplier={modalSupplier}

            crDesc={crDesc}
            setModalCr={setModalCr}
            modalCr={modalCr}

            setInputCod={setNumDoc}
            inputCod={numDoc}

            setInputNum={setInputNum}
            inputNum={inputNum}

            dtFormatadaIni={dtFormatadaIni}
            setDtFormatadaIni={setDtFormatadaIni}
            setDtFormatadaRequestIni={setDtFormatadaRequestIni}

            dtFormatadaEnd={dtFormatadaEnd}
            setDtFormatadaEnd={setDtFormatadaEnd}
            setDtFormatadaRequestEnd={setDtFormatadaRequestEnd}
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
      </Container>
    </MenuConainer>
  )
}

export default AcceptPay
