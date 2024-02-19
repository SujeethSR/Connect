import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const App = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState(null);

  const handleInput = (buttonPressed) => {
    if (buttonPressed === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
      setPreviousInput(currentInput);
      setCurrentInput('');
      setOperator(buttonPressed);
    } else if (buttonPressed === '=') {
      const result = calculate();
      setCurrentInput(result);
      setOperator(null);
      setPreviousInput('');
    } else {
      setCurrentInput(currentInput + buttonPressed);
    }
  };

  const calculate = () => {
    switch (operator) {
      case '+':
        return String(parseFloat(previousInput) + parseFloat(currentInput));
      case '-':
        return String(parseFloat(previousInput) - parseFloat(currentInput));
      case '*':
        return String(parseFloat(previousInput) * parseFloat(currentInput));
      case '/':
        return String(parseFloat(previousInput) / parseFloat(currentInput));
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{currentInput}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('1')}><Text>1</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('2')}><Text>2</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('3')}><Text>3</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('+')}><Text>+</Text></TouchableOpacity>
      </View>
      {/* Add more rows for other numbers and operators */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('=')}><Text>=</Text></TouchableOpacity>
        {/* Add other buttons as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    fontSize: 30,
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#e4e4e4',
    padding: 20,
    margin: 5,
  },
});

export default App;
