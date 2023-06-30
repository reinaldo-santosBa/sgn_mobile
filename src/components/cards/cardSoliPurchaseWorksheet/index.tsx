import { Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import Animated from 'react-native-reanimated'
import { transformData } from '../../../utils/transformData'

interface props {
  datas: {
    item: {
      SOCO_COD: string;
      MATE_COD: string;
      MATE_DESC: string;
      ALMO_COD: string;
      ALMO_DESC: string;
      SOCO_DTNECE: string;
      SOCO_QTD_NECE: string;
      UNMA_SIGLA: string;
      UNMA_COD: string;
      SOCO_OBS: string;
      MATE_REFERENCIA: string;
      PESS_COD: string;
      PESS_NOME: string;
      SOCO_PLAC_OBS: string;
      SOCO_DTPRAZORESP: string;
      CERE_COD: string;
      CERE: string;
      ITPC: string;
      ITPC_COD: string;
      MATE_OBS: string;
      FORN_NOME: string;
      TIPO: string;
    }
  },
}

const CardSoliPurchaseWorksheet: React.FC<props> = ({ datas }: props) => {
  const dateNeceFormatedBr = transformData(datas.item.SOCO_DTNECE)

  const datePrazoFormatedBr = transformData(datas.item.SOCO_DTPRAZORESP)

  const almoxarifado = datas.item.ALMO_COD + ' - ' + datas.item.ALMO_DESC

  const cere = datas.item.CERE

  const itemPcg = datas.item.ITPC

  let almoxarifadoFormart: string

  let cereFormated: string

  let itemPcgFormated: string

  almoxarifado.length > 20
    ? almoxarifadoFormart = almoxarifado.slice(0, 20)
    : almoxarifadoFormart = almoxarifado

  cere.length > 17
    ? cereFormated = cere.slice(0, 17) + '...'
    : cereFormated = cere

  itemPcg.length > 20
    ? itemPcgFormated = itemPcg.slice(0, 20) + '...'
    : itemPcgFormated = itemPcg
  return (
    <Animated.View>
      <View
        style={[styles.card, {
          backgroundColor: '#FFF'
        }]}
      >

        <View style={styles.cardTopTextArea}>

          <Text style={styles.cardTopTextLeft}>
            Código
          </Text>
          <Text style={styles.cardTopTextRight}>
            {datas.item.SOCO_COD}
          </Text>

        </View>

        <View style={styles.cardTextArea}>

          <Text style={styles.cardTextTitle}>
            Quantidade :
          </Text>

          <Text style={styles.cardTextBody}>
            {datas.item.SOCO_QTD_NECE}
          </Text>

        </View>

        <View style={styles.cardTextArea}>

          <Text style={styles.cardTextTitle}>
            Almoxarifado :
          </Text>

          <Text style={styles.cardTextBody}>
            {almoxarifadoFormart}
          </Text>

        </View>

        <View style={styles.cardTextArea}>

          <Text style={styles.cardTextTitle}>
            CR :
          </Text>
          <Text style={styles.cardTextBody}>
            {cereFormated}
          </Text>
        </View>

        <View style={styles.cardTextArea}>

          <Text style={styles.cardTextTitle}>
            Item PCG :
          </Text>

          <Text style={styles.cardTextBody}>
            {itemPcgFormated}
          </Text>

        </View>

        <View style={styles.cardTextArea}>

          <Text style={styles.cardTextTitle}>
            Data necessaria :
          </Text>

          <Text style={styles.cardTextBody}>
            {dateNeceFormatedBr}
          </Text>

        </View>

        <View style={styles.cardTextArea}>

          <Text style={styles.cardTextTitle}>
            Data prazo :
          </Text>

          <Text style={styles.cardTextBody}>
            {datePrazoFormatedBr}
          </Text>

        </View>

      </View>
    </Animated.View>
  )
}

export default CardSoliPurchaseWorksheet
