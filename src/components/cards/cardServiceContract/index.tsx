import { TouchableOpacity, Text, View, Modal, BackHandler } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { AuthContext } from '../../../contexts/contextApi'
import ModalPasswordContratoServico from '../../modais/modalPasswordContServ'
import { useNavigation } from '@react-navigation/native'
import { FullNavigationProp } from '../../menu/menuContainerCompras'

interface props {
  datas: {
    item: {
      FORN_NOME: string;
      FILI_NOME_FANTASIA: string;
      COCS_DT_INICIO: string;
      COCS_DT_FIM: string;
      EMPR_NOME: string;
      COCS_COD: string;
      ASS: string;
      VALOR_TOTAL: string;
      COCS_FORMA_PAGAMENTO: string;
      SERV_DESC: string;
      LOCA_DESC: string;
    }
  },
  loadingFunc: () => void
  responseFunc: () => void
}

interface IarrayContratoServico {
  cod: string,
  posAss: string,
  valor: string,
}

const CardServiceContract: React.FC<props> = ({ datas }: props) => {
  const {
    bgState,
    setBgState,
    arrayContratoServico,
    setArrayContratoServico
  } = useContext(AuthContext)

  const navigation = useNavigation<FullNavigationProp>()

  const [modalPassword, setModalPassword] = useState(false)
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const swipeableRef = useRef(null)

  const fornecedor = datas.item.FORN_NOME
  const filial = datas.item.FILI_NOME_FANTASIA
  const dateInic = new Date(datas.item.COCS_DT_INICIO)
  const dateFim = new Date(datas.item.COCS_DT_FIM)
  const monthInic = dateInic.getMonth() + 1
  const monthFim = dateFim.getMonth() + 1
  const empresa = datas.item.EMPR_NOME
  const cod = datas.item.COCS_COD
  const assPos = datas.item.ASS
  const valorTotal = datas.item.VALOR_TOTAL

  let monthInicFormat: string | number
  let monthFimFormat: string | number
  let datesInic: string | number
  let datesFim: string | number

  useEffect(
    () => {
      setBgColor('#FFFFFF')
    }, [bgState]
  )

  const handleLongPress = () => {
    if (bgColor === '#FFFFFF') {
      setBgColor('#aaaaaa')

      setArrayContratoServico((arrayContratoServico: IarrayContratoServico[]) => [...arrayContratoServico, {
        posAss: assPos,
        cod,
        valor: valorTotal
      }])
    } else {
      setArrayContratoServico(
        arrayContratoServico.filter(
          (item) => {
            return item.cod !== cod
          }
        )
      )
      setBgColor('#FFFFFF')
    }
  }

  monthInic >= 10 ? monthInicFormat = monthInic : monthInicFormat = '0' + monthInic
  monthFim >= 10 ? monthFimFormat = monthFim : monthFimFormat = '0' + monthFim

  dateInic.getDate() >= 10 ? datesInic = dateInic.getDate() : datesInic = '0' + dateInic.getDate()
  dateFim.getDate() >= 10 ? datesFim = dateFim.getDate() : datesFim = '0' + dateFim.getDate()

  let fornecedorFormated: string | number
  let filialFormated: string | number
  let empresaFormated: string | number

  fornecedor.length > 20 ? fornecedorFormated = fornecedor.slice(0, 20) + '...' : fornecedorFormated = fornecedor
  filial.length > 20 ? filialFormated = filial.slice(0, 20) + '...' : filialFormated = filial
  empresa.length > 20 ? empresaFormated = empresa.slice(0, 20) + '...' : empresaFormated = empresa

  const handleLeft = () => {
    setArrayContratoServico((arrayContratoServico: IarrayContratoServico[]) => [...arrayContratoServico, {
      posAss: assPos,
      cod,
      valor: valorTotal
    }])
    setModalPassword(!modalPassword)
  }

  const backAction = () => {
    setArrayContratoServico([])
    setBgColor('#FFFFFF')
    navigation.goBack()
    return true
  }

  const handleClick = () => {
    if (arrayContratoServico.length === 0) {
      navigation.navigate('DetalheContratoServico', {
        item: {
          COCS_COD: datas.item.COCS_COD,
          ASS: datas.item.ASS,
          VALOR_TOTAL: datas.item.VALOR_TOTAL,
          COCS_DT_INICIO: datas.item.COCS_DT_INICIO,
          COCS_DT_FIM: datas.item.COCS_DT_FIM,
          COCS_FORMA_PAGAMENTO: datas.item.COCS_FORMA_PAGAMENTO,
          SERV_DESC: datas.item.SERV_DESC,
          FORN_NOME: datas.item.FORN_NOME,
          EMPR_NOME: datas.item.EMPR_NOME,
          FILI_NOME_FANTASIA: datas.item.FILI_NOME_FANTASIA,
          LOCA_DESC: datas.item.LOCA_DESC
        }
      })
    } else {
      if (bgColor === '#FFFFFF') {
        setBgColor('#AAAAAA')
        setArrayContratoServico((arrayContratoServico: IarrayContratoServico[]) => [...arrayContratoServico, {
          posAss: assPos,
          cod,
          valor: valorTotal
        }])
      } else {
        setBgColor('#FFFFFF')
        setArrayContratoServico(
          arrayContratoServico.filter(
            (item) => {
              setBgColor('#FFFFFF')
              return item.cod !== cod
            }
          )
        )
      }
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  const leftAction = () => {
    if (bgColor === '#FFFFFF') {
      return (
        <View
          style={styles.buttonAprovar}
        >

          <Text
            style={[styles.textBtn]}
          >

            Contrato aprovado

          </Text>

        </View>
      )
    } else {
      return (<View style={{ width: 0, height: 0 }}></View>
      )
    }
  }

  const closeSwipeable = () => {
    swipeableRef.current.close()
  }

  return (
    <Swipeable
      renderLeftActions={leftAction}
      onSwipeableLeftOpen={handleLeft}
      ref={swipeableRef}

    >
      <TouchableOpacity
        style={[styles.card, {
          backgroundColor: `${bgColor}`
        }]}
        onPress={() => {
          handleClick()
        }}
        onLongPress={() => {
          handleLongPress()
        }}
      >

        <View style={styles.cardTopTextArea}>

          <Text style={styles.cardTopTextLeft}>Codigo: {datas.item.COCS_COD}</
          Text>
          <Text style={styles.cardTopTextRight}>{datesInic + ' / ' + monthInicFormat + ' / ' + dateInic.getFullYear()}{'\n'} {datesFim + ' / ' + monthFimFormat + ' / ' + dateFim.getFullYear()}</Text>

        </View>

        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Valor : </Text>
          <Text style={styles.cardTextBody}>{changeReal(valorTotal)}</Text>
        </View>

        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Fornecedor : </Text>
          <Text style={styles.cardTextBody}>{fornecedorFormated}</Text>
        </View>
        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Filial : </Text>
          <Text style={styles.cardTextBody}>{filialFormated}</Text>
        </View>
        <View style={styles.cardTextArea}>
          <Text style={styles.cardTextTitle}>Empresa : </Text>
          <Text style={styles.cardTextBody}>{empresaFormated}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPassword}
        onRequestClose={() => {
          setModalPassword(!modalPassword)
        }}
      >
        <ModalPasswordContratoServico
          func={() => {
            setModalPassword(!modalPassword)
            closeSwipeable()
            setBgState(!bgState)
          }}
        />
      </Modal>
    </Swipeable>
  )
}

export default CardServiceContract
