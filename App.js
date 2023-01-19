import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Calculator from './src/Calculator';

export default function App() {
  const [input, setInput] = useState(0); //2 -> 14
  const [currentOperator, setCurrentOperator] = useState(null); //+ -> null
  const [result, setResult] = useState(null); //12 -> 14 ->(여기서 =을 또 누르면 +2가 또 되어야함)
  const [tempInput, setTempInput] = useState(null); //2
  const [tempOperator, setTempOperator] = useState(null); //+

  return (
    <SafeAreaView style={styles.container}>
      <Calculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
