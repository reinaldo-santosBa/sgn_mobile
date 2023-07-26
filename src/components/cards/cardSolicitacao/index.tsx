/* eslint-disable @typescript-eslint/no-explicit-any */
import { TouchableOpacity, Text, View, BackHandler, Modal } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { AuthContext } from '../../../contexts/contextApi'
import ModalPasswordSoliCompra from '../../modais/modalPasswordSoliCompra'

interface props {
  datas: any;
  navigation: any;
}

interface IarraySoco {
  valorTotal: string,
  pos: string,
  socoCod: string,
}

export const CardSoliCompra: React.FC<props> = ({ datas, navigation }: props) => {
  const { bgState, setArraySoliCompra, arraySoliCompra } = useContext(AuthContext)
  const [modalPassword, setModalPassword] = useState(false)
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const swipeableRef = useRef(null)

  const ass = datas.item.ASS
  const cr = datas.item.CERE_NOME
  const date = new Date(datas.item.SOCO_DTSOLI)
  const month = date.getMonth() + 1

  let monthFormat
  let dates

  useEffect(
    () => {
      setBgColor('#FFFFFF')
    }, [bgState]
  )

  month >= 10 ? monthFormat = month : monthFormat = '0' + month

  date.getDate() >= 10 ? dates = date.getDate() : dates = '0' + date.getDate()

  let crFormated

  cr.length > 18 ? crFormated = cr.slice(0, 18) + '...' : crFormated = cr

  const valorTotal = datas.item.valor_total

  const handleLeft = () => {
    setModalPassword(!modalPassword)
  }

  const backAction = () => {
    setBgColor('#FFFFFF')
    navigation.goBack()
    return true
  }
  useEffect(
    () => {
      setBgColor('#FFFFFF')
    }, [bgState]
  )
  const handleLongClick = () => {
    if (bgColor === '#FFFFFF') {
      setBgColor('#aaaaaa')
      // setArraySoliCompra(
      //   (arraySoliCompra: IarraySoco[]) =>
      //     [...arraySoliCompra, [datas.item.SOCO_COD, ass, datas.item.SOCO_NUMERO, valorTotal]])
      setArraySoliCompra((arraySoliCompra: IarraySoco[]) => [...arraySoliCompra, {
        socoCod: datas.item.SOCO_COD,
        pos: ass,
        valorTotal
      }])
    } else {
      setArraySoliCompra(
        arraySoliCompra.filter(
          (item) => {
            return item.socoCod !== datas.item.SOCO_COD
          }
        )
      )
      setBgColor('#FFFFFF')
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  const leftAction = () => {
    return (
      <View
        style={styles.buttonAprovar}
      >

        <Text
          style={[styles.textBtn]}
        >

          Solicitação aprovada

        </Text>

      </View>
    )
  }

  const handleClick = () => {
    if (arraySoliCompra.length === 0) {
      navigation.navigate('DetalheSolicitacao', { dados: datas.item })
    } else {
      if (bgColor === '#FFFFFF') {
        setBgColor('#aaaaaa')
        setArraySoliCompra((arraySoliCompra: IarraySoco[]) => [...arraySoliCompra, {
          socoCod: datas.item.SOCO_COD,
          pos: ass,
          valorTotal
        }])
      } else {
        setArraySoliCompra(
          arraySoliCompra.filter(
            (item) => {
              return item.socoCod !== datas.item.SOCO_COD
            }
          )
        )
        setBgColor('#FFFFFF')
      }
    }
  }
  const closeSwipeable = () => {
    swipeableRef.current.close()
  }

  return (

    <Swipeable
      ref={swipeableRef}
      renderLeftActions={leftAction}
      onSwipeableLeftOpen={handleLeft}

    >
      <TouchableOpacity

        style={[styles.card, {
          backgroundColor: `${bgColor}`
        }]}
        onPress={() => {
          handleClick()
        }}
        onLongPress={
          () => {
            handleLongClick()
          }
        }
      >

        <View style={styles.cardTopTextArea}>

          <Text style={styles.cardTopTextLeft}>{datas.item.SOCO_NUMERO}</
          Text>
          <Text style={styles.cardTopTextRight}>{dates + ' / ' + monthFormat + ' / ' + date.getFullYear()}</Text>

        </View>

        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Valor : </Text>
          <Text style={styles.cardTextBody}>{changeReal(valorTotal)}</Text>
        </View>

        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>CR : </Text>
          <Text style={styles.cardTextBody}>{crFormated}</Text>
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
        <ModalPasswordSoliCompra
          func={() => {
            setModalPassword(!modalPassword)
            closeSwipeable()
          }}
          posAss={ass}
          cod={datas.item.SOCO_COD}
          valor={datas.item.valor_total}
        />
      </Modal>
    </Swipeable>
  )
}
