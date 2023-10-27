import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/container'
import { AuthContext } from '../../contexts/contextApi'
import { ActivityIndicator, FlatList, Modal } from 'react-native'
import ModalPasswordContratoServico from '../../components/modais/modalPasswordContServ'
import BtnFilter from '../../components/buttons/btnFilter'
import MenuConainer from '../../components/menu/menuContainerCompras'
import TextWithoutData from '../../components/input/textWithoutData'
import CardItemPurchaseWorksheet from '../../components/cards/cardItemPurchaseWorksheet'
import ModalFilter from '../../components/modais/modalFilter'
import ModalSelectEmployee from '../../components/modais/modalEmployee'
import ModalSelectPurchaseSector from '../../components/modais/modalPurchaseSector'
import axios from 'axios'

const PurchaseWorksheet: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])
  const {
    refreshToken,
    att,
    bgState,
    setBgState,
    url,
    version,
    setArrayPurchaseWorksheet
  } = useContext(AuthContext)
  const [modalPassword, setModalPassword] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const [, setErr] = useState(false)
  const [, setMessage] = useState([])
  const [modalFilter, setModalFilter] = useState(false)

  const [modalEmployee, setModalEmployee] = useState(false)
  const [employeeDesc, setEmployeeDesc] = useState('Escolha um funcionario')
  const [employeeCod, setEmployeeCod] = useState('')

  const [modalPurshingSector, setModalPurshingSector] = useState(false)
  const [purshingSector, setPurshingSector] = useState('Escolha um setor de compras')
  const [purshingSectorCod, setPurshingSectorCod] = useState('')

  const [inputCod, setInputCod] = useState('')

  useEffect(() => {
    setLoading(false)
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/planilhaDeCompra`, { headers: { Authorization: `Bearer ${acessToken}` } })
          .then((json) => {
            setResponse(json.data)
            setLoading(true)
          })
          .catch((error) => {
            if (error.response) {
              setArrayPurchaseWorksheet([])
              setMessage(error.response.data)
              setErr(true)
              setModal(!modal)
            } else if (error.request) {
              setArrayPurchaseWorksheet([])
              setMessage(error.request.data)
              setErr(true)
              setModal(!modal)
            } else {
              setArrayPurchaseWorksheet([])
              setMessage(error.data)
              setErr(true)
              setModal(!modal)
            }
            setLoading(true)
          })
      })
      .catch(() => {
        setLoading(false)
        setModalAlert(!modalAlert)
      })
  }, [att])

  const search = () => {
    setLoading(false)
    if (inputCod !== '') {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/planilhaDeCompra/codigo/${inputCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
              if (error.response) {
                setArrayPurchaseWorksheet([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayPurchaseWorksheet([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayPurchaseWorksheet([])
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
    } else if (employeeCod !== '') {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/planilhaDeCompra/funcionario/${employeeCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
              if (error.response) {
                setArrayPurchaseWorksheet([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayPurchaseWorksheet([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayPurchaseWorksheet([])
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
    } else if (purshingSectorCod !== '') {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/planilhaDeCompra/setorCompras/${purshingSectorCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
              if (error.response) {
                setArrayPurchaseWorksheet([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayPurchaseWorksheet([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayPurchaseWorksheet([])
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
    } else {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/planilhaDeCompra`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
            })
            .catch((error) => {
              if (error.response) {
                setArrayPurchaseWorksheet([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayPurchaseWorksheet([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayPurchaseWorksheet([])
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
    }
    setLoading(true)
    setEmployeeCod('')
    setEmployeeDesc('Escolha um funcionario')
    setInputCod('')
    setPurshingSector('Escolha um setor de compras')
    setPurshingSectorCod('')
    setModalFilter(!modalFilter)
  }

  return (
    <MenuConainer>
      <Container>

        {loading === false ? <ActivityIndicator /> : ''}

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
                  <CardItemPurchaseWorksheet
                    datas={item}
                    responseFunc={setResponse}
                  />
                )
              }}
              data={response}
            />
            : ''
        }
        {
          response.length === 0 && loading === true
            ? <TextWithoutData />
            : ''
        }

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalPassword}
          onRequestClose={() => {
            setModalPassword(!modalPassword)
          }}
        >
          <ModalPasswordContratoServico
            func={function (): void {
              setModalPassword(!modalPassword)
              setBgState(!bgState)
              setArrayPurchaseWorksheet([])
            }}
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
            type={'planilha'}
            funcSearch={() => {
              search()
            }}

            func={() => {
              setModalFilter(!modalFilter)
            }}

            setModalEmployee={setModalEmployee}
            modalEmployee={modalEmployee}
            employeeDesc={employeeDesc}

            modalPurshingSector={modalPurshingSector}
            setModalPurshingSector={setModalPurshingSector}
            purshingSector={purshingSector}

            inputCod={inputCod}
            setInputCod={setInputCod}

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
          visible={modalPurshingSector}
        >
          <ModalSelectPurchaseSector
            onChange={setPurshingSectorCod}
            value={purshingSectorCod}
            modalChange={
              () => {
                setModalPurshingSector(!modalPurshingSector)
              }
            }
            setSetoDesc={setPurshingSector}
          />
        </Modal>

      </Container>
    </MenuConainer>
  )
}

export default PurchaseWorksheet
