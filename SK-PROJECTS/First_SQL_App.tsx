import{
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import React, { useEffect,useState } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

export default function App(){
    const navigation = useNavigation();
    const [name, setName] = useState('');
    



    return(
    <View style={{ flex: 1 }}>
        <Text style={{fontSize:20,color:'white'}}>Hy</Text>
    </View>
    );
}
