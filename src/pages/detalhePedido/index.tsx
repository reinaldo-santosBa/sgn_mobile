import { ActivityIndicator, BackHandler, FlatList, Modal, View } from 'react-native'
import React, { useState, useEffect, useContext, SetStateAction } from 'react'
import CardPedidoDetalhe from '../../components/cards/cardPedidoDetalhe'
import Button from '../../components/buttons/buttonConfAction'
import HeaderPedido from '../../components/headers/headerPedido'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/contextApi'
import ModalPassword from '../../components/modais/modalPassword'
import axios from 'axios'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import ModalAlert from '../../components/modais/modalAlert'

type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetalhePedido'
>;

interface propsRoute {
  route: {
    key: string,
    name: string,
    params: {
      FORN_NOME: string;
      PEDI_DATA: string;
      PEDI_COD: string;
      ASS: string;
      VALOR_TOTAL_SERVICO: string;
      VALOR_TOTAL_ITEM: string;
      PEDI_FORN_COD: string;
      PEDI_NUMERO: string;
      loadingFunc: React.Dispatch<SetStateAction<boolean>>
      responseFunc: React.Dispatch<SetStateAction<[]>>
      PEDI_OBS: string;
      EMPR_NOME: string;
      PEDI_DESCONTO: string;
      PEDI_FRETE: string;
      PEDI_TOTAL_MERC: string;
      PEDI_VALOR_APROVADO: string;
    }
    path: string
  }
}

const DetalhePedido: React.FC = ({ route }: propsRoute) => {
  const { refreshToken, url, version, att, setAtt } = useContext(AuthContext)
  const [modalPassword, setModalPassword] = useState(false)
  const {
    FORN_NOME,
    PEDI_DATA,
    PEDI_COD,
    ASS,
    VALOR_TOTAL_SERVICO,
    VALOR_TOTAL_ITEM,
    PEDI_FORN_COD,
    PEDI_NUMERO,
    PEDI_OBS,
    EMPR_NOME,
    PEDI_DESCONTO,
    PEDI_FRETE,
    PEDI_TOTAL_MERC,
    PEDI_VALOR_APROVADO
  } = route.params
  const pediCod = PEDI_COD
  const ass = ASS
  const pediNumero = PEDI_NUMERO
  const [modalAlert, setModalAlert] = useState(false)
  const [message, setMessage] = useState([])
  const [err, setErr] = useState(false)
  const fornCod = PEDI_FORN_COD
  const valorTotal = VALOR_TOTAL_SERVICO + VALOR_TOTAL_ITEM
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<FullNavigationProp>()
  const [modal, setModal] = useState(false)
  const backAction = () => {
    navigation.navigate('Pedidos')
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  useEffect(
    () => {
      axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then((json) => {
          const acessToken = json.data.acessToken
          axios.get(`${url}${version}/pedido/detalhe/${pediCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((response) => {
              setData(response.data)
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
          setLoading(false)
          setModalAlert(!modalAlert)
        })
    }, [])

  return (
    <View
      style={{ height: '100%', backgroundColor: '#FFF' }}
    >
      {loading === false ? <ActivityIndicator /> : ''}
      <Button
        functionOnpress={() => {
          setModalPassword(!modalPassword)
        }}
        textButton={'Aprove pedidos'}
      />
      <HeaderPedido
        FORN_NOME={FORN_NOME}
        PEDI_DATA={PEDI_DATA}
        VALOR_TOTAL_SERVICO={!VALOR_TOTAL_SERVICO ? '0' : VALOR_TOTAL_SERVICO}
        VALOR_TOTAL_ITEM={!VALOR_TOTAL_ITEM ? '0' : VALOR_TOTAL_ITEM}
        PEDI_FORN_COD={PEDI_FORN_COD}
        PEDI_NUMERO={PEDI_NUMERO}
        PEDI_OBS={PEDI_OBS}
        EMPR_NOME={EMPR_NOME}
        PEDI_DESCONTO={!PEDI_DESCONTO ? '0' : PEDI_DESCONTO}
        PEDI_FRETE={!PEDI_FRETE ? '0' : PEDI_FRETE}
        PEDI_TOTAL_MERC={!PEDI_TOTAL_MERC ? '0' : PEDI_TOTAL_MERC}
        PEDI_VALOR_APROVADO={!PEDI_VALOR_APROVADO ? '0' : PEDI_VALOR_APROVADO}
      />
      <FlatList
        style={{ width: '100%', flex: 1 }}
        renderItem={(item) => {
          return <CardPedidoDetalhe datas={item} />
        }}
        data={data}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPassword}
        onRequestClose={() => {
          setModalPassword(!modalPassword)
        }}
      >
        <ModalPassword

          func={() => {
            setModalPassword(!modalPassword)
          }}
          posAss={ass}

          cod={pediCod}

          responseFunc={() => {
            setAtt(!att)
          }}
          fornCod={fornCod}
          valTotal={valorTotal}
          pediNumero={pediNumero}
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
    </View>
  )
}

export default DetalhePedido
