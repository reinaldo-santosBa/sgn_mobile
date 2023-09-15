import styled from 'styled-components/native'

const AreaModal = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00000043;
`
const AreaContent = styled.ScrollView`
    width: 90%;
    background: #f1f1f1;
    padding: 0px 24px;
`
const TextTitleMain = styled.Text`
    font-size: 32px;
    width: 100%;
    text-align: center;
    font-weight: 900;
    letter-spacing: 5px;
`
const TextSubTitleMain = styled.Text`
    font-size: 16px;
    width: 100%;
    text-align: center;
    font-weight: 600;
    margin: 5px 0;
`
const TextTitleParagraph = styled.Text`
    font-size: 24px;
    width: 100%;
    font-weight: 900;
    letter-spacing: 5px;
    margin: 10px 0px;
`
const TextParagraph = styled.Text`
    font-size: 18px;
    width: 100%;
    font-weight: 900;
    text-align: justify;
    letter-spacing: 2px;
`
const CheckBoxArea = styled.TouchableOpacity`
    width: 90%;
    margin: 0 auto;
    height: auto;
    margin-bottom: 20px;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
`
const CheckBox = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #000;

`

const CheckBoxText = styled.Text`
    font-size: 18px;
    font-weight: 600;
`
interface IPropsBtn {
    color: string;
}

const BtnAceito = styled.TouchableOpacity<IPropsBtn>`
    width: 80%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.color};
    border-radius: 10px;
    margin: 20px auto;
`
const TxtBtn = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: 600;
`
export {
  AreaModal,
  AreaContent,
  TextTitleMain,
  TextSubTitleMain,
  TextTitleParagraph,
  TextParagraph,
  CheckBoxArea,
  CheckBox,
  CheckBoxText,
  BtnAceito,
  TxtBtn
}
