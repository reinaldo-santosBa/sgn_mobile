import { TouchableOpacity, Text, View, Modal, BackHandler } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'
import { AuthContext } from '../../../contexts/contextApi'
import ModalPasswordPagar from '../../modais/modalPasswordContServ'
import { useNavigation } from '@react-navigation/native'
import { FullNavigationProp } from '../../menu/menuContainerCompras'

interface props {
  datas: {
    item: {
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
  },
  loadingFunc: () => void
  responseFunc: () => void
}

interface IarrayPagar {
  trppCod: string;
  cereCod: string;
  valor: number;
}
const CardPay: React.FC<props> = ({ datas }: props) => {
  const {
    bgState,
    setBgState,
    arrayPagar,
    setArrayPagar
  } = useContext(AuthContext)

  const navigation = useNavigation<FullNavigationProp>()

  const [modalPassword, setModalPassword] = useState(false)
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const swipeableRef = useRef(null)

  const valorTotal = datas.item.trpp_valprev + ''

  useEffect(
    () => {
      setBgColor('#FFFFFF')
      setArrayPagar([])
    }, [bgState]
  )

  const handleLongPress = () => {
    if (bgColor === '#FFFFFF') {
      setBgColor('#aaaaaa')
      setArrayPagar((arrayPagar: IarrayPagar[]) => [...arrayPagar, {
        trppCod: datas.item.trpp_cod.toString(),
        cereCod: datas.item.trpp_cere_cod.toString(),
        valor: Number(datas.item.trpp_valprev)
      }])
    } else {
      setArrayPagar(
        arrayPagar.filter(
          (item) => {
            if (item.trppCod !== datas.item.trpp_cod) {
              return false
            }
            return true
          }
        )
      )
      setBgColor('#FFFFFF')
    }
  }

  const backAction = () => {
    setArrayPagar([])
    setBgColor('#FFFFFF')
    navigation.goBack()
    return true
  }

  const handleClick = () => {
    if (arrayPagar.length === 0) {
      navigation.navigate('DetalhePay', {
        cere_nome: datas.item.cere_nome,
        cere_sigla: datas.item.cere_sigla,
        empr_nome: datas.item.empr_nome,
        forn_aliquota_ir_pj: datas.item.forn_aliquota_ir_pj,
        forn_nome: datas.item.forn_nome,
        itpc_desc: datas.item.itpc_desc,
        itpc_sigla: datas.item.itpc_sigla,
        sttr_desc: datas.item.sttr_desc,
        trpg_cod: datas.item.trpg_cod,
        trpg_dtemis: datas.item.trpg_dtemis,
        trpg_dtorigem: datas.item.trpg_dtorigem,
        trpg_dtrecebimento: datas.item.trpg_dtrecebimento,
        trpg_empr_cod: datas.item.trpg_empr_cod,
        trpg_forn_cod: datas.item.trpg_forn_cod,
        trpg_num_doc: datas.item.trpg_num_doc,
        trpg_obs: datas.item.trpg_obs,
        trpg_rate_cod: datas.item.trpg_rate_cod,
        trpg_sttr_cod: datas.item.trpg_sttr_cod,
        trpg_tipo_doc: datas.item.trpg_tipo_doc,
        trpg_valbruto: datas.item.trpg_valbruto,
        trpg_valdesconto: datas.item.trpg_valdesconto,
        trpg_valjur: datas.item.trpg_valjur,
        trpg_valmulta: datas.item.trpg_valmulta,
        trpp_cere_cod: datas.item.trpp_cere_cod,
        trpp_cod: datas.item.trpp_cod,
        trpp_dtvenc: datas.item.trpp_dtvenc,
        trpp_itpc_cod: datas.item.trpp_itpc_cod,
        trpp_obs: datas.item.trpp_obs,
        trpp_sigla: datas.item.trpp_sigla,
        trpp_sttr_cod: datas.item.trpp_sttr_cod,
        trpp_valdesc: datas.item.trpp_valdesc,
        trpp_valjur: datas.item.trpp_valjur,
        trpp_valprev: datas.item.trpp_valprev
      })
    } else {
      if (bgColor === '#FFFFFF') {
        setBgColor('#AAAAAA')
        setArrayPagar((arrayPagar: IarrayPagar[]) => [...arrayPagar, {
          trppCod: datas.item.trpp_cod.toString(),
          cereCod: datas.item.trpp_cere_cod.toString(),
          valor: Number(datas.item.trpg_valbruto)
        }])
      } else {
        setBgColor('#FFFFFF')
        setArrayPagar(
          arrayPagar.filter(
            (item) => {
              setBgColor('#FFFFFF')
              if (item.trppCod !== datas.item.trpp_cod) {
                return false
              }
              return true
            }
          )
        )
      }
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  const closeSwipeable = () => {
    swipeableRef.current.close()
  }

  return (
    <TouchableOpacity
      style={[styles.card, {
        backgroundColor: `${bgColor}`
      }]}
      onPress={() => {
        handleClick()
      }}
      onLongPress={() => {
        handleLongPress()
      }}
    >

      <View style={styles.cardTextArea}>
        <Text style={styles.cardTextTitle}>Fornecedor : </Text>
        <Text style={styles.cardTextBody}>{datas.item.forn_nome.slice(0, 20)}...</Text>
      </View>
      <View style={styles.cardTextArea}>
        <Text style={styles.cardTextTitle}>CR : </Text>
        <Text style={styles.cardTextBody}>{datas.item.cere_nome.slice(0, 23)}...</Text>
      </View>
      <View style={styles.cardTextArea}>
        <Text style={styles.cardTextTitle}>Item pcg : </Text>
        <Text style={styles.cardTextBody}>{datas.item.itpc_desc.slice(0, 25)}...</Text>
      </View>
      <View style={styles.cardTextArea}>
        <Text style={styles.cardTextTitle}>Codigo parcela : </Text>
        <Text style={styles.cardTextBody}>{datas.item.trpp_cod}</Text>
      </View>
      <View style={styles.cardTextArea}>
        <Text style={styles.cardTextTitle}>Valor : </Text>
        <Text style={styles.cardTextBody}>{changeReal(valorTotal)}</Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPassword}
        onRequestClose={() => {
          setModalPassword(!modalPassword)
        }}
      >
        <ModalPasswordPagar
          func={() => {
            setModalPassword(!modalPassword)
            closeSwipeable()
            setBgState(!bgState)
          }}
        />
      </Modal>
    </TouchableOpacity>

  )
}

export default CardPay
