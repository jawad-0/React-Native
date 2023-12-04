import React, {useState, useRef} from 'react';
import CustomAlert from './CustomAlert';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';

// import { CheckBox } from 'react-native-elements';
// GITLAB TOKEN :> glpat-_rZaSx_szvtR2sqKbevc

function App() {
  const [count, setCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const onPress1 = () => setCount(prevCount => prevCount + 1);
  const onPress2 = () => setCount(prevCount => prevCount - 1);
  const [val1, setVal1] = useState(null);
  const [val2, setVal2] = useState(null);
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState(null);
  const val1Ref = useRef(null);
  const val2Ref = useRef(null);
  let data = ['Java','JS','C-Sharp','Python','PHP'];

  function formatResult(value) {
    const roundedValue = parseFloat(value.toFixed(7));
    return roundedValue.toString();
  }

  const calculate = operator => {
    if (val1 === null && val2 === null) {
        alert('Please Enter Any Value !');
        setShowAlert(true);
    return;
      }

    let ans = 0;
    if (operator === '+') {
      ans = formatResult((parseFloat(val1) || 0) + (parseFloat(val2) || 0));
    } else if (operator === '-') {
      ans = formatResult((parseFloat(val1) || 0) - (parseFloat(val2) || 0));
    } else if (operator === '*') {
      ans = formatResult((parseFloat(val1) || 0) * (parseFloat(val2) || 0));
    } else if (operator === '/') {
      ans = formatResult((parseFloat(val1) || 0) / (parseFloat(val2) || 1));
    } else if (operator === '**') {
      var sq1 = formatResult((parseFloat(val1) || 0) * (parseFloat(val1) || 0));
      var sq2 = formatResult((parseFloat(val2) || 0) * (parseFloat(val2) || 0));
      ans = sq1 + ' , ' + sq2;
    } else if (operator === '%') {
      const val1Int = parseFloat(val1);
      const val2Int = parseFloat(val2);
      ans = formatResult(val1Int % val2Int);
    }
    setResult(ans);
    setOperator(operator);
    setShowAlert(false);
  };
  const clear = () => {
    setVal1(null);
    setVal2(null);
    setResult(0);
    setCount(0);
    val1Ref.current.clear();
    val2Ref.current.clear();
    // if (val1Ref.current) {
    //     val1Ref.current.focus();
    //   }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const myStyle = StyleSheet.create({
    buttons:{
      width: '47%',
      alignSelf: 'center',
      margin: 5,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    countContainer: {
      alignItems: 'center',
      padding: 10,
    },
    clearButton: {
      width: 120,
      height: 40,
      borderRadius: 25,
      backgroundColor: '#f74545',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    plusButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'green',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      marginLeft: 140,
    },
    minusButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'red',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    clearText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
    plusSign: {
      fontSize: 24,
      color: 'white',
      fontWeight: 'bold',
    },
    txtInp: {
      borderWidth: 2,
      borderColor: 'white',
      width: '50%',
      alignSelf: 'center',
      textAlign: 'center',
      borderRadius: 35,
      margin: 10,
      fontSize: 25,
      color: 'white',
    },
    txt1: {
      fontSize: 35,
      fontFamily: 'fantasy',
      alignSelf: 'center',
      color: '#00ff95',
    },
    txt2: {
      fontSize: 32,
      fontFamily: 'fantasy',
      alignSelf: 'center',
      color: '#00ff95',
    },
    txt3: {
        fontSize: 32,
        fontFamily: 'fantasy',
        alignSelf: 'center',
        color: 'yellow',
      },
    btnView: {
      width: '47%',
      alignSelf: 'center',
      margin: 5,
    },
    btnView2: {
      width: '50%',
      alignSelf: 'center',
      margin: 15,
    },
    name: {
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'fantasy',
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View>
        <Text style={myStyle.txt1}>CALCULATOR 🤍</Text>
        <Text style={myStyle.name}>
          By M.Jawad Gujjar © {'\n'}
          {'\n'}
        </Text>
        <TextInput
          ref={val1Ref}
          onChangeText={setVal1}
          style={myStyle.txtInp}
          placeholder=" Value 1"
          keyboardType="numeric"></TextInput>
        <TextInput
          ref={val2Ref}
          onChangeText={setVal2}
          style={myStyle.txtInp}
          placeholder=" Value 2"
          keyboardType="numeric"></TextInput>
        <Text style={myStyle.txt2}>
          {'\n'} Result : {result} {'\n'}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={myStyle.buttons} onPress={() => calculate('+')}>
                <Text style={myStyle.clearText}>ADD (+)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={myStyle.buttons} onPress={() => calculate('-')}>
                <Text style={myStyle.clearText}>SUBTRACT (-)</Text>
          </TouchableOpacity>
          <CustomAlert isVisible={showAlert} onClose={closeAlert} />
        {/* <View style={myStyle.btnView}>
          <Button onPress={() => calculate('+')} title="ADD (+)"></Button>
        </View> */}
        {/* <View style={myStyle.btnView}>
          <Button onPress={() => calculate('-')} title="SUBTRACT (-)"></Button>
        </View> */}
      </View>
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={myStyle.buttons} onPress={() => calculate('*')}>
                <Text style={myStyle.clearText}>MULTIPLY (*)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={myStyle.buttons} onPress={() => calculate('/')}>
                <Text style={myStyle.clearText}>DIVIDE (/)</Text>
          </TouchableOpacity>
        {/* <View style={myStyle.btnView}>
          <Button onPress={() => calculate('*')} title="MULTIPLY (*)"></Button>
        </View> */}
        {/* <View style={myStyle.btnView}>
          <Button onPress={() => calculate('/')} title="DIVIDE (/)"></Button>
        </View> */}
      </View>
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={myStyle.buttons} onPress={() => calculate('**')}>
                <Text style={myStyle.clearText}>SQUARE (**)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={myStyle.buttons} onPress={() => calculate('%')}>
                <Text style={myStyle.clearText}>MODULUS (%)</Text>
          </TouchableOpacity>
        {/* <View style={myStyle.btnView}>
          <Button onPress={() => calculate('**')} title="SQUARE (**)"></Button>
        </View> */}
        {/* <View style={myStyle.btnView}>
          <Button onPress={() => calculate('%')} title="MODULUS (%)"></Button>
        </View> */}
      </View>
      <View style={{flexDirection: 'col'}}>
        <View style={myStyle.btnView2}>
          {/* <Button onPress={clear} title="CLEAR (x)"></Button> */}
          <TouchableOpacity style={myStyle.clearButton} onPress={clear}>
            <Text style={myStyle.clearText}>CLEAR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={(myStyle.container, {flexDirection: 'col'})}>
        <View style={myStyle.countContainer}>
          <Text style={myStyle.plusSign}> --- Count : {count} --- </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={myStyle.plusButton} onPress={onPress1}>
            <Text style={myStyle.plusSign}> + </Text>
          </TouchableOpacity>

          <TouchableOpacity style={myStyle.minusButton} onPress={onPress2}>
            <Text style={myStyle.plusSign}> - </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View>
        <Text style={myStyle.txt3}>Top Language</Text>
      </View> */}
      {/* <CheckBox
        value={useState.react}
        onValueChange={(value)=>
        setState((prevState)=>({...prevState,react:value}))
        }
       /> */}
    </View>
  );
}

// return(
//     <View>
//         <Text style={{fontSize:30}}>HELLO</Text>
//         <Text style={{fontSize:30}}>ITS GUJJAR</Text>
//     </View>
// );

export default App;
