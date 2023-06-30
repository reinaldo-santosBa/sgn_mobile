import { ActivityIndicator, FlatList, Modal } from 'react-native'
import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import * as S from './styles'
import { AuthContext } from '../../../contexts/contextApi'
import axios from 'axios'
import { ItemSelectPurchaseOrder } from './item/index'
import InputModal from '../../input/textInputModal'
import BtnExit from '../../buttons/btnExit'
import { useNavigation } from '@react-navigation/native'
import { FullNavigationProp } from '../../menu/menuContainerCompras'
import ModalAlert from '../modalAlert'

interface props{
  onChange: (value: string)=>void
  value: string;
  modalChange: () => undefined;
  setSetoDesc: React.Dispatch<SetStateAction<string>>
}

const ModalSelectPurchaseSector: React.FC<props> = ({ onChange, modalChange, setSetoDesc }) => {
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
              `${url}${version}/setorCompra`,
              { headers: { Authorization: `Bearer ${acessToken}` } }
            )
              .then((resp) => {
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
    )()
  }, [])

  useEffect(() => {
    if (textSearch !== '') {
      setList(
        response.filter(item => {
          if (item.SECO_DESC.indexOf(textSearch) > -1) {
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
          placeholder={'Digite o setor de compras'}
          onChange={setTextSearch}
          value={textSearch}
        />
        <FlatList
          data={list}
          renderItem={(item) => {
            return (
              <ItemSelectPurchaseOrder
                onChange={onChange}
                nome={`${item.item.SECO_DESC}`}
                modalChange={modalChange}
                cod={`${item.item.SECO_COD}`}
                setSetoDesc={setSetoDesc}
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

export default ModalSelectPurchaseSector
