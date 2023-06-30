import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'

interface Iprops {
  PESS_NOME: string;
  PLAC_COD: string;
  PLAC_PESS_COD: string;
  PLAC_SECO_COD: string;
  SECO_DESC: string;
}

export const HeaderPurchaseWorksheet: React.FC<Iprops> = (
  {
    PESS_NOME,
    PLAC_COD,
    PLAC_PESS_COD,
    PLAC_SECO_COD,
    SECO_DESC
  }
) => {
  return (
    <View style={styles.container}>
      <View>

        <Text
          style={styles.text}
        >

          <Text
            style={styles.title}
          >

            Código da planilha:

          </Text>

          {' '}{PLAC_COD}

        </Text>

        <Text
          style={styles.text}
        >

          <Text
            style={styles.title}
          >

            Funcionário:

          </Text>

          {' '}{PLAC_PESS_COD} - {PESS_NOME}

        </Text>

        <Text style={styles.text}>

          <Text
            style={styles.title}
          >
            Setor de compras:
          </Text>

          {' '}{PLAC_SECO_COD} - {SECO_DESC}

        </Text>
      </View>
    </View>
  )
}
