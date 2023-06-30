import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'

interface props {
  datas: {
    item: {
      BCSI_BOCS_COD: string;
      BCSI_QUANTIDADE: string;
      BCSI_SERV_COD: string;
      BCSI_VLR_UNIT: string;
      SERV_DESC: string;
      UNID: string;
    }
  }
}

export const CardItemServiceContractBulletin: React.FC<props> = ({ datas }: props) => {
  return (
    <View style={styles.card}>

      <View style={styles.cardTopTextArea}>
        <Text style={styles.title}>{datas.item.SERV_DESC}</Text>
      </View>

      <View style={styles.cardTextArea}>
        <View style={styles.cardTextAreaInternalRight}>
          <Text style={styles.cardTextTitle}>Valor: </Text>
          <Text style={styles.cardTextBody}>{changeReal(datas.item.BCSI_VLR_UNIT)}</Text>
        </View>
        <View style={styles.cardTextAreaInternalLeft}>
          <Text style={styles.cardTextTitle}>Quantidade: </Text>
          <Text style={styles.cardTextBody}>{datas.item.BCSI_QUANTIDADE}</Text>
        </View>
      </View>

      <View style={styles.cardTextAreaBaixo}>
        <Text style={styles.cardTextTitle}>Unidade: </Text>
        <Text style={styles.cardTextBody}>{datas.item.UNID}</Text>
      </View>

    </View>
  )
}
