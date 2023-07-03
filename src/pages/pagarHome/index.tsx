import React, { useEffect } from 'react'
import MenuConainer from '../../components/menu/menuContainerPagar'
import HomeModule from '../../components/homeModule'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { BackHandler } from 'react-native'

export type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PagarHome'
>;

const PagarHome: React.FC = () => {
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
          'O módulo de pagar.'
        }

        module={'pagar'}

      />

    </MenuConainer>

  )
}

export default PagarHome
