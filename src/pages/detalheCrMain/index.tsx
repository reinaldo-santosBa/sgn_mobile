import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import MenuConainerGerencial from '../../components/menu/menuContainerGerencial'
import Button from '../../components/buttons/button'
import Container from '../../components/container'
import { ActivityIndicator, Modal, Text } from 'react-native'
import InputDatePicker from '../../components/input/inputDatePicker'
import ButtonSelect from '../../components/buttons/ButtonSelect'
import ModalSelectCr from '../../components/modais/modalSelectCr'
import axios from 'axios'
import { AuthContext } from '../../contexts/contextApi'
import ModalAlert from '../../components/modais/modalAlert'

const DetalheCrMain: React.FC = () => {
  const [dtFormatadaIni, setDtFormatadaIni] = useState('Escolha a data inicial')
  const [dtFormatadaIniRequest, setDtFormatadaIniRequest] = useState('')
  const [dtFormatadaFimRequest, setDtFormatadaFimRequest] = useState('')
  const [dtFormatadaFim, setDtFormatadaFim] = useState('Escolha a data final')
  const [textCr, setTextCr] = useState('Escolha o Cr')
  const [codCr, setCodCr] = useState('')
  const [loading, setLoading] = useState(true)
  const {
    url,
    version,
    refreshToken
  } = useContext(AuthContext)
  const [modal, setModal] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const [plgcCod, setPlgcCod] = useState('')
  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'DetalheCrMain'
  >;
  const navigation = useNavigation<FullNavigationProp>()

  const handlePress = async () => {
    if (dtFormatadaIniRequest === '' || dtFormatadaFimRequest === '' || textCr === 'Escolha o Cr' || plgcCod === '') {
      alert('Preencha todos os campos')
      return
    }

    setLoading(false)
    await axios.get(`${url}${version}/usuario/acessToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then(async (json) => {
        const acessToken = json.data.acessToken
        await axios.get(
          `${url}${version}/cr/${codCr}/${plgcCod}/${dtFormatadaIniRequest}/${dtFormatadaFimRequest}`,
          { headers: { Authorization: `Bearer ${acessToken}` } }
        )
          .then(async (resp) => {
            setLoading(true)
            navigation.navigate('DetalheCrDados', {
              dtFormatadaIni,
              dtFormatadaFim,
              despesa: {
                abertoDespesa: resp.data.despesa.abertoDespesa,
                baixadoDespesa: resp.data.despesa.baixadoDespesa,
                totalDespesa: resp.data.despesa.totalDespesa
              },
              receita: {
                abertoReceita: resp.data.receita.abertoReceita,
                baixadoReceita: resp.data.receita.baixadoReceita,
                totalReceita: resp.data.receita.totalReceita
              },
              totais: {
                aberto: resp.data.totais.aberto,
                baixado: resp.data.totais.baixado,
                total: resp.data.totais.total
              }
            })
          })
          .catch((e) => {
            setLoading(true)
          })
      })
      .catch(
        () => {
          setLoading(false)
          setModal(!modal)
        }
      )
    setDtFormatadaIni('Escolha a data inicial')
    setDtFormatadaIniRequest('')
    setDtFormatadaFimRequest('')
    setDtFormatadaFim('Escolha a data final')
    setTextCr('Escolha o Cr')
    setCodCr('')
  }

  return (
    <MenuConainerGerencial>
      <Container>
        {
          !loading
            ? <ActivityIndicator style={{ position: 'absolute', top: '30%', zIndex: 10000 }} color={'#000'} size={'large'} />
            : ''
        }
        <Text style={{ fontSize: 24 }}>
          Selecione as opções
        </Text>
        <ButtonSelect
          text={textCr}
          handleClick={() => {
            setModal(!modal)
          }}
        />
        <InputDatePicker
          dtFormatada={dtFormatadaIni}
          setDtFormatada={setDtFormatadaIni}
          setDtFormatadaRequest={setDtFormatadaIniRequest}
        />
        <InputDatePicker
          dtFormatada={dtFormatadaFim}
          setDtFormatada={setDtFormatadaFim}
          setDtFormatadaRequest={setDtFormatadaFimRequest}
        />
        <Button
          functionOnpress={() => { handlePress() }}
          textButton={'Consultar CR'}
        />
      </Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <ModalSelectCr
          setNomePlgcCod={(text: string, plgcCod: string, codCr: string) => {
            setTextCr(text)
            setPlgcCod(plgcCod)
            setCodCr(codCr)
          }}
          modalChange={() => {
            setModal(!modal)
          }}
        />
      </Modal>

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
    </MenuConainerGerencial>
  )
}

export default DetalheCrMain
