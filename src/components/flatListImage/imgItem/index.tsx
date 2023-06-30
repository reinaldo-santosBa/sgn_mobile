import { View, ImageBackground, Text, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native'
import React from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface IProps {
    item: {
        page: 'MovDiaria' | 'Pedidos' | 'Agenda' | 'SolicitacaoCompra';
        path: ImageSourcePropType;
        message: string;
    }
}

const itemImage = ({ item }: IProps) => {
  const screen = Dimensions.get('screen')

  const width = (screen.width / 100) * 80

    type FullNavigationProp = NativeStackNavigationProp<
        RootStackParamList,
        'MovDiaria'
    >;

    const navigation = useNavigation<FullNavigationProp>()

    return (
        <TouchableOpacity

            style={styles.containerImage}
            onPress={ async () => {
              navigation.navigate(item.page)
            }}

        >

            <ImageBackground

                source={item.path}
                style={[styles.image, { width }]}
                imageStyle={{ borderRadius: 30 }}

            >

                <View

                    style={styles.overlay}

                >

                </View>

                <Text

                    style={styles.text}

                >

                    {item.message}

                </Text>

            </ImageBackground>

        </TouchableOpacity>
    )
}

export default itemImage
