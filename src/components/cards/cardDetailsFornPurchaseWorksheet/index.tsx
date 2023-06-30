import { Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'

interface props {
  datas: {
    item: {
      CERE: string;
      COTA_CERE_COD: string;
      COTA_COD: string;
      COTA_DESCONTO: string;
      COTA_DTCOTACAO: string;
      COTA_FORMA_PAG: string;
      COTA_OBS: string;
      COTA_PRECO_TOTAL: string;
      COTA_PRECO_UNIT: string;
      COTA_QUANTIDADE: string;
      MATE_COD: string;
      MATE_DESC: string;
      UNMA_COD: string;
      UNMA_SIGLA: string;
    }
  }
}

const CardDetailsFornPurchaseWorksheet: React.FC<props> = ({ datas }: props) => {
  return (

    <View
      style={{ flex: 1, alignItems: 'center' }}
    >

      <View
        style={styles.card}
      >

        <View style={styles.cardTopTextArea}>

          <Text style={styles.cardTopTextLeft}>
            Código
          </Text>
          <Text style={styles.cardTopTextRight}>
            {datas.item.COTA_COD}
          </Text>

        </View>

        <View style={styles.cardTextArea}>

          <Text style={styles.cardTextTitle}>
            Valor total :
          </Text>

          <Text style={styles.cardTextBody}>
            {changeReal(datas.item.COTA_PRECO_TOTAL)}
          </Text>

        </View>

        <View style={styles.cardTextArea}>

          <Text style={styles.cardTextTitle}>
            Valor unitario :
          </Text>

          <Text style={styles.cardTextBody}>
            {changeReal(datas.item.COTA_PRECO_UNIT)}
          </Text>

        </View>

        <View style={styles.cardTextArea}>

          <Text style={styles.cardTextTitle}>
            Quantidade :
          </Text>

          <Text style={styles.cardTextBody}>
            {datas.item.COTA_QUANTIDADE}
          </Text>

        </View>

        <View style={styles.cardTextArea}>

          <Text style={styles.cardTextTitle}>
            Material / Serviço  :
          </Text>

        </View>

        <Text style={styles.cardTextBody}>
          {datas.item.MATE_DESC}
        </Text>

      </View>
    </View>
  )
}

export default CardDetailsFornPurchaseWorksheet
