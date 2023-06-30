import styled from 'styled-components/native'

interface propsStyleCircleAreaInto {
    backgroound: string;
}

export const Area = styled.View`
    height: 50px;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const CheckBox = styled.TouchableOpacity`
    flex:1;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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

export const CircleAreaInto = styled.View < propsStyleCircleAreaInto>`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.backgroound};
    border-radius: 15px;
`

export const CheckboxText = styled.Text`
    margin-left: 20px;
    color: #000;
    font-size: 16px;
`
