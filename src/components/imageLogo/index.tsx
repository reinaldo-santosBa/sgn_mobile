import { View, Image } from 'react-native'
import React from 'react'
import styles from './styles'

const ImageLogo : React.FC = () => {
  return (
    <View

        style={styles.areaImage}

    >

        <Image

            source={require('../../assets/img/logo.png')}
            style={styles.image}
            resizeMode='contain'

        />

    </View>

  )
}

export default ImageLogo
