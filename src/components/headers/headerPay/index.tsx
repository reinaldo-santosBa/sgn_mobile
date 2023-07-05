import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import changeReal from '../../../utils/chanceReal'
import { formatDate } from '../../../utils/formatData'
interface props{
  datas: {
    cere_nome: string;
    cere_sigla: string;
    empr_nome: string;
    forn_aliquota_ir_pj: number;
    forn_nome: string;
    itpc_desc: string;
    itpc_sigla: string;
    sttr_desc: string;
    trpg_cod: number,
    trpg_dtemis: string;
    trpg_dtorigem: string;
    trpg_dtrecebimento: string;
    trpg_empr_cod: number;
    trpg_forn_cod: number;
    trpg_num_doc: string;
    trpg_obs: string;
    trpg_rate_cod: number;
    trpg_sttr_cod: string;
    trpg_tipo_doc: string;
    trpg_valbruto: string;
    trpg_valdesconto: number;
    trpg_valjur: number;
    trpg_valmulta: number;
    trpp_cere_cod: number;
    trpp_cod: string;
    trpp_dtvenc: string;
    trpp_itpc_cod: number;
    trpp_obs: string;
    trpp_sigla: string;
    trpp_sttr_cod: string;
    trpp_valdesc: number;
    trpp_valjur: number;
    trpp_valprev: number;
  };
}

export const HeaderPay : React.FC<props> = ({ datas }) => {
  const dates = new Date(datas.trpp_dtvenc)
  const dates2 = new Date(datas.trpg_dtemis)
  const valorBruto = Number(datas.trpg_valbruto) > 0 ? datas.trpg_valbruto + '' : '0'
  const valorPrevisto = Number(datas.trpp_valprev) > 0 ? datas.trpp_valprev + '' : '0'
  const valorDesconto = Number(datas.trpp_valdesc) > 0 ? datas.trpp_valdesc + '' : '0'
  const valorJuros = Number(datas.trpg_valjur) > 0 ? datas.trpg_valjur + '' : '0'

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>
          <Text style={styles.title}>Código da parcela: </Text>
          {datas.trpp_cod}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Código da transação: </Text>
          {datas.trpg_cod}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Número do documento: </Text>
          {datas.trpg_num_doc}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Data de vencimento parcela: </Text>
          {formatDate(dates)}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Data de origem transação: </Text>
          {formatDate(new Date(datas.trpg_dtorigem))}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Data de emissão transação: </Text>
          {formatDate(dates2)}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Tipo de documento: </Text>
          {datas.trpg_tipo_doc}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Fornecedor: </Text>
          {datas.forn_nome}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Sigla: </Text>
          {datas.trpp_sigla}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Item pcg: </Text>
          {datas.itpc_sigla} - {datas.itpc_desc}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Valor previsto: </Text>
          {changeReal(valorPrevisto)}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Valor desconto: </Text>
          {changeReal(valorDesconto)}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Valor bruto: </Text>
          {changeReal(valorBruto)}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Valor juros: </Text>
          {changeReal(valorJuros)}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Observação transação: </Text>
          {datas.trpg_obs}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Observação parcela: </Text>
          {datas.trpp_obs}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Centro de resultado: </Text>
          {datas.cere_sigla} - {datas.cere_nome}
        </Text>
      </View>
    </ScrollView>
  )
}
