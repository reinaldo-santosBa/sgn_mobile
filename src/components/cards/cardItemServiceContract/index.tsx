import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'

interface props{
  datas: {
    item: {
      SERV_DESC: string;
      ICCS_VLR_UNIT: string;
      DESCONTO: string;
      UNMA_SIGLA: string;
      ICCS_QUANTIDADE: string;
      ETAPA_PROJETO: string;
      PROJETO: string;
      SERVICOS_FINS_ESPECIFICOS: string;
    }
  }
}

export const CardItemServiceContract: React.FC<props> = ({ datas }: props) => {
  return (
    <View style={styles.card}>

        <View style={styles.cardTopTextArea}>
              <Text style={styles.title}>{datas.item.SERV_DESC}</Text>
        </View>

        <View style={styles.cardTextArea}>
            <View style={styles.cardTextAreaInternalRight}>
                <Text style={styles.cardTextTitle}>Valor: </Text>
                  <Text style={styles.cardTextBody}>{changeReal(datas.item.ICCS_VLR_UNIT)}</Text>
            </View>
            <View style={styles.cardTextAreaInternalLeft}>
                <Text style={styles.cardTextTitle}>Desconto: </Text>
                <Text style={styles.cardTextBody}>{changeReal(datas.item.DESCONTO)}</Text>
            </View>
        </View>

        <View style={styles.cardTextArea}>
            <View style={styles.cardTextAreaInternalRight}>
                <Text style={styles.cardTextTitle}>Unidade: </Text>
                  <Text style={styles.cardTextBody}>{datas.item.UNMA_SIGLA}</Text>
            </View>
            <View style={styles.cardTextAreaInternalLeft}>
                <Text style={styles.cardTextTitle}>Quantidade: </Text>
                <Text style={styles.cardTextBody}>{datas.item.ICCS_QUANTIDADE}</Text>
            </View>
        </View>
        {datas.item.PROJETO != null
          ? <View style={styles.cardTextArea}>
                <View style={styles.cardTextAreaInternalRight}>
                    <Text style={styles.cardTextTitle}>Projeto: </Text>
                    <Text style={styles.cardTextBody}>{datas.item.PROJETO}</Text>
                </View>
            </View>
          : ''
        }
        {datas.item.ETAPA_PROJETO != null
          ? <View style={styles.cardTextArea}>
                <View style={styles.cardTextAreaInternalRight}>
                    <Text style={styles.cardTextTitle}>Etapa projeto: </Text>
                    <Text style={styles.cardTextBody}>{datas.item.ETAPA_PROJETO}</Text>
                </View>
            </View>
          : ''
        }
        {datas.item.DESCONTO != null
          ? <View style={styles.cardTextArea}>
                <View style={styles.cardTextAreaInternalRight}>
                    <Text style={styles.cardTextTitle}>Desconto: </Text>
                    <Text style={styles.cardTextBody}>{datas.item.DESCONTO}</Text>
                </View>
            </View>
          : ''
        }
        {datas.item.SERVICOS_FINS_ESPECIFICOS != null
          ? <View style={styles.cardTextArea}>
                <View style={styles.cardTextAreaInternalRight}>
                    <Text style={styles.cardTextTitle}>Serviços fins especificos: </Text>
                    <Text style={styles.cardTextBody}>{datas.item.SERVICOS_FINS_ESPECIFICOS}</Text>
                </View>
            </View>
          : ''
        }

    </View>
  )
}
