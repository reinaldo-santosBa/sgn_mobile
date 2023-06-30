import styled from 'styled-components/native'

export const Area = styled.View`
    flex:   1;
    background-color:#00000077;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ModalArea = styled.View`
    background-color:#ffffff;
    width: 80%;
    height: 60%;
    border-radius:20px;
    elevation:10;
    display: flex;
    align-items: center;
    justify-content: center;

`

export const ModalImg = styled.Image`
    width: 100%;
    height: 10%;
    margin-bottom:50px;
`

export const ModalText = styled.Text`
    font-size: 18px;
    color:#121212;
    text-align: justify;
    font-weight: 600;
    width:100%;
`

export const ModalFlatList = styled.FlatList`
    width: 80%;
    height: auto;
    max-height:30%;
    margin-bottom: 50px;

`

export const ModalBtn = styled.TouchableOpacity`
    width:80%;
    height: 50px;
    background:#3470A4;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ModalTextBTn = styled.Text`
    font-size: 30px;
    color:#FFF;
    text-transform: uppercase;
    font-weight: 900;
`
