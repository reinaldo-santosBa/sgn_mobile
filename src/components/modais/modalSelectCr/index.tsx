import { ActivityIndicator, FlatList, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as S from './styles'
import { AuthContext } from '../../../contexts/contextApi'
import axios from 'axios'
import ItemSelectCr from './item'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import { useNavigation } from '@react-navigation/native'
import ModalAlert from '../modalAlert'
import InputModal from '../../input/textInputModal'

interface props{
  setNomePlgcCod: (text: string, plgcCod: string, codCr: string) => undefined;
  modalChange: () => undefined;
}

const ModalSelectCr: React.FC<props> = ({ setNomePlgcCod, modalChange }) => {
  const {
    url,
    version,
    refreshToken
  } = useContext(AuthContext)
  const [response, setResponse] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  const navigation = useNavigation<FullNavigationProp>()
  useEffect(() => {
    (
      async () => {
        setLoading(false)
        await axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
          .then((json) => {
            const acessToken = json.data.acessToken
            axios.get(
              `${url}${version}/cr`,
              { headers: { Authorization: `Bearer ${acessToken}` } }
            )
              .then((resp) => {
                setLoading(true)
                setResponse(resp.data)
                setList(resp.data)
              })
              .catch((e) => {
                console.log(e.response.data)
              })
          })
          .catch(() => {
            setLoading(false)
            setModalAlert(!modalAlert)
          })
      }
    )()
  }, [])

  useEffect(() => {
    if (textSearch !== '') {
      setList(
        response.filter(item => {
          const nome = item.CERE_NOME.toLowerCase()
          if (nome.indexOf(textSearch.toLowerCase()) > -1) {
            return true
          }
          return false
        })
      )
    } else {
      setList(response)
    }
  }, [textSearch])

  return (
    <S.ModalContainer>
      <S.AreaContent
        style={{ elevation: 5 }}
      >
        {
          !loading
            ? <ActivityIndicator color={'#000'} size={'large'} />
            : ''
        }
        <InputModal
          placeholder={'Digite o CR'}
          onChange={setTextSearch}
          value={textSearch}
        />
        <FlatList
          data={list}
          renderItem={(item) => {
            return (
              <ItemSelectCr
                setNomePlgcCod={setNomePlgcCod}
                nome={`${item.item.CERE_SIGLA} - ${item.item.CERE_NOME}`}
                modalChange={modalChange}
                plgcCod={item.item.CERE_PLCG_COD}
                cereCod={ item.item.CERE_COD}
              />
            )
          }}
        />
      </S.AreaContent>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlert}
      >
        <ModalAlert
          message={['Sessão encerrada']}
          func={async () => {
            setModalAlert(!modalAlert)
            navigation.navigate('Login')
          }}
          error={true}
        />
      </Modal>
    </S.ModalContainer>
  )
}

export default ModalSelectCr
