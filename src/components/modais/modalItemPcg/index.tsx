import { ActivityIndicator, FlatList, Modal } from 'react-native'
import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import * as S from './styles'
import { AuthContext } from '../../../contexts/contextApi'
import axios from 'axios'
import { ItemItemPlcg } from './item/index'
import InputModal from '../../input/textInputModal'
import BtnExit from '../../buttons/btnExit'
import ModalAlert from '../modalAlert'
import { useNavigation } from '@react-navigation/native'
import { FullNavigationProp } from '../../menu/menuContainerCompras'

interface props{
  onChange: (value: string)=>void
  value: string;
  modalChange: () => undefined;
  plgcCod: string;
  ticrCod: string;
  cereCod: string;
  setItemPlgcDesc: React.Dispatch<SetStateAction<string>>

}

const ModalSelectItemPcg: React.FC<props> = ({ onChange, modalChange, plgcCod, ticrCod, cereCod, setItemPlgcDesc }) => {
  const {
    url,
    version,
    refreshToken
  } = useContext(AuthContext)
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  const [list, setList] = useState([])
  const [modalAlert, setModalAlert] = useState(false)
  const navigation = useNavigation<FullNavigationProp>()

  useEffect(() => {
    (
      async () => {
        setLoading(false)
        await axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
          .then((json) => {
            const acessToken = json.data.acessToken
            axios.get(
              `${url}${version}/itemPcg/${plgcCod}/${ticrCod}/${cereCod}`,
              { headers: { Authorization: `Bearer ${acessToken}` } }
            )
              .then((resp) => {
                setLoading(true)
                setResponse(resp.data.message)
                setList(resp.data.message)
              })
              .catch(() => {
                setLoading(!loading)
                setModalAlert(!modalAlert)
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
          if (item.ITPC_DESC.indexOf(textSearch) > -1) {
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
      <BtnExit
        func={modalChange}
      />
      <S.AreaContent
        style={{ elevation: 5 }}
      >
        {
          !loading
            ? <ActivityIndicator color={'#000'} size={'large'} />
            : ''
        }
        <InputModal
          placeholder={'Digite o nome do almoxarifado'}
          onChange={setTextSearch}
          value={textSearch}
        />
        <FlatList
          data={list}
          renderItem={(item) => {
            return (
              <ItemItemPlcg
                onChange={onChange}
                nome={`${item.item.ITPC_SIGLA} - ${item.item.ITPC_DESC}`}
                modalChange={modalChange}
                cod={`${item.item.ITPC_COD}`}
                setItemPlgcDesc={setItemPlgcDesc}
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

export default ModalSelectItemPcg
