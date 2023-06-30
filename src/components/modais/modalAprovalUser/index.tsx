import { ActivityIndicator, FlatList, Modal } from 'react-native'
import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import * as S from './styles'
import { AuthContext } from '../../../contexts/contextApi'
import axios from 'axios'
import { ItemUserAproval } from './item/index'
import InputModal from '../../input/textInputModal'
import ModalAlert from '../modalAlert'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import { useNavigation } from '@react-navigation/native'
import BtnExit from '../../buttons/btnExit'

interface props {
  onChange: (value: string) => void
  value: string;
  modalChange: () => undefined;
  setAproval: React.Dispatch<SetStateAction<string>>
  approval1: string;
}

const ModalSelectAproval: React.FC<props> = ({ onChange, modalChange, setAproval, approval1 }) => {
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
              `${url}${version}/usuario/usuarioAprovSolic`,
              { headers: { Authorization: `Bearer ${acessToken}` } }
            )
              .then((resp) => {
                setLoading(true)
                const respAll = resp.data.listUserAprovSoliServiceExec.message
                const respAllFilter = respAll.filter(item => {
                  if (item.USUA_COD === parseInt(approval1)) {
                    return false
                  }
                  return true
                })
                setList(respAllFilter)
                setResponse(respAllFilter)
              })
              .catch((e) => {
                console.log(e)
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
          if (item.USUA_SIGLA.indexOf(textSearch) > -1) {
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
          placeholder={'Digite o nome do funcionario'}
          onChange={setTextSearch}
          value={textSearch}
        />
        <FlatList
          data={list}
          renderItem={(item) => {
            return (
              <ItemUserAproval
                onChange={onChange}
                nome={`${item.item.USUA_SIGLA}`}
                modalChange={modalChange}
                cod={`${item.item.USUA_COD}`}
                setAproval={setAproval}
              />
            )
          }}
        />
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
      </S.AreaContent>
    </S.ModalContainer>
  )
}

export default ModalSelectAproval
