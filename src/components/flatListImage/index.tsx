import { View } from 'react-native'
import React from 'react'
import styles from './styles'

import ItemImage from './imgItem'
import SwiperFlatList from 'react-native-swiper-flatlist'

interface IRespondeBd {
  REEA_APLI_COD: number;
}
interface IRespondeBd2 {
  USAM_APLIC_COD: number;
}
interface Iprops {
  response: IRespondeBd[],
  response2: IRespondeBd2[],
}

const FlatListImage : React.FC<Iprops> = ({ response, response2 }) => {
  const data = [
    {
      id: 1,
      message: 'Movimentação diaria',
      path: require('../../assets/img/man-gc96628522_640.jpg'),
      page: 'MovDiaria',
      module: 1
    },
    {
      id: 2,
      message: 'Aprove pedidos',
      path: require('../../assets/img/movimentacao.jpg'),
      page: 'Pedidos',
      module: 8
    },
    {
      id: 3,
      message: 'Faça solicitações',
      path: require('../../assets/img/solicitacao.jpg'),
      page: 'SolicitacaoCompra',
      module: 8
    },
    {
      id: 4,
      message: 'Agenda',
      path: require('../../assets/img/agenda.png'),
      page: 'Agenda',
      module: 0
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
            renderItem={({ item }) => <ItemImage response={response} response2={response2} item={item} />}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}

        />

    </View>

  )
}

export default FlatListImage
