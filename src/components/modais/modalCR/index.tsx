import { ActivityIndicator, FlatList, Modal } from 'react-native'
import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import * as S from './styles'
import { AuthContext } from '../../../contexts/contextApi'
import axios from 'axios'
import { ItemCr } from './item/index'
import InputModal from '../../input/textInputModal'
import BtnExit from '../../buttons/btnExit'
import ModalAlert from '../modalAlert'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import { useNavigation } from '@react-navigation/native'

interface props{
  onChange: (value: string)=>void
  value: string;
  modalChange: () => undefined;
  setCereDesc: React.Dispatch<SetStateAction<string>>
  almoCod: string;
  setPlgcCod: React.Dispatch<SetStateAction<string>>
  setTircCod: React.Dispatch<SetStateAction<string>>
}

const ModalSelectCr: React.FC<props> = ({ onChange, modalChange, setCereDesc, almoCod, setPlgcCod, setTircCod }) => {
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
        setLoading(!loading)
        await axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
          .then((json) => {
            const acessToken = json.data.acessToken
            axios.get(
              `${url}${version}/cr/${almoCod}`,
              { headers: { Authorization: `Bearer ${acessToken}` } }
            )
              .then((resp) => {
                setLoading(!loading)
                setResponse(resp.data.message)
                setList(resp.data.message)
              })
              .catch(() => {
                setLoading(!loading)
                setModalAlert(!modalAlert)
              })
          })
          .catch(() => {
            setLoading(!loading)
            setModalAlert(!modalAlert)
          })
      }
    )()
  }, [])

  useEffect(() => {
    if (textSearch !== '') {
      setList(
        response.filter(item => {
          if (item.CERE_NOME.indexOf(textSearch) > -1) {
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
              <ItemCr
                onChange={onChange}
                nome={`${item.item.CERE_SIGLA} - ${item.item.CERE_NOME}`}
                modalChange={modalChange}
                cod={`${item.item.CERE_COD}`}
                plgcCod={`${item.item.CERE_PLCG_COD}`}
                tircCod={`${item.item.CERE_TICR_COD}`}
                setCereDesc={setCereDesc}
                setPlgcCod={setPlgcCod}
                setTircCod={setTircCod}
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
