import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'
interface props{
    FORN_NOME: string;
    PEDI_DATA: string;
    VALOR_TOTAL_SERVICO: string;
    VALOR_TOTAL_ITEM: string;
    PEDI_FORN_COD: string;
    PEDI_NUMERO: string;
    PEDI_OBS: string;
    EMPR_NOME: string;
    PEDI_DESCONTO: string;
    PEDI_FRETE: string;
    PEDI_TOTAL_MERC: string;
    PEDI_VALOR_APROVADO: string;
}

const HeaderPedido: React.FC<props> = ({
  FORN_NOME,
  PEDI_DATA,
  VALOR_TOTAL_SERVICO,
  VALOR_TOTAL_ITEM,
  PEDI_NUMERO,
  PEDI_OBS,
  EMPR_NOME,
  PEDI_DESCONTO,
  PEDI_FRETE,
  PEDI_TOTAL_MERC,
  PEDI_VALOR_APROVADO
}) => {
  const dates = new Date(PEDI_DATA)

  let data: string | number
  const valorTotal = VALOR_TOTAL_SERVICO + VALOR_TOTAL_ITEM

  dates.getDate() > 10 ? data = dates.getDate() : data = '0' + dates.getDate()

  let month: string | number = dates.getMonth() + 1

  month < 10 ? month = '0' + (dates.getMonth() + 1) : month = (dates.getMonth() + 1)

  const formartData = (data + ' / ' + month + ' / ' + dates.getFullYear())

  let obs: string

  PEDI_OBS === null ? obs = 'Sem valor' : obs = PEDI_OBS

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}><Text style={styles.title}>Fornecedor: </Text>{FORN_NOME}</Text>
        <Text style={styles.text}><Text style={styles.title}>Data de pedido: </Text>{formartData}</Text>
        <Text style={styles.text}><Text style={styles.title}>Empresa: </Text>{EMPR_NOME}</Text>
        <Text style={styles.text}><Text style={styles.title}>Desconto: </Text>{changeReal(Number(PEDI_DESCONTO))}</Text>
        <Text style={styles.text}><Text style={styles.title}>Frete: </Text>{changeReal(Number(PEDI_FRETE))}</Text>
        <Text style={styles.text}><Text style={styles.title}>Número do pedido: </Text>{PEDI_NUMERO}</Text>
        <Text style={styles.text}><Text style={styles.title}>Observação: </Text>{obs}</Text>
        <Text style={styles.text}><Text style={styles.title}>Total mercadoria: </Text>{changeReal(Number(PEDI_TOTAL_MERC))}</Text>
        <Text style={styles.text}><Text style={styles.title}>Valor aprovado: </Text>{changeReal(Number(PEDI_VALOR_APROVADO))}</Text>
        <Text style={styles.text}><Text style={styles.title}>Valor total: </Text>{changeReal(Number(valorTotal))}</Text>
      </View>
    </View>
  )
}

export default HeaderPedido
