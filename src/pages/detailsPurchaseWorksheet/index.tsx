import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/container'
import Button from '../../components/buttons/button'
import ButtonSoliFornPlanilha from '../../components/buttons/ButtonSoliFornPlanilha'
import { AuthContext } from '../../contexts/contextApi'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { useNavigation } from '@react-navigation/native'
import { BackHandler, View, FlatList, Modal, ActivityIndicator, Text } from 'react-native'
import { HeaderPurchaseWorksheet } from '../../components/headers/headerPurchaseWorksheet'
import ModalAlert from '../../components/modais/modalAlert'
import CardFornPurchaseWorksheet from '../../components/cards/cardFornPurchaseWorksheet'
import CardSoliPurchaseWorksheet from '../../components/cards/cardSoliPurchaseWorksheet'
import ModalPasswordWorksheet from '../../components/modais/modalPasswordWorksheet'
import BtnBack from '../../components/buttons/btnBack'
import axios from 'axios'

interface params {
  route: {
    key: string;
    name: string;
    params: {
      ASS: string;
      PESS_NOME: string;
      PLAC_COD: string;
      PLAC_PESS_COD: string;
      PLAC_SECO_COD: string;
      SECO_DESC: string;
    },
    path: undefined
  }
}

interface IarrayPurchaseWorksheet {
  codigo: string;
  posAss: string;
}

const DetailsPurchaseWorksheet: React.FC = ({ route }: params) => {
  const [modal, setModal] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const [modalPassword, setModalPassword] = useState(false)
  const [responseForn, setResponseForn] = useState([])
  const [responseSoli, setResponseSoli] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)
  const [message, setMessage] = useState([])
  const {
    refreshToken,
    att,
    url,
    version
  } = useContext(AuthContext)
  useEffect(
    () => {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/planilhaDeCompra/fornecedor/${route.params.PLAC_COD}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((response) => {
              console.log('====================================')
              console.log(response.data)
              console.log('====================================')
              setResponseForn(response.data)

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
                setMessage([error.data.mesage])
                setModal(!modal)
              }
            })
        })
        .catch(
          () => {
            setLoading(false)
            setModalAlert(!modalAlert)
          }
        )
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/planilhaDeCompra/solicitacao/${route.params.PLAC_COD}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((response) => {
              setResponseSoli(response.data)
              console.log('====================================')
              console.log(response.data)
              console.log('====================================')
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
                setMessage([error.data.mesage])
                setModal(!modal)
              }
            })
        })
        .catch(() => {
          setLoading(true)
          setModalAlert(!modalAlert)
        })
    }, [att])

  const {
    ASS,
    PESS_NOME,
    PLAC_COD,
    PLAC_PESS_COD,
    PLAC_SECO_COD,
    SECO_DESC
  } = route.params
  const [tipo, setTipo] = useState('FORN')
  const { setArrayPurchaseWorksheet } = useContext(AuthContext)
  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'DetailsPurchaseWorksheet'
  >;
  const navigation = useNavigation<FullNavigationProp>()

  const backAction = () => {
    setArrayPurchaseWorksheet([])
    navigation.navigate('PurchaseWorksheet')
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (
      <Container>
      {loading === false ? <ActivityIndicator size={'large'} style={{ position: 'absolute' }} /> : ''}
      <BtnBack
        func={
          () => {
            navigation.goBack()
          }
        }
      />
        <Button

          functionOnpress={() => {
            setArrayPurchaseWorksheet([])
            setArrayPurchaseWorksheet((arrayPurchaseWorksheet: IarrayPurchaseWorksheet[]) => [...arrayPurchaseWorksheet, {
              codigo: PLAC_COD,
              posAss: ASS
            }])
            setModalPassword(!modalPassword)
          }}
          textButton={'Aprovar'}

        />

        <HeaderPurchaseWorksheet
          PESS_NOME={PESS_NOME}
          PLAC_COD={PLAC_COD}
          PLAC_PESS_COD={PLAC_PESS_COD}
          PLAC_SECO_COD={PLAC_SECO_COD}
          SECO_DESC={SECO_DESC}
        />

        <ButtonSoliFornPlanilha
          setTipo={setTipo}
        />

        <View style={{ flex: 1 }}>

          {
            tipo === 'FORN'
              ? responseForn.length > 0
                ? < FlatList
                style={{ flex: 1, width: '100%' }}
                showsVerticalScrollIndicator={false}
                data={responseForn}
                renderItem={(item) => <CardFornPurchaseWorksheet datas={item} />}
                />
                : <Text style={{ fontSize: 18, marginTop: 20 }} >Sem dados para ser exibido</Text>
              : responseSoli.length > 0
                ? <FlatList
                style={{ flex: 1, width: '100%' }}
                data={responseSoli}
                renderItem={(item) => <CardSoliPurchaseWorksheet datas={item} />}
                />
                : <Text style={{ fontSize: 18, marginTop: 20 }}>Sem dados para ser exibido</Text>
          }

        </View>
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
          visible={modalPassword}
        >
          <ModalPasswordWorksheet
            func={
              () => {
                setModalPassword(!modalPassword)
              }
            }
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
      </Container>
  )
}

export default DetailsPurchaseWorksheet
