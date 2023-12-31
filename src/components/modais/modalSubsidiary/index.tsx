import { ActivityIndicator, FlatList, Modal } from 'react-native'
import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import * as S from './styles'
import { AuthContext } from '../../../contexts/contextApi'
import axios from 'axios'
import { ItemSubsidiary } from './item/index'
import InputModal from '../../input/textInputModal'
import ModalAlert from '../modalAlert'
import { useNavigation } from '@react-navigation/native'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import BtnExit from '../../buttons/btnExit'

interface props {
  onChange: (value: string) => void
  value: string;
  modalChange: () => undefined;
  setSubsidiary: React.Dispatch<SetStateAction<string>>
}

const ModalSelectSubsidiary: React.FC<props> = ({ onChange, modalChange, setSubsidiary }) => {
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
              `${url}${version}/filial`,
              { headers: { Authorization: `Bearer ${acessToken}` } }
            )
              .then((resp) => {
                setLoading(true)
                setResponse(resp.data)
                setList(resp.data)
              })
              .catch((e) => {
                alert(e.response.data)
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
          const name = item.FILI_NOME_FANTASIA.toLowerCase()
          if (name.indexOf(textSearch.toLowerCase()) > -1) {
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
        <BtnExit
          func={modalChange}
        />
        {
          !loading
            ? <ActivityIndicator color={'#000'} size={'large'} />
            : ''
        }
        <InputModal
          placeholder={'Digite o nome da filial'}
          onChange={setTextSearch}
          value={textSearch}
        />
        <FlatList
          data={list}
          renderItem={(item) => {
            return (
              <ItemSubsidiary
                onChange={onChange}
                nome={`${item.item.FILI_NOME_FANTASIA}`}
                modalChange={modalChange}
                cod={`${item.item.FILI_COD}`}
                setSubsidiary={setSubsidiary}
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

export default ModalSelectSubsidiary
