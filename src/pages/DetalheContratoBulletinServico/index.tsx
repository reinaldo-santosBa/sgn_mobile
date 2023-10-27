import { ActivityIndicator, BackHandler, FlatList, Modal, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Button from '../../components/buttons/buttonConfAction'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/contextApi'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ModalAlert from '../../components/modais/modalAlert'
import { HeaderContractBulletinService } from '../../components/headers/headerServiceBulletinContract'
import { CardItemServiceContractBulletin } from '../../components/cards/cardItemServiceContractBulletin'
import ModalPasswordContratoServicoBulletin from '../../components/modais/modalPasswordContServBulletin'
import axios from 'axios'

export type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetalheContratoBulletinServico'
>;

interface propsRoute {
  route: {
    key: string,
    name: string,
    params: {
      FORN_NOME: string;
      BOCS_DT_INICIO: string;
      BOCS_DT_FIM: string;
      BOCS_OBS: string;
      BOCS_DT_VENC: string;
      ASS: string;
      COCS_COD: string;
      BOCS_NUMERO: string;
      VALOR_TOTAL: string;
      BOCS_COD: string;
      FORN_COD: string;
      CERE_COD: string;
    }
    path: string
  }
}

const DetalheContratoBulletinServico: React.FC<propsRoute> = ({ route }) => {
  const {
    refreshToken,
    setArrayContratoServicoBulletin,
    url,
    version
  } = useContext(AuthContext)
  const [modalPassword, setModalPassword] = useState(false)
  const dados = route.params
  const cocsCod = dados.COCS_COD
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const navigation = useNavigation<FullNavigationProp>()
  const backAction = () => {
    navigation.navigate('ServiceContractBulletin')
    return true
  }

  interface IarrayContratoServicoBulletin {
    cod: string,
    posAss: string,
    valor: string,
    cereCod: string;
    fornCod: string;
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
          axios.get(`${url}${version}/boletimServico/${cocsCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((response) => {
              setData(response.data)
              setLoading(true)
            })
            .catch(
              (error) => {
                setLoading(false)
                if (error.response) {
                  alert(error.response.data.message)
                } else if (error.request) {
                  alert(error.request.data.message)
                } else {
                  alert(error.data.message)
                }
              }

            )
        })
        .catch(
          () => {
            setLoading(false)
            setModal(!modal)
          }
        )
    }, [])

  return (

    <View
      style={{ height: '100%', backgroundColor: '#FFF' }}
    >
      {loading === false ? <ActivityIndicator /> : ''}
      <Button
        functionOnpress={() => {
          setArrayContratoServicoBulletin((arrayContratoServicoBulletin: IarrayContratoServicoBulletin[]) => [...arrayContratoServicoBulletin, {
            cod: dados.BOCS_COD,
            posAss: dados.ASS,
            valor: dados.VALOR_TOTAL,
            cereCod: dados.CERE_COD,
            fornCod: dados.FORN_COD
          }])
          setModalPassword(!modalPassword)
        }}
        textButton={'Aprove o contrato'}
      />
      <HeaderContractBulletinService
        FORN_NOME = { dados.FORN_NOME}
        BOCS_DT_INICIO={dados.BOCS_DT_INICIO}
        BOCS_DT_FIM={dados.BOCS_DT_FIM}
        BOCS_OBS={dados.BOCS_OBS}
        BOCS_DT_VENC={dados.BOCS_DT_VENC}
        COCS_COD={dados.COCS_COD}
        BOCS_NUMERO={dados.BOCS_NUMERO}
        VALOR_TOTAL={dados.VALOR_TOTAL}
        BOCS_COD={dados.BOCS_COD}
      />

      <FlatList
        style={{ width: '100%', flex: 1 }}
        renderItem={(item) => {
          return <CardItemServiceContractBulletin datas={item} />
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
        <ModalPasswordContratoServicoBulletin
          func={function (): void {
            setModalPassword(!modalPassword)
          }}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <ModalAlert
          message={['Sessão encerrada']}
          func={async () => {
            setModal(!modal)
            navigation.navigate('Login')
          }}
          error={true}
        />
      </Modal>
    </View>
  )
}

export default DetalheContratoBulletinServico
