import React, { useEffect } from 'react'
import MenuConainerGerencial from '../../components/menu/menuContainerGerencial'
import { BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import HomeModule from '../../components/homeModule'

const GerencialHome: React.FC = () => {
  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'MovDiaria'
  >;

  const navigation = useNavigation<FullNavigationProp>()

  const backAction = () => {
    navigation.navigate('Home')
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <MenuConainerGerencial>

      <HomeModule

        textModule={
          `O módulo de Controle Gerencial é fundamental para a efetiva utilização do SGN. Através dele, a empresa consegue formatar a sua estrutura gerencial compatível às suas necessidades, obtendo assim, diversas formas de visualização do negócio. As informações geradas pelo referido módulo permitem aos gestores efetuarem análises de resultados, que possibilitam identificar e diagnosticar problemas, para numa ação conjunta, direcionar as ações corretivas e/ou preventivas.
            `
        }

        module={'gerencial'}

      />

    </MenuConainerGerencial>
  )
}

export default GerencialHome
