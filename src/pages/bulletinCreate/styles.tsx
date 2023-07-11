import styled from 'styled-components/native'

export const AreaForm = styled.KeyboardAvoidingView`
  width: 80%;
  height: 80%;
  background-color: #FFF;
  border-radius: 20px;
  padding: 20px;
`
export const AreaProgressBar = styled.View`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
`

export const TextIcon = styled.Text`
  color: #fff;
  font-size: 25px;
`

export const AreaLine = styled.View`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
`
export const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: #3470A4;
`
export const IconStep = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #3470A4;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const AreaInput = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:30px;
`
