import { View } from 'react-native'
import React from 'react'
import styles from './styles'
import LottieView from 'lottie-react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

interface SplashScreenProprs {
  navigation: NavigationProp<ParamListBase>
}

const SplashScreen: React.FC<SplashScreenProprs> = ({ navigation }: SplashScreenProprs) => {
  const duration = 2000

  const goLogin = () => {
    navigation.navigate('Login' as never)
  }

  return (

    <View style={styles.container}>

      <View

        style={[styles.animationContainer]}

      >

        <LottieView

          autoPlay
          style={ styles.LottieView }
          loop={false}
          duration={duration}
          source={require('../../assets/animations/lf30_editor_k7c1ynli.json')}
          onAnimationFinish={
            () => {
              goLogin()
            }
          }

        />

      </View>

    </View>

  )
}

export default SplashScreen
