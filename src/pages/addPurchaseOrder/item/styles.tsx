import styled from 'styled-components/native'

export const AreaItem = styled.View`
    width: 100%;
    margin: 10px 0;
    padding: 5px 10px;
    border-top-width: 1px;
    border-top-style:solid;
    border-top-color: #3470A4;
    border-bottom-width: 1px;
    border-bottom-style:solid;
    border-bottom-color: #3470A4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const AreaContent = styled.View`
    flex:1;
`
export const ButtonSub = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color: #972222;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const AreaContentText = styled.View`
    display: flex;
    flex-direction: column;
`

export const TextContentTitle = styled.Text`
    font-size: 16px;
    font-weight: 900;
    color: #000;
`
export const TextContent = styled.Text`
    font-size: 16px;
    color: #000;
    
`
