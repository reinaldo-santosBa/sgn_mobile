import { BackHandler, Modal, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Button from '../../components/buttons/buttonConfAction'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/contextApi'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ModalAlert from '../../components/modais/modalAlert'
import ModalPasswordPay from '../../components/modais/modalPasswordPay'
import { HeaderPay } from '../../components/headers/headerPay'

export type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ComprasHome'
>;

interface params {
  route: {
    params: {
      cere_nome: string;
      cere_sigla: string;
      empr_nome: string;
      forn_aliquota_ir_pj: number;
      forn_nome: string;
      itpc_desc: string;
      itpc_sigla: string;
      sttr_desc: string;
      trpg_cod: number,
      trpg_dtemis: string;
      trpg_dtorigem: string;
      trpg_dtrecebimento: string;
      trpg_empr_cod: number;
      trpg_forn_cod: number;
      trpg_num_doc: string;
      trpg_obs: string;
      trpg_rate_cod: number;
      trpg_sttr_cod: string;
      trpg_tipo_doc: string;
      trpg_valbruto: string;
      trpg_valdesconto: number;
      trpg_valjur: number;
      trpg_valmulta: number;
      trpp_cere_cod: number;
      trpp_cod: string;
      trpp_dtvenc: string;
      trpp_itpc_cod: number;
      trpp_obs: string;
      trpp_sigla: string;
      trpp_sttr_cod: string;
      trpp_valdesc: number;
      trpp_valjur: number;
      trpp_valprev: number;
    }
  }
}
interface IarrayPagar {
  trppCod: string;
  cereCod: string;
  valor: number;
}

const DetalhePay: React.FC = ({ route }: params) => {
  const { setArrayPagar } = useContext(AuthContext)
  const [modalPassword, setModalPassword] = useState(false)
  const dados = route.params
  const [modal, setModal] = useState(false)
  const navigation = useNavigation<FullNavigationProp>()
  const backAction = () => {
    navigation.navigate('AcceptPay')
    return true
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (

    <View
      style={{ height: '100%', backgroundColor: '#FFF' }}
    >
      <Button
        functionOnpress={() => {
          setArrayPagar((arrayPagar: IarrayPagar[]) => [...arrayPagar, {
            trppCod: dados.trpp_cod.toString(),
            cereCod: dados.trpp_cere_cod.toString(),
            valor: Number(dados.trpp_valprev)
          }])

          setModalPassword(!modalPassword)
        }}
        textButton={'Aprove o pagamento'}
      />
      <HeaderPay
        datas={dados}
      />

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

export default DetalhePay
