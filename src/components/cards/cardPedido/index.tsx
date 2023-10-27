import { TouchableOpacity, Text, View, Modal, BackHandler } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'

import ModalPassword from '../../modais/modalPassword'
import { AuthContext } from '../../../contexts/contextApi'
import Animated from 'react-native-reanimated'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import { useNavigation } from '@react-navigation/native'

interface props {
  datas: {
    item: {
      FORN_NOME: string;
      PEDI_DATA: string;
      PEDI_COD: string;
      ASS: string;
      VALOR_TOTAL_SERVICO: string;
      VALOR_TOTAL_ITEM: string;
      PEDI_FORN_COD: string;
      PEDI_NUMERO: string;
      EMPR_NOME: string;
    }
  },
}

interface IarrayPedido {
  ASS: string,
  pediCod: string,
  valTotal: string,
  fornCod: string,
  pediNumero: string
}

const CardPedido: React.FC<props> = ({ datas }: props) => {
  const navigation = useNavigation<FullNavigationProp>()
  const { arrayPedido, setArrayPedido, bgState, setAtt, att } = useContext(AuthContext)
  const [modalPassword, setModalPassword] = useState(false)
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const swipeableRef = useRef(null)

  const fornecedor = datas.item.FORN_NOME
  const date = new Date(datas.item.PEDI_DATA)
  const month = date.getMonth() + 1
  const cod = datas.item.PEDI_COD
  const assPos = datas.item.ASS
  let monthFormat: string | number
  let dates: string | number
  const valorTotal = datas.item.VALOR_TOTAL_SERVICO + datas.item.VALOR_TOTAL_ITEM
  useEffect(
    () => {
      setBgColor('#FFFFFF')
    }, [bgState]
  )

  const handleLongPress = () => {
    if (bgColor === '#FFFFFF') {
      setBgColor('#aaaaaa')

      setArrayPedido((arrayPedido: IarrayPedido[]) => [...arrayPedido, {
        ASS: datas.item.ASS,
        pediCod: datas.item.PEDI_COD,
        valTotal: valorTotal,
        fornCod: datas.item.PEDI_FORN_COD,
        pediNumero: datas.item.PEDI_NUMERO
      }])
      // posAss, pediCod, valTotal, fornCod, pediNumero
    } else {
      setArrayPedido(
        arrayPedido.filter(
          (item) => {
            return item[1] !== datas.item.PEDI_COD
          }
        )
      )
      setBgColor('#FFFFFF')
    }
  }

  month >= 10 ? monthFormat = month : monthFormat = '0' + month

  date.getDate() >= 10 ? dates = date.getDate() : dates = '0' + date.getDate()

  let fornecedorFormated: string

  fornecedor.length > 18 ? fornecedorFormated = fornecedor.slice(0, 18) + '...' : fornecedorFormated = fornecedor

  const handleClick = () => {
    if (arrayPedido.length === 0) {
      navigation.navigate('DetalhePedido', {
        FORN_NOME: datas.item.FORN_NOME,
        PEDI_DATA: datas.item.PEDI_DATA,
        PEDI_COD: datas.item.PEDI_COD,
        ASS: datas.item.ASS,
        VALOR_TOTAL_SERVICO: datas.item.VALOR_TOTAL_SERVICO,
        VALOR_TOTAL_ITEM: datas.item.VALOR_TOTAL_ITEM,
        PEDI_FORN_COD: datas.item.PEDI_FORN_COD,
        PEDI_NUMERO: datas.item.PEDI_NUMERO,
        EMPR_NOME: datas.item.EMPR_NOME
      })
    } else {
      if (bgColor === '#FFFFFF') {
        setBgColor('#aaaaaa')

        setArrayPedido((arrayPedido: IarrayPedido[]) => [...arrayPedido, {
          ASS: datas.item.ASS,
          pediCod: datas.item.PEDI_COD,
          valTotal: valorTotal,
          fornCod: datas.item.PEDI_FORN_COD,
          pediNumero: datas.item.PEDI_NUMERO
        }])
      } else {
        setArrayPedido(
          arrayPedido.filter(
            (item) => {
              if (item[0].pediCod !== datas.item.PEDI_COD) {
                return true
              }
              return false
            }
          )
        )
        setBgColor('#FFFFFF')
      }
    }
  }

  const backAction = () => {
    setArrayPedido([])
    setBgColor('#FFFFFF')
    navigation.goBack()
    return true
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
    <Animated.View>
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

          <Text style={styles.cardTopTextLeft}>{datas.item.PEDI_NUMERO}</
          Text>
          <Text style={styles.cardTopTextRight}>{dates + ' / ' + monthFormat + ' / ' + date.getFullYear()}</Text>

        </View>

        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Valor : </Text>
          <Text style={styles.cardTextBody}>{changeReal(Number(valorTotal))}</Text>
        </View>

        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Fornecedor : </Text>
          <Text style={styles.cardTextBody}>{fornecedorFormated}</Text>
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
        <ModalPassword
          func={() => {
            setModalPassword(!modalPassword)
            setBgColor('#fff')
            closeSwipeable()
          }}
          posAss={assPos}
          cod={cod}
          responseFunc={() => {
            setAtt(!att)
          }}
          fornCod={datas.item.PEDI_FORN_COD}
          valTotal={valorTotal}
          pediNumero={datas.item.PEDI_NUMERO}
        />
      </Modal>
    </Animated.View>
  )
}

export default CardPedido
