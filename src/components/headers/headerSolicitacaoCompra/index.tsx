import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'
interface props{
  datas: {
    SOCO_DTSOLI: string;
    CERE_SIGLA: string;
    CERE_NOME: string;
    SOCO_OBS: string;
    SOCO_COD: string;
    SOCO_NUMERO: string;
    UNMA_SIGLA: string;
    UNMA_DESC: string;
    SOCO_QTD_NECE: string;
    ESTO_CUSTO_MEDIO: string;
    valor_total: string;
    SECO_DESC: string;
    MATE_DESC: string;
    ALMO_DESC: string;
    SERV_DESC: string;
  }
}

const HeaderPurchaseOrder : React.FC<props> = ({ datas }) => {
  const dates = new Date(datas.SOCO_DTSOLI)

  const crDesc = datas.CERE_SIGLA + ' - ' + datas.CERE_NOME

  let data: string | number

  dates.getDate() > 10 ? data = dates.getDate() : data = '0' + dates.getDate()

  let month: string | number = dates.getMonth() + 1

  month < 10 ? month = '0' + (dates.getMonth() + 1) : month = (dates.getMonth() + 1)

  const formartData = (data + ' / ' + month + ' / ' + dates.getFullYear())

  let obs: string | number

  datas.SOCO_OBS === null ? obs = 'Sem observação cadastrada' : obs = datas.SOCO_OBS

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}><Text style={styles.title}>Data da solicitação: </Text>{formartData}</Text>
        <Text style={styles.text}><Text style={styles.title}>Código da solicitação: </Text>{datas.SOCO_COD}</Text>
        <Text style={styles.text}><Text style={styles.title}>Número da solicitação: </Text>{datas.SOCO_NUMERO}</Text>
        <Text style={styles.text}><Text style={styles.title}>Unidade: </Text>{datas.UNMA_SIGLA} - {datas.UNMA_DESC}</Text>
        <Text style={styles.text}><Text style={styles.title}>Quantidade: </Text>{datas.SOCO_QTD_NECE}</Text>
        <Text style={styles.text}><Text style={styles.title}>Custo médio: </Text>{changeReal(Number(datas.ESTO_CUSTO_MEDIO))}</Text>
        <Text style={styles.text}><Text style={styles.title}>Valor total: </Text>{changeReal(Number(datas.valor_total))}</Text>
        <Text style={styles.text}><Text style={styles.title}>Setor de compras: </Text>{datas.SECO_DESC}</Text>
        {
          datas.SERV_DESC === null
            ? <Text style={styles.text}><Text style={styles.title}>Produto : </Text>{datas.MATE_DESC}</Text>
            : <Text style={styles.text}><Text style={styles.title}>Serviço : </Text>{datas.SERV_DESC}</Text>
        }
        <Text style={styles.text}><Text style={styles.title}>CR: </Text>{crDesc}</Text>
        <Text style={styles.text}><Text style={styles.title}>Almoxarifado: </Text>{datas.ALMO_DESC}</Text>
        <Text style={styles.text}><Text style={styles.title}>Observação: </Text>{obs}</Text>
      </View>
    </View>
  )
}

export default HeaderPurchaseOrder
