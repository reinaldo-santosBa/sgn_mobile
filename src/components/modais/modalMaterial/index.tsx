import { ActivityIndicator, FlatList, Modal } from 'react-native'
import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import * as S from './styles'
import { AuthContext } from '../../../contexts/contextApi'
import axios from 'axios'
import { ItemMaterial } from './item/index'
import InputModal from '../../input/textInputModal'
import ModalAlert from '../modalAlert'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import { useNavigation } from '@react-navigation/native'

interface props{
  onChange: (value: string)=>void
  value: string;
  modalChange: () => undefined;
  setmateDesc: React.Dispatch<SetStateAction<string>>;
  servProd: string;
  setUnmaNome: React.Dispatch<SetStateAction<string>>;
  setUnmaCod: React.Dispatch<SetStateAction<string>>
}

const ModalSelectMaterial: React.FC<props> = ({ onChange, modalChange, setmateDesc, servProd, setUnmaNome, setUnmaCod }) => {
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
        if (servProd === 'Produto') {
          await axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
            .then((json) => {
              const acessToken = json.data.acessToken
              axios.get(
                `${url}${version}/material`,
                { headers: { Authorization: `Bearer ${acessToken}` } }
              )
                .then((resp) => {
                  console.log('====================================')
                  console.log(resp.data.message[0])
                  console.log('====================================')
                  setLoading(true)
                  setResponse(resp.data.message)
                  setList(resp.data.message)
                })
                .catch((e) => {
                  console.log(e.response.data)
                })
            })
            .catch(() => {
              setLoading(false)
              setModalAlert(!modalAlert)
            })
        } else {
          await axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
            .then((json) => {
              const acessToken = json.data.acessToken
              axios.get(
                `${url}${version}/servicos`,
                { headers: { Authorization: `Bearer ${acessToken}` } }
              )
                .then((resp) => {
                  console.log('====================================')
                  console.log(resp.data.message)
                  console.log('====================================')
                  setLoading(true)
                  setResponse(resp.data.message)
                  setList(resp.data.message)
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
      }
    )()
  }, [])

  useEffect(() => {
    if (textSearch !== '') {
      setList(
        response.filter(item => {
          if (item.MATE_DESC.indexOf(textSearch) > -1) {
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
          placeholder={'Digite o nome do produto'}
          onChange={setTextSearch}
          value={textSearch}
        />
        <FlatList
          data={list}
          renderItem={(item) => {
            return (
              <ItemMaterial
                onChange={onChange}
                nome={`${item.item.MATE_DESC}`}
                modalChange={modalChange}
                cod={`${item.item.MATE_COD}`}
                setmateDesc={setmateDesc}
                setUnmaNome={setUnmaNome}
                unmaNome={`${item.item.UNMA_SIGLA} - ${item.item.UNMA_DESC}`}
                setUnmaCod={setUnmaCod}
                unmaCod={item.item.MATE_UNMA_COD}
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

export default ModalSelectMaterial
