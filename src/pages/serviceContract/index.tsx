import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/container'
import CardServiceContract from '../../components/cards/cardServiceContract'
import { AuthContext } from '../../contexts/contextApi'
import { ActivityIndicator, FlatList, Modal } from 'react-native'
import ModalPasswordContratoServico from '../../components/modais/modalPasswordContServ'
import BtnEmMassa from '../../components/buttons/btnPedidoMassa'
import BtnFilter from '../../components/buttons/btnFilter'
import ModalFilter from '../../components/modais/modalFilter'
import ModalAlert from '../../components/modais/modalAlert'
import MenuConainer from '../../components/menu/menuContainerCompras'
import TextWithoutData from '../../components/input/textWithoutData'
import ModalSelectSupplier from '../../components/modais/modalSupplier'
import ModalSelectSubsidiary from '../../components/modais/modalSubsidiary'
import ModalSelectCompany from '../../components/modais/modalCompany'
import ModalSelectLocal from '../../components/modais/modalLocal'
import axios from 'axios'
import ModalSelectCrFilter from '../../components/modais/modalCRSelect'

const ServiceContract: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])
  const {
    refreshToken,
    attResponse,
    bgState,
    setBgState,
    arrayContratoServico,
    setArrayContratoServico,
    url,
    version
  } = useContext(AuthContext)
  const [modalPassword, setModalPassword] = useState(false)

  const [modal, setModal] = useState(false)

  const [modalAlert, setModalAlert] = useState(false)

  const [inputCod, setInputCod] = useState('')

  const [err, setErr] = useState(false)
  const [message, setMessage] = useState([])

  const [fornDesc, setFornDesc] = useState('Escolha um fornecedor')
  const [modalForn, setModalForn] = useState(false)
  const [fornCod, setFornCod] = useState('')

  const [subsidiaryDesc, setSubsidiaryDesc] = useState('Escolha uma filial')
  const [modalSubsidiary, setModalSubsidiary] = useState(false)
  const [subsidiaryCod, setSubsidiaryCod] = useState('')

  const [companyDesc, setCompanyDesc] = useState('Escolha uma empresa')
  const [modalCompany, setModalCompany] = useState(false)
  const [companyCod, setCompanyCod] = useState('')

  const [localDesc, setLocalDesc] = useState('Escolha o local')
  const [modalLocal, setModalLocal] = useState(false)
  const [localCod, setLocalCod] = useState('')

  const [crDesc, setCrDesc] = useState('Escolha um Cr')
  const [modalCr, setModalCr] = useState(false)
  const [crCod, setCrCod] = useState('')

  useEffect(() => {
    setLoading(false)
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/contratoServico`, { headers: { Authorization: `Bearer ${acessToken}` } })
          .then((json) => {
            setResponse(json.data)
            setLoading(true)
          })
          .catch((error) => {
            if (error.response) {
              setArrayContratoServico([])
              setMessage(error.response.data)
              setErr(true)
              setModal(!modal)
            } else if (error.request) {
              setArrayContratoServico([])
              setMessage(error.request.data)
              setErr(true)
              setModal(!modal)
            } else {
              setArrayContratoServico([])
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
    if (inputCod !== '') {
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/contratoServico/cod/${inputCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServico([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServico([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayContratoServico([])
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
    } else if (fornDesc !== 'Escolha um fornecedor') {
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/contratoServico/forn/${fornDesc}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServico([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServico([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayContratoServico([])
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
    } else if (companyDesc !== 'Escolha uma empresa') {
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/contratoServico/empr/${companyDesc}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServico([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServico([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayContratoServico([])
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
    } else if (subsidiaryDesc !== 'Escolha uma filial') {
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/contratoServico/fili/${subsidiaryDesc}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServico([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServico([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayContratoServico([])
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
    } else if (localDesc !== 'Escolha um local') {
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/contratoServico/local/${localCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServico([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServico([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayContratoServico([])
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
    } else if (crCod !== '') {
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/contratoServico/cr/${crCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServico([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServico([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayContratoServico([])
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
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/contratoServico`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
              if (error.response) {
                setArrayContratoServico([])
                setMessage(error.response.data)
                setErr(true)
                setModal(!modal)
              } else if (error.request) {
                setArrayContratoServico([])
                setMessage(error.request.data)
                setErr(true)
                setModal(!modal)
              } else {
                setArrayContratoServico([])
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
    setInputCod('')
    setCompanyCod('')
    setCompanyDesc('Escolha uma empresa')
    setCompanyCod('')
    setCompanyDesc('Escolha uma filial')
    setLocalCod('')
    setLocalDesc('Escolha um local')
    setCrCod('')
    setCrDesc('Escolha um cr')
  }
  return (
    <MenuConainer>
      <Container>

        {loading === false ? <ActivityIndicator /> : ''}

        {arrayContratoServico.length
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
                  <CardServiceContract
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
              setArrayContratoServico([])
            }}
          />
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal)
          }}
        >
          <ModalFilter
            type={'contrato'}
            funcSearch={() => {
              search()
              setModal(!modal)
              setInputCod('')
              setSubsidiaryDesc('Escolha uma filial')
              setLocalDesc('Escolha um local')
              setFornDesc('Escolha um fornecedor')
              setCompanyDesc('Escolha uma empresa')
            }}

            func={() => {
              setModal(!modal)
            }}

            inputCod={inputCod}
            setInputCod={setInputCod}

            supplierDesc={fornDesc}
            setModalSupplier={setModalForn}
            modalSupplier={modalForn}

            subsidiaryDesc={subsidiaryDesc}
            setModalSubsidiary={setModalSubsidiary}
            modalSubsidiary={modalSubsidiary}

            companyDesc={companyDesc}
            setModalCompany={setModalCompany}
            modalCompany={modalCompany}

            localDesc={localDesc}
            setModalLocal={setModalLocal}
            modalLocal={modalLocal}

            crDesc={crDesc}
            setModalCr={setModalCr}
            modalCr={modalCr}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalForn}
        >
          <ModalSelectSupplier
            onChange={setFornCod}
            value={fornCod}
            modalChange={
              () => {
                setModalForn(!modalForn)
              }
            }
            setSupplier={setFornDesc}
          />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalLocal}
        >
          <ModalSelectLocal
            onChange={setLocalCod}
            value={localCod}
            modalChange={
              () => {
                setModalLocal(!modalLocal)
              }
            }
            setLocal={setLocalDesc}
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
          visible={modalCompany}
        >
          <ModalSelectCompany
            onChange={setCompanyCod}
            value={companyCod}
            modalChange={
              () => {
                setModalCompany(!modalCompany)
              }
            }
            setCompany={setCompanyDesc}
          />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSubsidiary}
        >
          <ModalSelectSubsidiary
            onChange={setSubsidiaryCod}
            value={subsidiaryCod}
            modalChange={
              () => {
                setModalSubsidiary(!modalSubsidiary)
              }
            }
            setSubsidiary={setSubsidiaryDesc}
          />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAlert}
        >
          <ModalAlert
            message={message}
            func={() => {
              setModalAlert(!modalAlert)
            }}
            error={err}
          />
        </Modal>
      </Container>
    </MenuConainer>
  )
}

export default ServiceContract
