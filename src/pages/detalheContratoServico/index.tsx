import { ActivityIndicator, BackHandler, FlatList, Modal, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Button from '../../components/buttons/buttonConfAction'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/contextApi'
import { HeaderContractService } from '../../components/headers/headerServiceContract'
import { CardItemServiceContract } from '../../components/cards/cardItemServiceContract'
import ModalPasswordContratoServico from '../../components/modais/modalPasswordContServ'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ModalAlert from '../../components/modais/modalAlert'
import axios from 'axios'

export type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ComprasHome'
>;

interface params{
  route: {
    params: {
      item: {
        COCS_DT_INICIO: string;
        COCS_DT_FIM: string;
        VALOR_TOTAL: string;
        COCS_FORMA_PAGAMENTO: string;
        SERV_DESC: string;
        FORN_NOME: string;
        FILI_NOME_FANTASIA: string;
        EMPR_NOME: string;
        LOCA_DESC: string;
        COCS_COD: string;
        ASS: string;
        CERE_NOME: string;
        CERE_SIGLA: string
      }
    }
  }
}

const DetalheContratoServico: React.FC = ({ route }: params) => {
  const { refreshToken, setArrayContratoServico, url, version } = useContext(AuthContext)
  const [modalPassword, setModalPassword] = useState(false)
  const dados = route.params.item
  const cocsCod = dados.COCS_COD
  const ass = dados.ASS
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const navigation = useNavigation<FullNavigationProp>()
  const backAction = () => {
    navigation.navigate('ServiceContract')
    return true
  }
  interface IarrayContratoServico {
    cod: string,
    posAss: string,
    valor: string,
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
          axios.get(`${url}${version}/contratoServico/detalhes/${cocsCod}`, { headers: { Authorization: `Bearer ${acessToken}` } })
            .then((response) => {
              console.log('====================================')
              console.log(response.data)
              console.log('====================================')
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
      {loading === false ? <ActivityIndicator/> : ''}
      <Button
        functionOnpress={() => {
          setArrayContratoServico((arrayContratoServico: IarrayContratoServico[]) => [...arrayContratoServico, {
            cod: cocsCod + '',
            posAss: ass + '',
            valor: dados.VALOR_TOTAL + ''
          }])

          setModalPassword(!modalPassword)
        }}
        textButton={'Aprove o contrato'}
      />
      <HeaderContractService
        datas={dados}
      />

      <FlatList
        style={{ width: '100%', flex: 1 }}
        renderItem={(item) => {
          return <CardItemServiceContract datas={item} />
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
        <ModalPasswordContratoServico
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

export default DetalheContratoServico
