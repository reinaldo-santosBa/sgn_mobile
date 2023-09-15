import { View, ImageBackground, Text, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface IRespondeBd {
    REEA_APLI_COD: number;
}

interface IRespondeBd2 {
  USAM_APLIC_COD: number;
}

interface IProps {
    item: {
        page: 'MovDiaria' | 'Pedidos' | 'Agenda' | 'SolicitacaoCompra';
        path: ImageSourcePropType;
        message: string;
        module: number;
    };
    response: IRespondeBd[],
    response2: IRespondeBd2[]
}

const itemImage = ({ item, response, response2 }: IProps) => {
  const [disabled, setDisabled] = useState(true)
  const screen = Dimensions.get('screen')

  const width = (screen.width / 100) * 80

    type FullNavigationProp = NativeStackNavigationProp<
        RootStackParamList,
        'MovDiaria'
    >;

    const navigation = useNavigation<FullNavigationProp>()

    useEffect(() => {
      if (item.module === 0) {
        setDisabled(false)
      }
      response.forEach((element1: IRespondeBd) => {
        response2.forEach((element2: IRespondeBd2) => {
          if (Number(element1.REEA_APLI_COD) === item.module && Number(element2.USAM_APLIC_COD) === Number(element1.REEA_APLI_COD)) {
            setDisabled(false)
          }
        })
      })
    })

    return (
        <TouchableOpacity

            style={styles.containerImage}
            onPress={ async () => {
              if (disabled === true) {
                return ''
              }
              navigation.navigate(item.page)
            }}

        >

            <ImageBackground

                source={item.path}
                style={[styles.image, { width }]}
                imageStyle={{ borderRadius: 30 }}

            >

                <View

                    style={[styles.overlay, disabled ? { backgroundColor: '#00000099' } : { backgroundColor: '#00000044' }]}

                >

                </View>

                <Text

                    style={[styles.text, disabled ? { color: '#ffffff77' } : { color: '#fff' }]}

                >

                    {item.message}

                </Text>

            </ImageBackground>

        </TouchableOpacity>
    )
}

export default itemImage
