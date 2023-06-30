import { Platform } from 'react-native'
import React, { useState } from 'react'
import * as S from './styles'
import DateTimePicker from '@react-native-community/datetimepicker'

interface props {
  dtFormatada: string
  setDtFormatada: (dtFormatada: string) => void
  setDtFormatadaRequest: (dtFormatada: string) => void
}
const InputDatePickerSelect: React.FC<props> = ({ dtFormatada, setDtFormatada, setDtFormatadaRequest }) => {
  const [isPickerShow, setIsPickerShow] = useState(false)
  const d = new Date()
  const [date, setDate] = useState(new Date(`${d}`))
  const showPicker = () => {
    setIsPickerShow(true)
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date

    if (Platform.OS === 'android') {
      setIsPickerShow(false)
    }
    const mes1 = currentDate.getUTCMonth() + 1

    let data = ''
    let mes = ''
    const ano = currentDate.getUTCFullYear()
    setDate(currentDate)
    if (currentDate.getUTCDate() < 10) {
      data = '0' + currentDate.getUTCDate()
    } else {
      data = currentDate.getUTCDate()
    }
    if (mes1 < 10) {
      mes = '0' + mes1
    } else {
      mes = mes1
    }

    const dataNova = `${data}/${mes}/${ano}`
    setDtFormatada(`${dataNova}`)
    setDtFormatadaRequest(`${ano}-${mes}-${data}`)
  }
  return (
    <>
      <S.AreaInput style={{ elevation: 5 }} onPress={showPicker}>
        <S.DataText>{`${dtFormatada}`}</S.DataText>
      </S.AreaInput>
      {isPickerShow && (
        <DateTimePicker
          value={date}
          testID="dateTimePicker"
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </>
  )
}

export default InputDatePickerSelect
