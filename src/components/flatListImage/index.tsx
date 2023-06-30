/* eslint-disable import/no-absolute-path */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, ListRenderItemInfo } from 'react-native'
import React from 'react'
import styles from './styles'

import ItemImage from './imgItem'
import SwiperFlatList from 'react-native-swiper-flatlist'

const FlatListImage : React.FC = ({ navigation }:any) => {
  const data = [
    {
      id: 1,
      message: 'Movimentação diaria',
      path: require('../../assets/img/man-gc96628522_640.jpg'),
      page: 'MovDiaria'
    },
    {
      id: 2,
      message: 'Aprove pedidos',
      path: require('../../assets/img/movimentacao.jpg'),
      page: 'Pedidos'
    },
    {
      id: 3,
      message: 'Faça solicitações',
      path: require('../../assets/img/solicitacao.jpg'),
      page: 'SolicitacaoCompra'
    },
    {
      id: 4,
      message: 'Agenda',
      path: require('../../assets/img/agenda.png'),
      page: 'Agenda'
    }

  ]

  return (

    <View

        style={styles.container}

    >

        <SwiperFlatList

            autoplay
            autoplayLoop
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => <ItemImage item={item} />}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}

        />

    </View>

  )
}

export default FlatListImage
