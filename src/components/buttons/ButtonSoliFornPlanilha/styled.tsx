import styled from 'styled-components/native'

export const AreaBtn = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;

`
export const Btn = styled.TouchableOpacity`
    flex:1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const BtnText = styled.Text`
    font-weight: bold;
    font-size: 18px;
`

export const CircleArea = styled.View`
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-radius: 15px;
    border-width: 2px;
    border-color: #000;
    padding: 2px;
`
interface propsStyleCircleAreaInto {
    backgroound: string;
}

export const CircleAreaInto = styled.View < propsStyleCircleAreaInto>`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.backgroound};
    border-radius: 15px;
`
