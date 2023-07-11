import React, { useState } from 'react'
import MenuContainer from '../../components/menu/menuContainerCompras'
import Container from '../../components/container'
import * as S from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import InputWithoutIcon from '../../components/input/textInputWithoutIcon'
import ButtonSelectAddPurchase from '../../components/buttons/ButtonSelectAddPurchase'
import ModalSelectSupplier from '../../components/modais/modalSupplier'
import { Modal } from 'react-native'
import ModalSelectLocal from '../../components/modais/modalLocal'
const BulletinCreate: React.FC = () => {
  const [text1, setText1] = useState(true)
  const [text2, setText2] = useState(true)
  const [text3, setText3] = useState(true)
  const [codigoCont, setCodigoCont] = useState('')
  const [modalSupplier, setModalSupplier] = useState(false)
  const [supplierDesc, setSupplierDesc] = useState('Escolha o fornecedor')
  const [supplierCod, setSupplierCod] = useState('')
  const [localDesc, setLocalDesc] = useState('Escolha o local')
  const [modalLocal, setModalLocal] = useState(false)
  const [localCod, setLocalCod] = useState('')
  const [itemPcgDesc, setItemPcgDesc] = useState('Escolha o item Pcg')
  const [modalItemPcg, setModalItemPcg] = useState(false)
  const [itemPcgCod, setItemPcgCod] = useState('')
  return (
    <MenuContainer>
      <Container>
        <S.AreaForm
          style={{ elevation: 10 }}
        >
          <S.AreaProgressBar>
            <S.IconStep>
              {
                text1
                  ? <S.TextIcon>1</S.TextIcon>
                  : <Icon
                    name={'check'}
                    size={30}
                    color="#FFF"
                  />
              }
            </S.IconStep>

            <S.AreaLine>
              <S.Line />
            </S.AreaLine>

            <S.IconStep>
              {
                text2
                  ? <S.TextIcon>2</S.TextIcon>
                  : <Icon
                    name={'check'}
                    size={30}
                    color="#FFF"
                  />
              }
            </S.IconStep>

            <S.AreaLine>
              <S.Line />
            </S.AreaLine>

            <S.IconStep>
              {
                text3
                  ? <S.TextIcon>3</S.TextIcon>
                  : <Icon
                    name={'check'}
                    size={30}
                    color="#FFF"
                  />
              }
            </S.IconStep>
          </S.AreaProgressBar>
          <S.AreaInput>
            <InputWithoutIcon
              placeholder={'Digite o codigo do contrato'}
              onChange={setCodigoCont}
              value={codigoCont}
              type={'number-pad'}
            />
            <ButtonSelectAddPurchase
              text={supplierDesc}
              handleClick={
                () => {
                  setModalSupplier(!modalSupplier)
                }
              }
            />
            <ButtonSelectAddPurchase
              text={itemPcgDesc}
              handleClick={
                () => {
                  setModalItemPcg(!modalItemPcg)
                }
              }
            />
            <ButtonSelectAddPurchase
              text={localDesc}
              handleClick={
                () => {
                  setModalLocal(!modalLocal)
                }
              }
            />
          </S.AreaInput>

        </S.AreaForm>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSupplier}
        >
          <ModalSelectSupplier
            onChange={setSupplierCod}
            value={supplierCod}
            modalChange={
              () => {
                setModalSupplier(!modalSupplier)
              }
            }
            setSupplier={setSupplierDesc}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalLocal}
        >
          <ModalSelectLocal
            onChange={setLocalCod}
            value={localCod}
            modalChange={
              () => {
                setModalLocal(!modalLocal)
              }
            }
            setLocal={setLocalDesc}
          />
        </Modal>

      </Container>
    </MenuContainer>
  )
}

export default BulletinCreate
