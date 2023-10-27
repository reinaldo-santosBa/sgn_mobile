import { TouchableOpacity, Text, View, Modal, BackHandler } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'
import { AuthContext } from '../../../contexts/contextApi'
import ModalPasswordContratoServico from '../../modais/modalPasswordContServ'
import { useNavigation } from '@react-navigation/native'
import { formatDate } from '../../../utils/formatData'
import { FullNavigationProp } from '../../menu/menuContainerCompras'

interface props {
  datas: {
    item: {
      FORN_NOME: string;
      BOCS_DT_INICIO: string;
      BOCS_DT_FIM: string;
      BOCS_OBS: string;
      BOCS_DT_VENC: string;
      ASS: string;
      COCS_COD: string;
      BOCS_NUMERO: string;
      BOCS_COD: string;
      QTD: string;
      VAL_UNIT: string;
      BOCS_DATA: string;
      COCS_CERE_COD: string;
      COCS_FORN_COD: string;
    }
  },
  loadingFunc: () => void
  responseFunc: () => void
}

interface IarrayContratoServicoBulletin {
  cod: string,
  posAss: string,
  valor: string,
  cereCod: string;
  fornCod: string;
}

export const CardServiceContractBulletin: React.FC<props> = ({ datas }: props) => {
  const {
    bgState,
    setBgState,
    arrayContratoServicoBulletin,
    setArrayContratoServicoBulletin
  } = useContext(AuthContext)
  const navigation = useNavigation<FullNavigationProp>()

  const [modalPassword, setModalPassword] = useState(false)
  const [bgColor, setBgColor] = useState('#FFFFFF')

  const dateInic = new Date(datas.item.BOCS_DT_INICIO)
  const dateFim = new Date(datas.item.BOCS_DT_FIM)
  const dateVenc = new Date(datas.item.BOCS_DT_VENC)
  const dateSignUp = new Date(datas.item.BOCS_DATA)
  const cod = datas.item.BOCS_COD
  const assPos = datas.item.ASS
  const cereCod = datas.item.COCS_CERE_COD
  const fornCod = datas.item.COCS_FORN_COD
  useEffect(
    () => {
      setBgColor('#FFFFFF')
    }, [bgState]
  )
  const valorTotal = parseFloat(datas.item.QTD) * parseFloat(datas.item.VAL_UNIT)

  const handleLongPress = () => {
    if (bgColor === '#FFFFFF') {
      setBgColor('#aaaaaa')
      setArrayContratoServicoBulletin((arrayContratoServicoBulletin: IarrayContratoServicoBulletin[]) => [...arrayContratoServicoBulletin, {
        cod,
        posAss: assPos,
        valor: valorTotal + '',
        cereCod,
        fornCod
      }])
    } else {
      setArrayContratoServicoBulletin(
        arrayContratoServicoBulletin.filter(
          (item) => {
            return item.cod !== cod
          }
        )
      )
      setBgColor('#FFFFFF')
    }
  }

  const backAction = () => {
    setArrayContratoServicoBulletin([])
    setBgColor('#FFFFFF')
    navigation.goBack()
    return true
  }

  const handleClick = () => {
    if (arrayContratoServicoBulletin.length === 0) {
      navigation.navigate('DetalheContratoBulletinServico', {
        BOCS_DT_INICIO: datas.item.BOCS_DT_INICIO,
        BOCS_DT_FIM: datas.item.BOCS_DT_FIM,
        BOCS_OBS: datas.item.BOCS_OBS,
        BOCS_DT_VENC: datas.item.BOCS_DT_VENC,
        ASS: datas.item.ASS,
        COCS_COD: datas.item.COCS_COD,
        BOCS_NUMERO: datas.item.BOCS_NUMERO,
        VALOR_TOTAL: valorTotal + '',
        BOCS_COD: datas.item.BOCS_COD,
        FORN_COD: datas.item.COCS_CERE_COD,
        CERE_COD: datas.item.COCS_CERE_COD,
        FORN_NOME: datas.item.FORN_NOME
      })
    } else {
      if (bgColor === '#FFFFFF') {
        setBgColor('#AAAAAA')
        setArrayContratoServicoBulletin((arrayContratoServicoBulletin: IarrayContratoServicoBulletin[]) => [...arrayContratoServicoBulletin, {
          cod,
          posAss: assPos,
          valor: valorTotal + '',
          cereCod,
          fornCod
        }])
      } else {
        setBgColor('#FFFFFF')
        setArrayContratoServicoBulletin(
          arrayContratoServicoBulletin.filter(
            (item) => {
              setBgColor('#FFFFFF')
              if (item.cod !== cod) {
                return true
              }
              return false
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
  return (
    <View>
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

        <View style={styles.cardTopTextArea}>

          <Text style={styles.cardTopTextLeft}>Codigo: {cod}</
          Text>
          <Text style={styles.cardTopTextRight}>{formatDate(dateInic)} {'\n'} {formatDate(dateFim)}</Text>

        </View>

        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Valor : </Text>
          <Text style={styles.cardTextBody}>{changeReal(valorTotal)}</Text>
        </View>

        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Data cadastro  : </Text>
          <Text style={styles.cardTextBody}>{formatDate(dateSignUp)}</Text>
        </View>
        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Data vencimento : </Text>
          <Text style={styles.cardTextBody}>{formatDate(dateVenc)} </Text>
        </View>
        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Descrição : </Text>
          <Text style={styles.cardTextBody}>{datas.item.BOCS_OBS}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPassword}
        onRequestClose={() => {
          setModalPassword(!modalPassword)
        }}
      >
        <ModalPasswordContratoServico
          func={() => {
            setModalPassword(!modalPassword)
            setBgState(!bgState)
          }}
        />
      </Modal>
    </View>
  )
}
