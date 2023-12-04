import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View,FlatList, SectionList } from 'react-native';

const App=()=> {
const empdata=[
{id:1,Name:"Hammad",data:["PHP","React-native","React-JS","JavaScript","Android"]},
{id:2,Name:"Jawad",data:["Angular","React-native","React-JS","JavaScript","Android"]},
{id:3,Name:"Usman",data:["Web-Eng","React-native","React-JS","JavaScript","Android"]},
{id:4,Name:"hanzala",data:["Word-Press","React-native","React-JS","JavaScript","Android"]},
{id:5,Name:"Ayesha",data:["Html/CSS","React-native","React-JS","JavaScript","Android"]},
{id:6,Name:"Alizy",data:["Flutter","React-native","React-JS","JavaScript","Android"]},
{id:7,Name:"izza",data:["Web-Tech","React-native","React-JS","JavaScript","Android"]},
{id:8,Name:"Ali",data:["PHP","React-native","React-JS","JavaScript","Android"]},
]
return (
<View>
<Text style={{fontSize:28,marginLeft:105}}>SelectionList</Text>
<SectionList
sections={empdata}
renderItem={({item})=><Text style={{fontSize:20,marginLeft:30}}>{item}</Text>}
renderSectionHeader={({section:{Name}})=>(
<Text style={{fontSize:25,color:'yellow'}}>{Name}</Text>
)}
/>
</View>
)
}
const styless=StyleSheet.create({
BoxDesign:{
color:'#708090',
fontSize:18,
borderColor:'red',
margin:10,
backgroundColor:'#d2b48c',
marginBottom:10,
padding:10,
borderRadius:10
}
})
export default App;
