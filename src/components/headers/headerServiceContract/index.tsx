import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'
interface props{
  datas: {
    COCS_DT_INICIO: string;
    COCS_DT_FIM: string;
    VALOR_TOTAL: string;
    COCS_FORMA_PAGAMENTO: string;
    SERV_DESC: string;
    FORN_NOME: string;
    FILI_NOME_FANTASIA: string;
    EMPR_NOME: string;
    LOCA_DESC: string;
  };
}

export const HeaderContractService : React.FC<props> = ({ datas }) => {
  const dates = new Date(datas.COCS_DT_INICIO)
  const dates2 = new Date(datas.COCS_DT_FIM)
  console.log('data====================================')
  console.log(datas)
  console.log('====================================')
  let data:string | number
  let data2: string | number
  const valorTotal = datas.VALOR_TOTAL

  dates.getDate() > 10 ? data = dates.getDate() : data = '0' + dates.getDate()

  let month: string | number = dates.getMonth() + 1

  month < 10 ? month = '0' + (dates.getMonth() + 1) : month = (dates.getMonth() + 1)

  const formartData = (data + '/' + month + '/' + dates.getFullYear())

  dates2.getDate() > 10 ? data2 = dates2.getDate() : data2 = '0' + dates2.getDate()

  let month2: string | number = dates2.getMonth() + 1

  month2 < 10 ? month2 = '0' + (dates2.getMonth() + 1) : month2 = (dates2.getMonth() + 1)

  const formartData2 = (data2 + '/' + month + '/' + dates2.getFullYear())

  let formaPagamento: string

  datas.COCS_FORMA_PAGAMENTO === null || datas.COCS_FORMA_PAGAMENTO === '' ? formaPagamento = 'Sem valor' : formaPagamento = datas.COCS_FORMA_PAGAMENTO

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}><Text style={styles.title}>Data de inicio: </Text>{formartData}</Text>
        <Text style={styles.text}><Text style={styles.title}>Data de fim: </Text>{formartData2}</Text>
        <Text style={styles.text}><Text style={styles.title}>Serviço: </Text>{datas.SERV_DESC}</Text>
        <Text style={styles.text}><Text style={styles.title}>Fornecedor: </Text>{datas.FORN_NOME}</Text>
        <Text style={styles.text}><Text style={styles.title}>Empresa: </Text>{datas.EMPR_NOME}</Text>
        <Text style={styles.text}><Text style={styles.title}>Filial: </Text>{datas.FILI_NOME_FANTASIA}</Text>
        <Text style={styles.text}><Text style={styles.title}>Local: </Text>{datas.LOCA_DESC}</Text>
        <Text style={styles.text}><Text style={styles.title}>Valor total: </Text>{changeReal(valorTotal)}</Text>
        <Text style={styles.text}><Text style={styles.title}>Forma de pagamento: </Text>{formaPagamento.length > 100 ? formaPagamento.slice(0, 100) + '...' : formaPagamento}</Text>
      </View>
    </View>
  )
}
