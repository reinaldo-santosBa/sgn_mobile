import { TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routes/fullScreen.routes'

interface props {
  datas: {
    item: {
      DEBITO: number,
      gaco_nome: string,
      CREDITO: number,
      SALDO: number,
      DATA: string,
    }
  }
}
const CardMovimentacao: React.FC<props> = ({ datas }: props) => {
  const date = new Date(datas.item.DATA)
  const month = date.getMonth() + 1
  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'MovDiariaDetalhe'
  >;

  const navigation = useNavigation<FullNavigationProp>()

  let monthFormat
  const dts: number | string = date.getDate() + 1
  let dates

  month >= 10 ? monthFormat = month : monthFormat = '0' + month

  dts >= 10 ? dates = date.getDate() + 1 : dates = '0' + (date.getDate() + 1)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('MovDiariaDetalhe', { data: datas.item.DATA })
      }}
    >
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View>
            <Text style={styles.debito}>Debito</Text>
            <Text style={styles.debito}>R$ {datas.item.DEBITO.toFixed(2)}</Text>
          </View>
          <View>
            <Text style={styles.credito}>Credito</Text>
            <Text style={styles.credito}>R$ {datas.item.CREDITO.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.data}>Data   </Text>
          <Text
            style={styles.data2}
          >
            {dates + ' / ' + monthFormat + ' / ' + date.getFullYear()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CardMovimentacao
