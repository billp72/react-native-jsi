import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, NativeModules} from 'react-native';
import simpleJsiModule, {isLoaded} from 'react-native-jsi';

export default function App() {
  const [result, setResult] = React.useState();
  const [deviceName, setDeviceName] = React.useState();
  const [getItemValue, setGetItemValue] = React.useState();
  const [nums, setNums] = React.useState({
    num1:3,
    num2:4,
    answer:0
  });

  React.useEffect(() => {
    setResult(simpleJsiModule.helloWorld());
  }, []);

  return (
    <View style={styles.container}>
      <Text>Bindings Installed: {isLoaded().toString()}</Text>
      <Text>Result: {result}</Text>
      <TouchableOpacity
        onPress={() => {
          let value = simpleJsiModule.getDeviceName();
          setDeviceName(value);
        }}
        style={styles.button}>
        <Text style={styles.buttonTxt}>Device Name: {deviceName}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          simpleJsiModule.setItem('helloworld', 'Hello World');
        }}
        style={styles.button}>
        <Text style={styles.buttonTxt}>setItem: "Hello World"</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setGetItemValue(simpleJsiModule.getItem('helloworld'));
        }}
        style={styles.button}>
        <Text style={styles.buttonTxt}>getItem: {getItemValue}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          simpleJsiModule.foo((error, result) => {
            console.log('error:', error, 'result:', result);
          });
        }}
        style={styles.button}>
        <Text style={styles.buttonTxt}>
          Async callback (Runs on seperate thread in c++)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          simpleJsiModule.multiplyWithCallback(nums.num1,nums.num2,(answer) => {
            setNums({num1:nums.num1+1,num2:nums.num2+1,answer:answer})
          });
        }}
        style={styles.button}>
        <Text style={styles.buttonTxt}>answer: {nums.answer}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    width: '95%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonTxt: {
    color: 'white',
  },
});
