import React, { useEffect } from 'react'
import MenuConainer from '../../components/menu/menuContainerCompras'
import HomeModule from '../../components/homeModule'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { BackHandler } from 'react-native'

export type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ComprasHome'
>;

const ComprasHome: React.FC = () => {
  const navigation = useNavigation<FullNavigationProp>()

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home')
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  })

  return (

    <MenuConainer>

      <HomeModule

        textModule={
          'O módulo de compras permite ao usuário realizar solicitação de compras, cotação de materiais pedidos de compras com possibilidade de entregas programadas. Fornece opções distintas de processar uma cotação, podendo inclusive ser enviada por e-mail para o fornecedor.'
        }

        module={'compras'}

      />

    </MenuConainer>

  )
}

export default ComprasHome
