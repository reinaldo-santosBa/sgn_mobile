import React from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import * as C from './styled'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface IContainer {
  children: React.ReactNode
}

export type FullNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Pedidos'
>;

const MenuConainerGerencial: React.FC<IContainer> = ({ children }) => {
  const widthScreen = Dimensions.get('screen').width

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

  const translateXMenu = useSharedValue(-widthScreen)
  const translateXBtnMenu = useSharedValue(20)
  const rotateHambuguerMenu1 = useSharedValue(0)
  const topHambuguerMenu1 = useSharedValue(0)
  const opacityHambuguerMenu2 = useSharedValue(1)
  const rotateHambuguerMenu3 = useSharedValue(0)
  const topHambuguerMenu3 = useSharedValue(0)

  const navigation = useNavigation<FullNavigationProp>()

  const animatedStylesMenu = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(translateXMenu.value, { duration: 500 })
        }
      ]
    }
  })

  const animatedStylesBtnMenu = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(translateXBtnMenu.value, { duration: 500 })
        }
      ]
    }
  })

  const animatedStylesHambuguerMenu2 = useAnimatedStyle(() => {
    return {
      opacity: opacityHambuguerMenu2.value
    }
  })

  const animatedStylesHambuguerMenu1 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotateHambuguerMenu1.value}deg`
        }
      ],
      top: topHambuguerMenu1.value
    }
  })

  const animatedStylesHambuguerMenu3 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotateHambuguerMenu3.value}deg`
        }
      ],
      top: topHambuguerMenu3.value
    }
  })

  const resetMenu = () => {
    if (translateXMenu.value !== 0) {
      topHambuguerMenu3.value = -8
      topHambuguerMenu1.value = 5
      translateXMenu.value = 0
      translateXBtnMenu.value = widthScreen - 80
      opacityHambuguerMenu2.value = 0
      rotateHambuguerMenu1.value = 45
      rotateHambuguerMenu3.value = -45
      return
    }
    translateXBtnMenu.value = 20
    opacityHambuguerMenu2.value = 1
    rotateHambuguerMenu1.value = 0
    rotateHambuguerMenu3.value = 0
    topHambuguerMenu1.value = 0
    topHambuguerMenu3.value = 0
    translateXMenu.value = -widthScreen
  }

  return (
    <View style={{ flex: 1, paddingTop: 60, backgroundColor: '#fff' }}>
      <AnimatedTouchable
        style={[
          {
            width: 40,
            height: 40,
            padding: 10,
            borderRadius: 5,
            elevation: 5,
            backgroundColor: '#3470A4',
            position: 'absolute',
            top: 30,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          },
          animatedStylesBtnMenu
        ]}
        onPress={() => {
          resetMenu()
        }}
      >
        <Animated.View
          style={[{
            height: 3,
            width: 30,
            backgroundColor: '#fff',
            borderRadius: 5

          }, animatedStylesHambuguerMenu1]}
        />
        <Animated.View
          style={[{
            height: 3,
            width: 30,
            backgroundColor: '#fff',
            borderRadius: 5
          },
          animatedStylesHambuguerMenu2
          ]}
        />
        <Animated.View
          style={[
            {
              height: 3,
              width: 30,
              backgroundColor: '#fff',
              borderRadius: 5
            },
            animatedStylesHambuguerMenu3
          ]}
        />
      </AnimatedTouchable>
      <Animated.View
        style={
          [
            {
              width: '100%',
              height: '110%',
              top: -20,
              left: -5,
              paddingTop: 50,
              position: 'absolute',
              zIndex: 100,
              backgroundColor: '#FFFFFF'
            },
            animatedStylesMenu
          ]
        }
      >

        <C.ImgMenu
          source={require('../../../assets/img/logo.png')}
          resizeMode='contain'
        />

        <C.BtnMenu>

          <C.TxtMenu
            onPress={
              () => {
                resetMenu()
                navigation.navigate('Gerencial')
              }
            }
          >
            Inicial
          </C.TxtMenu>

        </C.BtnMenu>

        <C.BtnMenu>

          <C.TxtMenu
            onPress={
              () => {
                resetMenu()
                navigation.navigate('MovDiaria')
              }
            }
          >
            Movimentação diaria
          </C.TxtMenu>

        </C.BtnMenu>

        <C.BtnMenu>

          <C.TxtMenu
            onPress={
              () => {
                resetMenu()
                navigation.navigate('DetalheCrMain')
              }
            }
          >
            Resumo de CR
          </C.TxtMenu>

        </C.BtnMenu>

        <C.BtnMenu>

          <C.TxtMenu
            onPress={
              () => {
                resetMenu()
                navigation.navigate('Home')
              }
            }
          >
            Sair do modulo
          </C.TxtMenu>

        </C.BtnMenu>

      </Animated.View>

      {children}

    </View>
  )
}

export default MenuConainerGerencial
