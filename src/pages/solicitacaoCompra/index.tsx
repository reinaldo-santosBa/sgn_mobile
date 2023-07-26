/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlatList, ActivityIndicator, BackHandler, Modal } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/contextApi'
import { CardSoliCompra } from '../../components/cards/cardSolicitacao'
import BtnFilter from '../../components/buttons/btnFilter'
import ModalFilter from '../../components/modais/modalFilter'
import BtnEmMassa from '../../components/buttons/btnPedidoMassa'
import ModalSoliCompraLargeScale from '../../components/modais/modalPasswordSoliCompraLargeScale'
import MenuConainer from '../../components/menu/menuContainerCompras'
import axios from 'axios'
import ModalAlert from '../../components/modais/modalAlert'
import TextWithoutData from '../../components/input/textWithoutData'
import BtnAdd from '../../components/buttons/btnAdd'
import Container from '../../components/container'
import ModalSelectWerehouse from '../../components/modais/modalWerehouse'
import ModalSelectPurchaseSector from '../../components/modais/modalPurchaseSector'
import ModalSelectCrFilter from '../../components/modais/modalCRSelect'

const SolicitacaoCompras: React.FC = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])
  const [modal, setModal] = useState(false)
  const { refreshToken, arraySoliCompra, setBgState, bgState, attResponse, setAttResponse, url, version, setArraySoliCompra } = useContext(AuthContext)
  const [number, setNumber] = useState('')
  const [date, setDate] = useState('')
  const [purshingSector, setPurshingSector] = useState('Escolha um setor de compras')
  const [modalPassword, setModalPassword] = useState(false)
  const [modalFilter, setModalFilter] = useState(false)
  const [message, setMessage] = useState([])
  const [err, setErr] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const [modalAlmo, setModalAlmo] = useState(false)
  const [almoDesc, setAlmoDesc] = useState('Escolha um almoxarifado')
  const [almoCod, setAlmoCod] = useState('')
  const [dtFormatadaRequest, setDtFormatadaRequest] = useState('')
  const [dtFormatada, setDtFormatada] = useState('Escolha uma data')
  const [modalPurshingSector, setModalPurshingSector] = useState(false)
  const [secoCod, setSecoCod] = useState('')
  const [crDesc, setCrDesc] = useState('Escolha um Cr')
  const [modalCr, setModalCr] = useState(false)
  const [crCod, setCrCod] = useState('')

  useEffect(() => {
    setLoading(false)
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/solicitacaoCompra`, { headers: { Authorization: `Bearer ${acessToken}` } })
          .then((json) => {
            console.log('====================================')
            console.log(json.data)
            console.log('====================================')
            setResponse(json.data)
            setLoading(true)
          })
          .catch((error) => {
            setLoading(false)
            if (error.response) {
              setErr(true)
              setMessage([error.response.data])
              setModal(!modal)
            } else if (error.request) {
              setErr(true)
              setMessage([error.request.data])
              setModal(!modal)
            } else {
              setErr(true)
              setMessage([error.data.mesage])
              setModal(!modal)
            }
          })
      })

      .catch(() => {
        setLoading(false)
        setModalAlert(!modalAlert)
      })
  }, [attResponse])

  const backAction = () => {
    navigation.navigate('ComprasHome')
    return true
  }

  useEffect(() => {
    setArraySoliCompra([])
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  const search = () => {
    setLoading(false)
    if (number !== '') {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/solicitacaoCompra/numero/${number}`, { headers: { Authorization: `Bearer ${acessToken}` } })
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
                setMessage([error.data.mesage])
                setModal(!modal)
              }
            })
        })

        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else if (almoCod !== '') {
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/solicitacaoCompra/almoxarifado/${almoDesc}`, { headers: { Authorization: `Bearer ${acessToken}` } })
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
                setMessage([error.data.mesage])
                setModal(!modal)
              }
            })
        })

        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else if (dtFormatadaRequest !== '') {
      setLoading(false)
      console.log('====================================')
      console.log(1)
      console.log('====================================')
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/solicitacaoCompra/data/${dtFormatadaRequest}`, { headers: { Authorization: `Bearer ${acessToken}` } })
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
                setMessage([error.data.mesage])
                setModal(!modal)
              }
            })
        })

        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    } else if (secoCod !== '') {
      setLoading(false)
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/solicitacaoCompra/setorCompras/${purshingSector}`, { headers: { Authorization: `Bearer ${acessToken}` } })
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
                setMessage([error.data.mesage])
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
          axios.get(`${url}${version}/solicitacaoCompra/cr/${crCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
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
                setMessage([error.data.mesage])
                setModal(!modal)
              }
            })
        })

        .catch(() => {
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    }
    setNumber('')
    setAlmoDesc('Escolha um almoxarifado')
    setAlmoCod('')
    setCrCod('')
    setCrDesc('Escolha um Cr')
    setSecoCod('')
    setPurshingSector('Escolha um setor de compras')
    setDtFormatada('Escolha uma data')
    setLoading(true)
    setDtFormatadaRequest('')
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
        <BtnAdd
          func={() => {
            navigation.navigate('AddPurchaseOrder')
          }}
        />
        {arraySoliCompra.length >= 1
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
          initialNumToRender={10}

          renderItem={(item) => {
            return (
              <CardSoliCompra
                datas={item}
                navigation={navigation}
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
          visible={modalFilter}
          onRequestClose={() => {
            setModalFilter(!modalFilter)
          }}
        >

          <ModalFilter

            type={'solicitacao'}
            funcSearch={() => {
              search()
            }}

            func={() => {
              return setModalFilter(!modalFilter)
            }}
            number={number}
            setNumber={setNumber}
            date={date} setDate={setDate}
            purshingSector={purshingSector}
            setModalWereHouse={setModalAlmo}
            modalWereHouse={modalAlmo}
            werehouseDesc={almoDesc}
            dtFormatada={dtFormatada}
            setDtFormatada={setDtFormatada}
            setDtFormatadaRequest={setDtFormatadaRequest}
            setModalPurshingSector={setModalPurshingSector}
            modalPurshingSector={modalPurshingSector}
            setModalCr={setModalCr}
            modalCr={modalCr}
            crDesc={crDesc}
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

          animationType="fade"
          transparent={true}
          visible={modalPassword}
          onRequestClose={() => {
            setModalPassword(!modalPassword)
          }}

        >

          <ModalSoliCompraLargeScale
            func={() => {
              setModalPassword(!modalPassword)
            }}
            loadingFunc={() => {
              setLoading(false)
            }}
            responseFunc={() => {
              setAttResponse(!attResponse)
            }}
            response={attResponse}
            setArray={setAttResponse}
            mudarCor={() => {
              setBgState(!bgState)
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
            func={async () => {
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAlmo}
        >
          <ModalSelectWerehouse
            onChange={setAlmoCod}
            value={almoCod}
            modalChange={
              () => {
                setModalAlmo(!modalAlmo)
              }
            }
            setAlmoDesc={setAlmoDesc}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPurshingSector}
        >
          <ModalSelectPurchaseSector
            onChange={setSecoCod}
            value={secoCod}
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

export default SolicitacaoCompras
