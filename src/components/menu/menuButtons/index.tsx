import { TouchableOpacity, Text, Image, View, ImageSourcePropType } from 'react-native'
import React from 'react'
import styles from './styles'

interface Ibtn {
  image: ImageSourcePropType;
  text: string;
  onPress: ()=>void;
  disabled: boolean;
}

const MenuButton: React.FC<Ibtn> = ({ image, text, onPress, disabled }: Ibtn) => {
  return (
    <TouchableOpacity style={styles.areaBtn}
      onPress={() => {
        onPress()
      }}
    >

      {disabled === true

        ? <View style={{
          backgroundColor: '#12121255',
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 1000,
          borderRadius: 10,
          padding: 0
        }}>
      </View>
        : ''
      }
      <Image

        source={image}

        style={styles.img}

      />

      <Text

        style={styles.text}

      >

        {text}

      </Text>

    </TouchableOpacity>
  )
}

export default MenuButton
