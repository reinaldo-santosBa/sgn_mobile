import { FlatList, Modal, ActivityIndicator, BackHandler, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../services/axios'
import { AuthContext } from '../../contexts/contextApi'
import ModalAlert from '../../components/modais/modalAlert'
import { FullNavigationProp } from '../comprasHome'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/container'
import CardDetailsFornPurchaseWorksheet from '../../components/cards/cardDetailsFornPurchaseWorksheet'
import BtnBack from '../../components/buttons/btnBack'

interface params {
  route: {
    key: string;
    name: string;
    params: {
      PLAF_FORN_COD: string;
      PLAC_COD: string;
    },
    path: undefined
  }
}

const PriceDetailsPurchaseWorksheet: React.FC<params> = ({ route }) => {
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const navigation = useNavigation<FullNavigationProp>()

  const {
    refreshToken
  } = useContext(AuthContext)

  useEffect(() => {
    (
      async () => {
        setLoading(!loading)
        api.get('usuario/acessToken', { headers: { Authorization: `Bearer ${refreshToken}` } })
          .then((json) => {
            const acessToken = json.data.acessToken
            api.get(`planilhaDeCompra/cotacao/${route.params.PLAC_COD}/${route.params.PLAF_FORN_COD}`, { headers: { Authorization: `Bearer ${acessToken}` } })
              .then((response) => {
                setResponse(response.data.message)
                setLoading(true)
              })
              .catch(
                (error) => {
                  setLoading(false)
                  if (error.response) {
                    alert(error.response.data.message)
                  } else if (error.request) {
                    alert(error.request.data.message)
                  } else {
                    alert(error.data.message)
                  }
                }

              )
          })
          .catch(
            () => {
              setLoading(!loading)
              setModal(!modal)
            }
          )
      }
    )()
  }, [])

  const backAction = () => {
    navigation.goBack()
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (

    <Container>
      {loading === false
        ? <ActivityIndicator size={'large'}
          style={{ position: 'absolute' }}
        />
        : ''

      }
      <BtnBack
        func={
          () => {
            navigation.goBack()
          }
        }
      />
      {
        response.length > 0 && loading === true
          ? <FlatList
          style={{ width: '100%' }}
          renderItem={(item) => {
            return (
              <CardDetailsFornPurchaseWorksheet datas={item} />
            )
          }}
          data={response}
          />
          : <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Sem dados para serem exibidos</Text>
      }

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

    </Container>
  )
}

export default PriceDetailsPurchaseWorksheet
