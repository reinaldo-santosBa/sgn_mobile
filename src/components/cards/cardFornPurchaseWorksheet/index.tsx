import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'
import Animated from 'react-native-reanimated'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import { useNavigation } from '@react-navigation/native'

interface props {
  datas: {
    item: {
      FORN_NOME: string;
      PLAC_COD: string;
      PLAF_FORN_COD: string;
    }
  },
}

const CardFornPurchaseWorksheet: React.FC<props> = ({ datas }: props) => {
  const navigation = useNavigation<FullNavigationProp>()
  let fornecedorFormated: string

  datas.item.FORN_NOME.length > 20
    ? fornecedorFormated = datas.item.FORN_NOME.slice(0, 20)
    : fornecedorFormated = datas.item.FORN_NOME

  const handleClick = () => {
    navigation.navigate('PriceDetailsPurchaseWorksheet', {
      PLAF_FORN_COD: datas.item.PLAF_FORN_COD,
      PLAC_COD: datas.item.PLAC_COD
    })
  }

  return (
    <Animated.View>
      <TouchableOpacity
        style={[styles.card, {
          backgroundColor: '#FFF'
        }]}
        onPress={() => {
          handleClick()
        }}
      >

        <View style={styles.cardTopTextArea}>

          <Text style={styles.cardTopTextLeft}>
            Código
          </Text>
          <Text style={styles.cardTopTextRight}>
            {datas.item.PLAF_FORN_COD}
          </Text>

        </View>

        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Fornecedor : </Text>
          <Text style={styles.cardTextBody}>{fornecedorFormated}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default CardFornPurchaseWorksheet
