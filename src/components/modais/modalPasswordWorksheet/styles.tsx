import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

export const bg = styled.View`
    flex:1;
    background-color:#12121288;
    display:flex;
    justify-content:center;
    align-items:center;
`
export const areaInput = styled.View`
    width:80%;
    height: auto;
    background-color: #e1e1e1;
    border-radius:10px;
    justify-content: center;
    align-items: center;
    padding-bottom:50px;
`

export const BtnExit = styled.TouchableOpacity`
    height:40px;
    width:40px;
    position:absolute;
    top:10px;
    right:10px;
`
export const IconF = styled(Icon).attrs({
  name: 'x-circle',
  size: 40,
  color: '#e1e1e1'
})`
    flex:1;
`

export const BtnArea = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    background-color:#3470A4;
    border-radius:10px;
    margin-top:30px;
    justify-content: center;
    align-items: center;
`

export const BtnText = styled.Text`
    color:#FFF;
    font-size:20px;
    font-weight:bold;
`
