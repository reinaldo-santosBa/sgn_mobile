import React from 'react'
import { PermissionsAndroid } from 'react-native'
import Contacts from 'react-native-contacts'

import * as C from './styles'

interface Iprops {
  TELEFONE: string;
  EMAIL: string;
  ENDERECO: string;
  CIDADE: string;
  UF: string;
  NOME: string
}
const CardAgenda: React.FC<Iprops> = ({ TELEFONE, EMAIL, ENDERECO, CIDADE, UF, NOME }: Iprops) => {
  const handleClick = async () => {
    const estados = [
      { nome: 'Acre', sigla: 'AC' },
      { nome: 'Alagoas', sigla: 'AL' },
      { nome: 'Amapá', sigla: 'AP' },
      { nome: 'Amazonas', sigla: 'AM' },
      { nome: 'Bahia', sigla: 'BA' },
      { nome: 'Ceará', sigla: 'CE' },
      { nome: 'Distrito Federal', sigla: 'DF' },
      { nome: 'Espírito Santo', sigla: 'ES' },
      { nome: 'Goiás', sigla: 'GO' },
      { nome: 'Maranhão', sigla: 'MA' },
      { nome: 'Mato Grosso', sigla: 'MT' },
      { nome: 'Mato Grosso do Sul', sigla: 'MS' },
      { nome: 'Minas Gerais', sigla: 'MG' },
      { nome: 'Pará', sigla: 'PA' },
      { nome: 'Paraíba', sigla: 'PB' },
      { nome: 'Paraná', sigla: 'PR' },
      { nome: 'Pernambuco', sigla: 'PE' },
      { nome: 'Piauí', sigla: 'PI' },
      { nome: 'Rio de Janeiro', sigla: 'RJ' },
      { nome: 'Rio Grande do Norte', sigla: 'RN' },
      { nome: 'Rio Grande do Sul', sigla: 'RS' },
      { nome: 'Rondônia', sigla: 'RO' },
      { nome: 'Roraima', sigla: 'RR' },
      { nome: 'Santa Catarina', sigla: 'SC' },
      { nome: 'São Paulo', sigla: 'SP' },
      { nome: 'Sergipe', sigla: 'SE' },
      { nome: 'Tocantins', sigla: 'TO' }

    ]
    let estadoNome = ''
    estados.forEach(element => {
      if (element.sigla === UF) estadoNome = element.nome
    })
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal'
      }
    )
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal'
      }
    )
    const newPerson = {
      displayName: NOME,
      phoneNumbers: [
        {
          label: 'mobile',
          number: TELEFONE
        }
      ],
      emailAddresses: [{
        label: 'work',
        email: EMAIL
      }],
      postalAddresses: [{
        label: 'home',
        formattedAddress: '',
        street: ENDERECO,
        pobox: '',
        neighborhood: '',
        city: CIDADE,
        region: estadoNome,
        state: UF,
        postCode: '',
        country: 'BRASIL'
      }]
    }

    Contacts.openContactForm(newPerson).then(contact => {
      console.log('====================================')
      console.log(contact)
      console.log('====================================')
    })
  }

  return (
    <C.AreaCard
      onPress={() => {
        handleClick()
      }}
    >
      <C.TextCard>
        <C.TextTitleCard>Nome: </C.TextTitleCard>
        {NOME}
      </C.TextCard>
      <C.TextCard>
        <C.TextTitleCard>Tefefone: </C.TextTitleCard>
        {TELEFONE}
      </C.TextCard>
      <C.TextCard>
        <C.TextTitleCard>Email: </C.TextTitleCard>
        {EMAIL === '' ? 'Sem e-mail cadastrado' : EMAIL}
      </C.TextCard>
      <C.TextCard>
        <C.TextTitleCard>Endereço: </C.TextTitleCard>
        {ENDERECO} {CIDADE} - {UF}
      </C.TextCard>
    </C.AreaCard>
  )
}

export default CardAgenda
