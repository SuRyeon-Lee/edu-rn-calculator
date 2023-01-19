import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, View, TouchableOpacity } from 'react-native';

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5f5e62',
  OPERATOR: '#f39c29',
  NUM: '#5c5674',
};

// Button type: 'reset' | 'operator' | 'num'
const Button = ({ text, onPress, flex, type, isSelected }) => {
  const backgroundColor =
    type === 'reset'
      ? COLOR.RESET
      : type === 'operator'
      ? COLOR.OPERATOR
      : type === 'num'
      ? COLOR.NUM
      : 'transparent';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: 'black',
      }}
    >
      <Text style={{ color: 'white', fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const InputContainer = styled.View`
  width: 100%;
  min-height: 50px;
  justify-content: center;
  align-items: flex-end;
  text-align: right;
  background-color: ${COLOR.RESULT};
  padding: 10px 5px;
`;

export default () => {
  const [input, setInput] = useState(0); //2 -> 14
  const [currentOperator, setCurrentOperator] = useState(null); //+ -> null
  const [result, setResult] = useState(null); //12 -> 14 ->(여기서 =을 또 누르면 +2가 또 되어야함)
  const [tempInput, setTempInput] = useState(null); //2
  const [tempOperator, setTempOperator] = useState(null); //+

  const onPressNum = (num) => {
    if (currentOperator) {
      setResult(input);
      setInput(num);
    } else {
      // const newInput = input + num; // bad case '4' + '5' > 45가아니라 9가 됨
      // const newInput = `${input}${num}`; //good case
      //여기서 맨 앞에 0이 붙을 경우 자동으로 떼기 위해서 또 number로 변환
      const newInput = Number(`${input}${num}`);
      setInput(newInput);
    }
  };

  const onPressOperator = (operator) => {
    if (operator !== '=') {
      setCurrentOperator(operator);
    } else {
      let finalResult = result;
      switch (currentOperator) {
        case '+':
          finalResult = result + input;
          break;
        case '-':
          finalResult = result - input;
          break;
        case '*':
          finalResult = result * input;
          break;
        case '/':
          finalResult = result / input;
          break;
        default:
          break;
      }
      setResult(finalResult);
      setInput(finalResult);
    }
  };

  const onPressReset = () => {
    setInput(0);
    setCurrentOperator(null);
    setResult(null);
    setTempInput(null);
    setTempOperator(null);
  };

  return (
    <View
      style={{
        flex: 1,
        width: 250,
        justifyContent: 'center',
      }}
    >
      <Text>input: {input}</Text>
      <Text>currenetOperator: {currentOperator}</Text>
      <Text>result: {result}</Text>
      <Text>tempinput: {tempInput}</Text>
      <Text>tempOperator: {tempOperator}</Text>

      {/* 결과 */}
      <InputContainer>
        <Text style={{ color: 'white', fontSize: 35 }}>{input}</Text>
      </InputContainer>

      {/* [AC ~ /] */}
      <ButtonContainer>
        <Button
          type="reset"
          text="AC"
          onPress={onPressReset}
          flex={3}
          //isSelected={false} //이런건 필요없음(어차피 안가면 undefined여서 false 처리되니까)
        />
        <Button
          type="operator"
          text="/"
          onPress={() => onPressOperator('/')}
          flex={1}
          isSelected={currentOperator === '/'}
        />
      </ButtonContainer>
      {/* [7 ~ x] */}
      <ButtonContainer>
        {[7, 8, 9].map((num) => (
          <Button
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="*"
          onPress={() => onPressOperator('*')}
          flex={1}
          isSelected={currentOperator === '*'}
        />
      </ButtonContainer>
      {/* [4 ~ -] */}
      <ButtonContainer>
        {[4, 5, 6].map((num) => (
          <Button
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="-"
          onPress={() => onPressOperator('-')}
          flex={1}
          isSelected={currentOperator === '-'}
        />
      </ButtonContainer>
      {/* [1 ~ +] */}
      <ButtonContainer>
        {[1, 2, 3].map((num) => (
          <Button
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="+"
          onPress={() => onPressOperator('+')}
          flex={1}
          isSelected={currentOperator === '+'}
        />
      </ButtonContainer>
      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button type="num" text="0" onPress={() => onPressNum(0)} flex={3} />
        <Button
          type="operator"
          text="="
          onPress={() => onPressOperator('=')}
          flex={1}
        />
      </ButtonContainer>
    </View>
  );
};
