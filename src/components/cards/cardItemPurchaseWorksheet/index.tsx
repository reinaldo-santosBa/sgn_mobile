import { TouchableOpacity, Text, View, BackHandler } from 'react-native'
import React, { useState, useContext, useEffect, SetStateAction } from 'react'
import styles from './styles'

import { AuthContext } from '../../../contexts/contextApi'
import Animated from 'react-native-reanimated'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import { useNavigation } from '@react-navigation/native'

interface props {
  datas: {
    item: {
      PLAC_SECO_COD: string;
      PLAC_COD: string;
      PLAC_PESS_COD: string;
      PLAC_STATUS: string;
      ASS: string;
      SECO_DESC: string;
      PESS_NOME: string;
    }
  },
  responseFunc: React.Dispatch<SetStateAction<[]>>
}

const CardPurchaseWorksheet: React.FC<props> = ({ datas }: props) => {
  const navigation = useNavigation<FullNavigationProp>()
  const {
    arrayPurchaseWorksheet,
    setArrayPurchaseWorksheet,
    bgState
  } = useContext(AuthContext)

  const [bgColor, setBgColor] = useState('#FFFFFF')

  useEffect(
    () => {
      setBgColor('#FFFFFF')
    }, [bgState]
  )

  const handleClick = () => {
    if (arrayPurchaseWorksheet.length === 0) {
      navigation.navigate('DetailsPurchaseWorksheet', {
        PLAC_SECO_COD: datas.item.PLAC_SECO_COD,
        PLAC_COD: datas.item.PLAC_COD,
        PLAC_PESS_COD: datas.item.PLAC_PESS_COD,
        PLAC_STATUS: datas.item.PLAC_STATUS,
        ASS: datas.item.ASS,
        SECO_DESC: datas.item.SECO_DESC,
        PESS_NOME: datas.item.PESS_NOME
      })
    }
  }

  const backAction = () => {
    setArrayPurchaseWorksheet([])
    setBgColor('#FFFFFF')
    navigation.goBack()
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (
      <Animated.View>

        <TouchableOpacity
          style={[styles.card, {
            backgroundColor: `${bgColor}`
          }]}
          onPress={() => {
            handleClick()
          }}
        >

          <View style={styles.cardTopTextArea}>

            <Text style={styles.cardTopTextLeft}>
              CÓDIGO
            </Text>
            <Text style={styles.cardTopTextRight}>
              {datas.item.PLAC_COD}
            </Text>

          </View>

          <View style={styles.cardTextArea}>
            <Text style={styles.cardTextTitle}>Setor de compras : </Text>
            <Text style={styles.cardTextBody}>{datas.item.PLAC_SECO_COD} - {datas.item.SECO_DESC} </Text>
          </View>

          <View style={styles.cardTextArea}>
            <Text style={styles.cardTextTitle}>Funcionario : </Text>
            <Text style={styles.cardTextBody}>{datas.item.PESS_NOME}</Text>
          </View>

        </TouchableOpacity>

      </Animated.View>
  )
}

export default CardPurchaseWorksheet
