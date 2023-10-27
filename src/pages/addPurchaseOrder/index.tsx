import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/container'
import { BackHandler, Modal, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { useNavigation } from '@react-navigation/native'
import * as S from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAnt from 'react-native-vector-icons/AntDesign'
import ButtonSelectAddPurchase from '../../components/buttons/ButtonSelectAddPurchase'
import ModalSelectPurchaseSector from '../../components/modais/modalPurchaseSector'
import ModalSelectWerehouse from '../../components/modais/modalWerehouse'
import ModalSelectCr from '../../components/modais/modalCR'
import ModalSelectItemPcg from '../../components/modais/modalItemPcg'
import CheckBoxArea from '../../components/checkBoxArea'
import ModalSelectMaterial from '../../components/modais/modalMaterial'
import { ItemMaterial } from './item'
import InputWithoutIcon from '../../components/input/textInputWithoutIcon'
import TextAttAddPurchase from '../../components/TextAttAddPurchase'
import ModalSelectEmployee from '../../components/modais/modalEmployee'
import ModalSelectAproval from '../../components/modais/modalAprovalUser'
import InputDatePickerPurchase from '../../components/input/inputDatePickerPurchase'
import axios from 'axios'
import { AuthContext } from '../../contexts/contextApi'
import MenuConainer from '../../components/menu/menuContainerCompras'
import ModalAlert from '../../components/modais/modalAlert'
import ModalSelectItemPcgAplicacao from '../../components/modais/modalItemPcgAplicacao'

interface mateArray {
  mateDesc: string;
  mateCod: string;
  mateQuantidade: string;
  mateUnidMatSigla: string;
  mateUnidMatCod: string;
}

const AddPurchaseOrder: React.FC = () => {
  const [step, setStep] = useState(0)
  const [text1, setText1] = useState(true)
  const [text2, setText2] = useState(true)
  const [text3, setText3] = useState(true)
  const [textButtonProx, setTextButtonProx] = useState('Proximo')
  const [modalSetorCompra, setModalSetorCompra] = useState(false)
  const [secoDesc, setSecoDesc] = useState('Escolha o setor de compra')
  const [secoCod, setSecoCod] = useState('')
  const [modalAlmo, setModalAlmo] = useState(false)
  const [almoDesc, setAlmoDesc] = useState('Escolha o almoxarifado')
  const [almoCod, setAlmoCod] = useState('')
  const [modalCr, setModalCr] = useState(false)
  const [crDesc, setCrDesc] = useState('Escolha o centro de resultado')
  const [crCod, setCrCod] = useState('')
  const [tircCod, setTircCod] = useState('')
  const [plgcCod, setPlgcCod] = useState('')
  const [modalItemPcg, setModalItemPcg] = useState(false)
  const [itemPcgDesc, setItemPcgDesc] = useState('Escolha o item pcg')
  const [itemPcgCod, setItemPcgCod] = useState('')
  const [modalItemPcgAplication, setModalItemPcgAplication] = useState(false)
  const [itemPcgAplicationDesc, setItemPcgAplicationDesc] = useState('Escolha a aplicação')
  const [itemPcgAplicationCod, setItemPcgAplicationCod] = useState('')
  const [modalMate, setModalMate] = useState(false)
  const [mateDesc, setMateDesc] = useState('Escolha o produto / serviço')
  const [mateCod, setMateCod] = useState('')
  const [unidMatDesc, setUnidMatDesc] = useState('Escolha a unidade de medida')
  const [unidMatCod, setUnidMatCod] = useState('')
  const [tipoMaterial, setTipoMaterial] = useState('Produto')
  const [quantidade, setQuantidade] = useState('')
  const [arrayMaterial, setArrayMaterial] = useState([])
  const [modalEmployee, setModalEmployee] = useState(false)
  const [employeeDesc, setEmployeeDesc] = useState('Escolha o funcionario')
  const [employeeCod, setEmployeeCod] = useState('')
  const [modalAproval1, setModalAproval1] = useState(false)
  const [aproval1Desc, setAproval1Desc] = useState('Escolha o aprovador 1')
  const [aproval1Cod, setAproval1Cod] = useState('')
  const [modalAproval2, setModalAproval2] = useState(false)
  const [aproval2Desc, setAproval2Desc] = useState('Escolha o aprovador 2')
  const [aproval2Cod, setAproval2Cod] = useState('')
  const [dtFormatada, setDtFormatada] = useState('Escolha a dt necessaria')
  const [dtFormatadaRequest, setDtFormatadaRequest] = useState('')
  const [bgPrevColor, setBgPrevColor] = useState('#CCC')
  const [numAprov, setNumAprov] = useState('')
  const [numTodas, setNumTodas] = useState('')
  const [modal, setModal] = useState(false)
  const [btnDireto, setBtnDireto] = useState(false)

  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddPurchaseOrder'
  >;

  const handleClickAdd = () => {
    let contains = false
    arrayMaterial.forEach(element => {
      if (element.mateCod === mateCod) {
        contains = true
      }
    })

    if (contains) {
      setArrayMaterial(
        arrayMaterial.filter(item => {
          if (item.mateCod === mateCod) {
            const operation = parseFloat(item.mateQuantidade) + parseFloat(quantidade)
            item.mateQuantidade = operation
          }
          return true
        })
      )
      return
    }

    if (mateCod === '') {
      alert('Produto/Serviço é obrigatorio')
      return
    } else if (unidMatCod === '') {
      alert('Unidade de medida é obrigatorio')
      return
    } else if (quantidade === '') {
      alert('Quantidade é obrigatorio')
      return
    }

    let newElement = {}
    if (tipoMaterial === 'Produto') {
      newElement = {
        mateDesc,
        mateCod,
        servCod: null,
        mateQuantidade: quantidade,
        mateUnidMatSigla: unidMatDesc,
        mateUnidMatCod: mateCod
      }
    } else {
      newElement = {
        mateDesc,
        mateCod: null,
        servCod: mateCod,
        mateQuantidade: quantidade,
        mateUnidMatSigla: unidMatDesc,
        mateUnidMatCod: mateCod
      }
    }

    setArrayMaterial((arrayMaterial: mateArray[]) => [...arrayMaterial, newElement])
  }

  const {
    url,
    version,
    refreshToken
  } = useContext(AuthContext)

  const handleClickPrev = () => {
    if (step === 0) {
      navigation.goBack()
    }
    if (step === 1) {
      setStep(0)
      setText1(!text1)
      setBgPrevColor('#ccc')
    }
    if (step === 2) {
      setStep(1)
      setText2(!text2)
      setBgPrevColor('#c22e2e')
    }
  }

  useEffect(() => {
    (
      async () => {
        await axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
          .then(async (json) => {
            const acessToken = json.data.acessToken
            await axios.get(
              `${url}${version}/page`,
              { headers: { Authorization: `Bearer ${acessToken}` } }
            )
              .then((response) => {
                setNumAprov(response.data[0].PAGE_NUM_APROVACOES_SOLIC)
                setNumTodas(response.data[0].PAGE_TODAS_APROVACOES_SOLIC)
              })
              .catch((e) => {
                alert('error: ' + e)
              })
          })
          .catch(
            () => {
              setModal(!modal)
            }
          )
      }
    )()
  })

  const handleClickProx = async () => {
    if (step === 0) {
      if (secoCod === '') {
        alert('Setor de compras é obrigatorio')
        return
      } else if (almoCod === '') {
        alert('Almoxarifado é obrigatorio')
        return
      } else if (crCod === '') {
        alert('Cr é obrigatorio')
        return
      } else if (itemPcgCod === '') {
        alert('Item Pcg é obrigatorio')
        return
      } else if (btnDireto) {
        if (itemPcgAplicationCod === '') {
          alert('Aplicação é obrigatorio')
          return
        }
      }
      setText1(!text1)
      setBgPrevColor('#c22e2e')
      setStep(1)
    } else if (step === 1) {
      if (arrayMaterial.length === 0) {
        alert('Adicione ao menos um produto / serviço')
        return
      }
      if (quantidade === '') {
        alert('Quantidade é obrigatorio')
        return
      }
      setText2(!text2)
      setStep(2)
      setBgPrevColor('#c22e2e')

      setTextButtonProx('Confirmar')
    } else if (step === 2) {
      if (dtFormatadaRequest === '') {
        alert('Data necessaria obrigatirio')
        return
      } else if (aproval1Cod === '') {
        alert('Aprovador 1 é obrigatorio')
        return
      } else if (employeeCod === '') {
        alert('Aprovador 1 é obrigatorio')
        return
      } else if (numAprov === '2' && numTodas === 'S') {
        alert('Aprovador 2 é obrigatorio')
        return
      }
      await axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
        .then(async (json) => {
          const acessToken = json.data.acessToken
          let ass2 = null
          if (aproval2Cod !== '') {
            ass2 = aproval2Cod
          }
          let bodyOption = {}
          if (tipoMaterial === 'Produto') {
            bodyOption = {
              secoCod,
              itpcRateioCod: itemPcgCod,
              cereCod: crCod,
              almoCod,
              dtNece: dtFormatadaRequest,
              arrayMaterial,
              pessCodSoli: employeeCod,
              ass1: aproval1Cod,
              ass2,
              itpcCod: itemPcgAplicationCod,
              debitoDireto: btnDireto ? 'S' : 'N'
            }
          } else {
            bodyOption = {
              secoCod,
              itpcRateioCod: itemPcgCod,
              cereCod: crCod,
              almoCod,
              dtNece: dtFormatadaRequest,
              arrayMaterial,
              pessCodSoli: employeeCod,
              ass1: aproval1Cod,
              ass2,
              itpcCod: itemPcgAplicationCod,
              debitoDireto: btnDireto ? 'S' : 'N'
            }
          }
          await axios.post(
            `${url}${version}/solicitacaoCompra/create`,
            bodyOption,
            { headers: { Authorization: `Bearer ${acessToken}` } }
          )
            .then((response) => {
              setText3(!text3)
              alert(response.data.message)
              // navigation.navigate('SolicitacaoCompra')
            })
            .catch((e) => {
              alert(e.response)
            })
        })
        .catch(() => {
          navigation.navigate('Login')
        })
      setBgPrevColor('#c22e2e')
    }
  }

  const navigation = useNavigation<FullNavigationProp>()
  const backAction = () => {
    navigation.navigate('SolicitacaoCompra')
    return true
  }

  useEffect(() => {
    if (step === 0) {
      setCrCod('')
      setCrDesc('Escolha o centro de resultado')
      setItemPcgCod('')
      setItemPcgDesc('Escolha o item pcg')
    }
  }, [almoDesc])

  useEffect(() => {
    if (step === 0) {
      setItemPcgCod('')
      setItemPcgDesc('Escolha o item pcg')
    }
  }, [crDesc])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  const handleClickSub = (cod: string) => {
    setArrayMaterial(
      arrayMaterial.filter(item => {
        if (item.mateCod === cod) {
          return false
        }
        return true
      })
    )
  }

  return (
    <MenuConainer>
      <Container>
        <S.AreaForm>
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
          {
            step === 0
              ? <S.AreaInput>

                <ButtonSelectAddPurchase
                  text={secoDesc}
                  handleClick={
                    () => {
                      setModalSetorCompra(!modalSetorCompra)
                    }
                  }
                />

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalSetorCompra}
                >
                  <ModalSelectPurchaseSector
                    onChange={setSecoCod}
                    value={secoCod}
                    modalChange={
                      () => {
                        setModalSetorCompra(!modalSetorCompra)
                      }
                    }
                    setSetoDesc={setSecoDesc}
                  />
                </Modal>

                <ButtonSelectAddPurchase
                  text={almoDesc}
                  handleClick={
                    () => {
                      setModalAlmo(!modalAlmo)
                    }
                  }
                />
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalAlmo}
                >
                  <ModalSelectWerehouse
                    onChange={setAlmoCod}
                    value={almoCod}
                    modalChange={
                      () => {
                        setModalAlmo(!modalAlmo)
                      }
                    }
                    setAlmoDesc={setAlmoDesc}
                  />
                </Modal>

                <ButtonSelectAddPurchase
                  text={crDesc}
                  handleClick={
                    () => {
                      if (almoCod === '') {
                        alert('Escolha o almoxarifado')
                        return
                      }
                      setModalCr(!modalCr)
                    }
                  }
                />
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalCr}
                >
                  <ModalSelectCr
                    onChange={setCrCod}
                    value={crCod}
                    modalChange={() => {
                      setModalCr(!modalCr)
                    }}
                    setPlgcCod={setPlgcCod}
                    setCereDesc={setCrDesc}
                    almoCod={almoCod}
                    setTircCod={setTircCod}
                  />
                </Modal>
                <ButtonSelectAddPurchase
                  text={itemPcgDesc}
                  handleClick={
                    () => {
                      if (crCod === '') {
                        alert('Escolha o centro de resultado')
                        return
                      }
                      setModalItemPcg(!modalItemPcg)
                    }
                  }
                />

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalItemPcg}
                >
                  <ModalSelectItemPcg
                    onChange={setItemPcgCod}
                    value={itemPcgCod}
                    modalChange={() => {
                      setModalItemPcg(!modalItemPcg)
                    }}
                    setItemPlgcDesc={setItemPcgDesc}
                    plgcCod={plgcCod}
                    cereCod={crCod}
                    ticrCod={tircCod}
                  />
                </Modal>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalItemPcgAplication}
                >
                  <ModalSelectItemPcgAplicacao
                    onChange={setItemPcgAplicationCod}
                    value={itemPcgAplicationCod}
                    modalChange={() => {
                      setModalItemPcgAplication(!modalItemPcgAplication)
                    }}
                    setItemPlgcDesc={setItemPcgAplicationDesc}
                    plgcCod={plgcCod}
                    cereCod={crCod}
                    ticrCod={tircCod}
                  />
                </Modal>
                <View>
                  <S.BtnDireto
                    onPress={() => {
                      setBtnDireto(!btnDireto)
                    }}
                  >
                    {
                      !btnDireto
                        ? <IconAnt
                          name={'closesquareo'}
                          size={30}
                          color="#121212"
                        />
                        : <IconAnt
                          name={'checksquareo'}
                          size={30}
                          color="#121212"
                        />
                    }
                    <S.TxtBtnDireto>Debito direto</S.TxtBtnDireto>
                  </S.BtnDireto>
                  {
                    !btnDireto
                      ? ''
                      : <ButtonSelectAddPurchase
                      text={itemPcgAplicationDesc}
                      handleClick={
                        () => {
                          if (crCod === '') {
                            alert('Escolha o centro de resultado')
                            return
                          }
                          setModalItemPcgAplication(!modalItemPcgAplication)
                        }
                      }
                    />
                  }
                </View>
              </S.AreaInput>
              : ''
          }

          {
            step === 1
              ? <S.AreaInput2>

                <S.AreaInput2Header>
                  <View>
                    <CheckBoxArea
                      setUnidMatDesc={setUnidMatDesc}
                      setUnidMatCod={setUnidMatCod}
                      setValue={setTipoMaterial}
                      value={tipoMaterial}
                      onChange={setMateDesc}
                      onChangeCod={setMateCod}
                      setArrayMaterial={setArrayMaterial}
                      setQuantidade={setQuantidade}
                    />

                    <ButtonSelectAddPurchase
                      text={mateDesc}
                      handleClick={
                        () => {
                          setModalMate(!modalMate)
                        }
                      }
                    />
                  </View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalMate}
                  >

                    <ModalSelectMaterial
                      onChange={setMateCod}
                      value={mateCod}
                      modalChange={
                        () => {
                          setModalMate(!modalMate)
                        }
                      }
                      setmateDesc={setMateDesc}
                      servProd={tipoMaterial}
                      setUnmaNome={setUnidMatDesc}
                      setUnmaCod={setUnidMatCod}
                    />

                  </Modal>

                  <TextAttAddPurchase
                    text={unidMatDesc}
                  />

                  <InputWithoutIcon
                    placeholder={'Digite a quantidade'}
                    onChange={setQuantidade}
                    value={quantidade}
                    type={'number-pad'}
                  />

                  <S.ButtonAdd
                    onPress={handleClickAdd}
                  >
                    <S.TextIcon>
                      Adicionar
                    </S.TextIcon>
                  </S.ButtonAdd>
                </S.AreaInput2Header>

                <S.AreaInput2Flat
                  data={arrayMaterial}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  renderItem={(item: any) => {
                    return (
                      <ItemMaterial
                        materialDesc={item.item.mateDesc}
                        quantidade={item.item.mateQuantidade}
                        unidadeMedi={item.item.mateUnidMatSigla}
                        handleClick={handleClickSub}
                        materialCod={item.item.mateCod}
                      />
                    )
                  }}
                />

              </S.AreaInput2>

              : ''
          }
          {
            step === 2
              ? <S.AreaInput>

                <ButtonSelectAddPurchase
                  text={employeeDesc}
                  handleClick={
                    () => {
                      setModalEmployee(!modalEmployee)
                    }
                  }
                />

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalEmployee}
                >
                  <ModalSelectEmployee
                    onChange={setEmployeeCod}
                    value={employeeCod}
                    modalChange={
                      () => {
                        setModalEmployee(!modalEmployee)
                      }
                    }
                    setEmployee={setEmployeeDesc}
                  />
                </Modal>

                <ButtonSelectAddPurchase
                  text={aproval1Desc}
                  handleClick={
                    () => {
                      setModalAproval1(!modalAproval1)
                    }
                  }
                />

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalAproval1}
                >
                  <ModalSelectAproval
                    onChange={setAproval1Cod}
                    value={aproval1Cod}
                    modalChange={
                      () => {
                        setModalAproval1(!modalAproval1)
                      }
                    }
                    setAproval={setAproval1Desc}
                    approval1=''
                  />
                </Modal>

                <ButtonSelectAddPurchase
                  text={aproval2Desc}
                  handleClick={
                    () => {
                      if (aproval1Cod === '') {
                        alert('Escolha primeiro o aprovador 1')
                        return
                      }
                      setModalAproval2(!modalAproval2)
                    }
                  }
                />

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalAproval2}
                >
                  <ModalSelectAproval
                    onChange={setAproval2Cod}
                    value={aproval2Cod}
                    modalChange={
                      () => {
                        setModalAproval2(!modalAproval2)
                      }
                    }
                    setAproval={setAproval2Desc}
                    approval1={aproval1Cod}
                  />
                </Modal>
                <InputDatePickerPurchase
                  dtFormatada={dtFormatada}
                  setDtFormatada={setDtFormatada}
                  setDtFormatadaRequest={setDtFormatadaRequest}
                />
              </S.AreaInput>
              : ''
          }
          <S.AreaBtns>
            <S.ButtonPrevProx
              bg={bgPrevColor}
              onPress={handleClickPrev}
            >
              <S.TextIcon>
                Voltar
              </S.TextIcon>
            </S.ButtonPrevProx>
            <S.ButtonPrevProx
              bg={'#1BAF64'}
              onPress={handleClickProx}
            >
              <S.TextIcon>
                {textButtonProx}
              </S.TextIcon>
            </S.ButtonPrevProx>
          </S.AreaBtns>

        </S.AreaForm>
      </Container>
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
    </MenuConainer>
  )
}

export default AddPurchaseOrder
