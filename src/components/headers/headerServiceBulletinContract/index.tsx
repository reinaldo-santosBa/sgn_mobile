import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'

interface Iprops {
  FORN_NOME: string;
  BOCS_DT_INICIO: string;
  BOCS_DT_FIM: string;
  BOCS_OBS: string;
  BOCS_DT_VENC: string;
  COCS_COD: string;
  BOCS_NUMERO: string;
  VALOR_TOTAL: string;
  BOCS_COD: string;
}

export const HeaderContractBulletinService: React.FC<Iprops> = (
  {
    FORN_NOME,
    BOCS_DT_INICIO,
    BOCS_DT_FIM,
    BOCS_OBS,
    BOCS_DT_VENC,
    COCS_COD,
    BOCS_NUMERO,
    VALOR_TOTAL,
    BOCS_COD
  }
) => {
  const dates = new Date(BOCS_DT_INICIO)
  const dates2 = new Date(BOCS_DT_FIM)
  const dates3 = new Date(BOCS_DT_VENC)
  let data: number | string
  let data2: number | string
  let data3: number | string
  const valorTotal = VALOR_TOTAL

  dates.getDate() + 1 > 10 ? data = dates.getDate() : data = '0' + dates.getDate()

  let month: number | string = dates.getMonth() + 1

  let month3: number | string = dates3.getMonth() + 1

  month < 10 ? month = '0' + (dates.getMonth() + 1) : month = (dates.getMonth() + 1)

  const formartData = (data + '/' + month + '/' + dates.getFullYear())

  dates2.getDate() > 10 ? data2 = dates2.getDate() : data2 = '0' + dates2.getDate()

  let month2: number | string = dates2.getMonth() + 1

  month2 < 10 ? month2 = '0' + (dates2.getMonth() + 1) : month2 = (dates2.getMonth() + 1)

  const formartData2 = (data2 + '/' + month + '/' + dates2.getFullYear())

  dates3.getDate() >= 10 ? data3 = dates3.getDate() : data3 = '0' + dates3.getDate()

  month3 < 10 ? month3 = '0' + (dates3.getMonth() + 1) : month3 = (dates3.getMonth() + 1)

  const formatDate3 = (data3 + '/' + month3 + '/' + dates3.getFullYear())

  return (
    <View style={styles.container}>
      <View>

        <Text
          style={styles.text}
        >

          <Text
            style={styles.title}
          >

            Código do contrato:

          </Text>

          {COCS_COD}

        </Text>

        <Text
          style={styles.text}
        >

          <Text
            style={styles.title}
          >

            Número do boletim:

          </Text>

          {BOCS_NUMERO}

        </Text>

        <Text style={styles.text}>

          <Text
            style={styles.title}
          >
            Código de boletim:
          </Text>

          {BOCS_COD}

        </Text>

        <Text style={styles.text}>

          <Text
            style={styles.title}
          >
            Data de inicio:
          </Text>

          {formartData}

        </Text>

        <Text
          style={styles.text}
        >
          <Text
            style={styles.title}
          >
            Data de fim:
          </Text>
          {formartData2}
        </Text>

        <Text
          style={styles.text}
        >
          <Text
            style={styles.title}
          >
            Data de vencimento:
          </Text>
          {formatDate3}
        </Text>

        <Text
          style={styles.text}
        >

          <Text
            style={styles.title}
          >

            Fornecedor:

          </Text>

          {FORN_NOME}

        </Text>

        <Text
          style={styles.text}
        >

          <Text
            style={styles.title}
          >
            Valor total:
          </Text>
          {changeReal(valorTotal)}

        </Text>

        <Text
          style={styles.text}
        >

          <Text
            style={styles.title}
          >

            Observação:

          </Text>

          {BOCS_OBS}

        </Text>

      </View>
    </View>
  )
}
