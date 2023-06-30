/* eslint-disable @typescript-eslint/no-explicit-any */
import { BackHandler, Modal, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../../components/buttons/buttonConfAction'
import { useNavigation } from '@react-navigation/native'
import HeaderPurchaseOrder from '../../components/headers/headerSolicitacaoCompra'
import ModalPasswordSoliCompra from '../../components/modais/modalPasswordSoliCompra'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/fullScreen.routes'

type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetalheSolicitacao'
  >;

const DetalheSolicitacaoCompra: React.FC = ({ route }: any) => {
  const { dados } = route.params
  const ass = dados.ASS
  const [modalPassword, setModalPassword] = useState(false)

  const navigation = useNavigation<FullNavigationProp>()
  const backAction = () => {
    navigation.navigate('SolicitacaoCompra')
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <View
      style={{ height: '100%', backgroundColor: '#FFF' }}
    >
      <Button
        functionOnpress={() => {
          setModalPassword(!modalPassword)
        }}

        textButton={'Aprovar solicitação '}
      />
      <HeaderPurchaseOrder
        datas={dados}
      />
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
          } }
          posAss={ass}
          cod={dados.SOCO_COD}
          valor={dados.valor_total}
        />
      </Modal>
    </View>
  )
}

export default DetalheSolicitacaoCompra
