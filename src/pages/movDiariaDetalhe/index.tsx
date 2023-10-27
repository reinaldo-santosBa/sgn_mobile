import { Text, FlatList, ActivityIndicator, BackHandler, Modal } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import styles from './styles'
import { AuthContext } from '../../contexts/contextApi'
import CardMoviDetalhe from '../../components/cards/cardMoviDetalhe'
import axios from 'axios'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import MenuConainerGerencial from '../../components/menu/menuContainerGerencial'
import ModalAlert from '../../components/modais/modalAlert'

interface params {
  route: {
    params: {
      data: string;
    }
  }
}

const MovDiariaDetalhe: React.FC = ({ route }: params) => {
  const { refreshToken, url, version } = useContext(AuthContext)
  const [date, setDate] = useState('')
  const [dateFormat, setDateFormat] = useState('')
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)

  const dates = new Date(route.params.data)

  useEffect(() => {
    let data: string | number
    setDate(route.params.data)
    const datas: string | number = dates.getDate() + 1

    datas > 10 ? data = dates.getDate() + 1 : data = '0' + (dates.getDate() + 1)

    let month: string | number = dates.getMonth() + 1

    month + 1 < 10 ? month = '0' + (dates.getMonth() + 1) : month = (dates.getMonth() + 1)
    const dateTraco = dates.getFullYear() + '-' + month + '-' + data
    setDateFormat(data + ' / ' + month + ' / ' + dates.getFullYear())
    axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((json) => {
        const acessToken = json.data.acessToken
        axios.get(`${url}${version}/dailyMoviment/details/aplicacaoData/?date=${dateTraco}`,
          {
            headers: { Authorization: `Bearer ${acessToken}` }
          }
        )
          .then(
            (resp) => {
              setResponse(resp.data)
              setLoading(true)
            }
          )
          .catch(
            (error) => {
              setLoading(false)
              if (error.response) {
                alert(error.response.data)
              } else if (error.request) {
                alert(error.request.data)
              } else {
                alert(error)
              }
            }
          )
      })
      .catch(
        () => {
          setLoading(false)
          setModal(!modal)
        }
      )
  }, [date])

  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'MovDiariaDetalhe'
  >;

  const navigation = useNavigation<FullNavigationProp>()

  const backAction = () => {
    navigation.navigate('MovDiaria')
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <MenuConainerGerencial>
      <Text style={styles.text}>Resumo {dateFormat}</Text>
      {loading === false ? <ActivityIndicator /> : ''}
      <FlatList
        style={styles.flatList}
        renderItem={(item) => {
          return <CardMoviDetalhe datas={item} />
        }}
        data={response}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <ModalAlert
          message={['Sessão encerrada']}
          func={async () => {
            setModal(!modal)
            navigation.navigate('Login')
          }}
          error={true}
        />
      </Modal>
    </MenuConainerGerencial>
  )
}

export default MovDiariaDetalhe
