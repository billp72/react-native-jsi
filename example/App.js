/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React from 'react';
 import type {Node} from 'react';
 import simpleJsiModule, {isLoaded} from 'react-native-jsi';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TouchableOpacity,
   NativeModules,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 // const Section = ({children, title}): Node => {
 //   const isDarkMode = useColorScheme() === 'dark';
 //   return (
 //     <View style={styles.sectionContainer}>
 //       <Text
 //         style={[
 //           styles.sectionTitle,
 //           {
 //             color: isDarkMode ? Colors.white : Colors.black,
 //           },
 //         ]}>
 //         {title}
 //       </Text>
 //       <Text
 //         style={[
 //           styles.sectionDescription,
 //           {
 //             color: isDarkMode ? Colors.light : Colors.dark,
 //           },
 //         ]}>
 //         {children}
 //       </Text>
 //     </View>
 //   );
 // };
 
 const App: () => Node = () => {
   const [result, setResult] = React.useState();
   const [cb, setCb] = React.useState();
   const [deviceName, setDeviceName] = React.useState();
   const [getItemValue, setGetItemValue] = React.useState();
   const [nums, setNums] = React.useState({
     num1:3,
     num2:4,
     answer:0
   });
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   React.useEffect(() => {
     setResult(simpleJsiModule.helloWorld());
   }, []);
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <Header />
         <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
           <View style={styles.container}>
            <Text>Bindings Installed: {isLoaded().toString()}</Text>
            <Text>Result: {result}</Text>
            <Text>{cb}</Text>
           </View>
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
                 //console.log('error:', error, 'result:', result);
                 setCb(result)
                 //console.log("Bill")
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
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
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
 
 export default App;
 