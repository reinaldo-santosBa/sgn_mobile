import styled from 'styled-components/native'

export const AreaForm = styled.KeyboardAvoidingView`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 20px 30px;
`

export const AreaProgressBar = styled.View`
  margin-top: 30px;
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
export const AreaInput2 = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  flex-direction: column;
`
export const AreaInput2Header = styled.View`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

`
export const AreaInput2Flat = styled.FlatList`
  flex: 1;
  display: flex;
`
export const AreaBtns = styled.View`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`

interface btnProps {
  bg: string
}

export const ButtonPrevProx = styled.TouchableOpacity <btnProps>`
  flex: 1;
  height: 100%;
  background-color: ${(props) => props.bg};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const BtnDireto = styled.Pressable`
  flex-direction: row;
  gap:10px;
  align-items: center;
  justify-content: center;
  padding: 5px 20px;
`

export const TxtBtnDireto = styled.Text`
  color: #121212;
  font-size: 20px;
`

export const ButtonAdd = styled.TouchableOpacity`
  height: 40px;
  background-color: #3470A4;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
