import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/container'
import { FlatList } from 'react-native-gesture-handler'
import CardServiceContract from '../../components/cards/cardServiceContract'
import { api } from '../../services/axios'
import { AuthContext } from '../../contexts/contextApi'
import { ActivityIndicator, Modal } from 'react-native'
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

const ServiceContract: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])
  const {
    refreshToken,
    attResponse,
    bgState,
    setBgState,
    arrayContratoServico,
    setArrayContratoServico
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

  useEffect(() => {
    setLoading(false)
    api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        api.get('contratoServico', { headers: { Authorization: `Bearer ${acessToken}` } })
          .then((json) => {
            setResponse(json.data)
            setLoading(true)
          })
          .catch((error) => {
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
      api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          api.get(`contratoServico/cod/${inputCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
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
            })
        })
        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else if (fornDesc !== '') {
      setLoading(false)
      api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          api.get(`contratoServico/forn/${fornDesc}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
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
            })
        })
        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else if (companyDesc !== 'Escolha uma empresa') {
      setLoading(false)
      api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          api.get(`contratoServico/empr/${companyDesc}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
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
            })
        })
        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else if (subsidiaryDesc !== 'Escolha uma filial') {
      setLoading(false)
      api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          api.get(`contratoServico/fili/${subsidiaryDesc}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
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
            })
        })
        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else if (localDesc !== '') {
      setLoading(false)
      api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          api.get(`contratoServico/local/${localDesc}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
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
            })
        })
        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else {
      setLoading(false)
      api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          api.get('contratoServico', { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((json) => {
              setResponse(json.data)
              setLoading(true)
            })
            .catch((error) => {
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
            })
        })
        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    }
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
            setSubsidiary={setCompanyDesc}
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
