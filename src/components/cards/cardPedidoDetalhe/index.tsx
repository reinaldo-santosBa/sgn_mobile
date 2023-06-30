import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'

interface props{
    datas: {
        item: {
            DESCRICAO: string;
            TIPO: string;
            VALOR_UNITARIO: string;
            DESCONTO: string;
            DESCRICAO_MEDIDA: string;
            QUANTIDADE: string;
            CR: string;
            ALMOXARIFADO: string;
        }
    }
}

const CardPedidoDetalhe : React.FC<props> = ({ datas } : props) => {
  return (
    <View style={styles.card}>

        <View style={styles.cardTopTextArea}>
            <Text style={styles.title}>{datas.item.DESCRICAO} - {datas.item.TIPO}</Text>
        </View>

        <View style={styles.cardTextArea}>
            <View style={styles.cardTextAreaInternalRight}>
                <Text style={styles.cardTextTitle}>Valor : </Text>
                <Text style={styles.cardTextBody}>{changeReal(datas.item.VALOR_UNITARIO)}</Text>
            </View>
            <View style={styles.cardTextAreaInternalLeft}>
                <Text style={styles.cardTextTitle}>Desconto : </Text>
                <Text style={styles.cardTextBody}>{changeReal(datas.item.DESCONTO)}</Text>
            </View>
        </View>

        <View style={styles.cardTextArea}>
            <View style={styles.cardTextAreaInternalRight}>
                <Text style={styles.cardTextTitle}>Unidade : </Text>
                <Text style={styles.cardTextBody}>{datas.item.DESCRICAO_MEDIDA}</Text>
            </View>
            <View style={styles.cardTextAreaInternalLeft}>
                <Text style={styles.cardTextTitle}>Quantidade : </Text>
                <Text style={styles.cardTextBody}>{datas.item.QUANTIDADE}</Text>
            </View>
        </View>

        <View style={styles.cardTextArea}>
            <View style={styles.cardTextAreaInternalRight}>
                <Text style={styles.cardTextTitle}>CR : </Text>
                <Text style={styles.cardTextBody}>{datas.item.CR}</Text>
            </View>
        </View>

        <View style={styles.cardTextArea}>
            <View style={styles.cardTextAreaInternalRight}>
                <Text style={styles.cardTextTitle}>Almoxarifado : </Text>
                <Text style={styles.cardTextBody}>{datas.item.ALMOXARIFADO}</Text>
            </View>

        </View>

    </View>
  )
}

export default CardPedidoDetalhe
