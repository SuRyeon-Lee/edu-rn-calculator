import { useState } from 'react';

export const useCaulator = () => {
  /*
    presenter(Calculator, ui만 관여)에 보여줘야 되는 로직들만 내보냄으로써, 
    나머지 로직들은 use-calculator 안에 숨겨둘 수 있다.
    */
  const [input, setInput] = useState(0); //2 -> 14
  const [currentOperator, setCurrentOperator] = useState(null); //+ -> null
  const [result, setResult] = useState(null); //12 -> 14 ->(여기서 =을 또 누르면 +2가 또 되어야함)
  const [tempInput, setTempInput] = useState(null); //2
  const [tempOperator, setTempOperator] = useState(null); //+
  const [isClickedOperator, setIsClickedOperator] = useState(false);
  const [isClickedEqual, setIsClickedEqual] = useState(false);

  //   const hasInput = input ? true : false;
  const hasInput = !!input;

  const onPressNum = (num) => {
    if (currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      setIsClickedOperator(false);
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
      setIsClickedOperator(true);
      setIsClickedEqual(false);
    } else {
      let finalResult = result;
      const finalInput = isClickedEqual ? tempInput : input;
      const finalOperator = isClickedEqual ? tempOperator : currentOperator;
      switch (finalOperator) {
        case '+':
          finalResult = result + finalInput;
          break;
        case '-':
          finalResult = result - finalInput;
          break;
        case '*':
          finalResult = result * finalInput;
          break;
        case '/':
          finalResult = result / finalInput;
          break;
        default:
          break;
      }
      setResult(finalResult);
      setInput(finalResult);
      setTempInput(finalInput);
      setCurrentOperator(null);
      setTempOperator(finalOperator);
      setIsClickedEqual(true);
    }
  };

  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
    } else {
      setInput(0);
      setCurrentOperator(null);
      setResult(null);
      setTempInput(null);
      setTempOperator(null);
    }
  };

  return {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};
