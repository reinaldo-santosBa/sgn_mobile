import { TouchableOpacity, Text, Image, ImageSourcePropType, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'

interface IRespondeBd {
  REEA_APLI_COD: number;
}

interface IRespondeBd2 {
  USAM_APLIC_COD: number;
}

interface Ibtn {
  image: ImageSourcePropType;
  text: string;
  onPress: ()=>void;
  number: number;
  response: IRespondeBd[];
  response2: IRespondeBd2[]
}

const MenuButton: React.FC<Ibtn> = ({ number, image, text, onPress, response, response2 }: Ibtn) => {
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    // response.forEach((element1: IRespondeBd) => {
    //   response2.forEach((element2: IRespondeBd2) => {
    //     if (Number(element1.REEA_APLI_COD) === number && Number(element2.USAM_APLIC_COD) === Number(element1.REEA_APLI_COD)) {
    //       setDisabled(false)
    //     }
    //   })
    // })
    response.forEach((element1: IRespondeBd) => {
      if (Number(element1.REEA_APLI_COD) === number) {
        setDisabled(false)
      }
    })
  })

  return (

    <TouchableOpacity style={styles.areaBtn}
      onPress={() => {
        if (disabled === true) {
          return ''
        }
        return onPress()
      }}
    >

      {disabled === true

        ? <View style={{
          backgroundColor: '#00000099',
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
