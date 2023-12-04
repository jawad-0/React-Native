import React ,{useState,useEffect}from 'react';
import { StyleSheet,Text,View,FlatList,TextInput,Button,TouchableOpacity } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const db=openDatabase({
name:'mydb'
});

export default function App()
{
  const[wish,setWish]=useState('');
  const[btnLabel,setBtnLabel]=useState('Add');
  const[wishList,setWishList]=useState([]);
useEffect(()=>{
  createTables()
  fetchData()
},[]);
function fetchData(){
  console.log('fetch method called')
  db.transaction(txn=>{
    txn.executeSql(`select * from wish`,[],
    (txSql,res)=>{
    let list=[]
    let len=res.rows.length;
    console.warn(len)
    if(len>0){

      for(let i=0;i<len;i++){
      let item=res.rows.item(i)
      list.push(item)
      console.log(item)
      }
      setWishList(list)
    }
    else{
      setWishList([])
    }

    },(error)=>{
      console.log("error occured during table creation!")
    });
  }
   );
}

function deleteAll(){
  db.transaction(txn=>{
    txn.executeSql(`delete from wish`,[],
    (txSql,res)=>{
     console.log("All records deleted successfully !")
     fetchData()
    },(error)=>{
      console.log("error occured during deletion of Data!")
    });
  }
   );
}

function deleteById(id){
  db.transaction(txn=>{
    txn.executeSql(`delete from wish where id=?`,[id],
    (txSql,res)=>{
     console.log("All records deleted successfully !")
     fetchData()
    },(error)=>{
      console.log("error occured during deletion of Data!")
    });
  }
   );
}
function createTables(){
  console.log('create tables called..')
  db.transaction(txn=>{
    console.log('txn')
    txn.executeSql(`create table if not exists wish (id integer primary key autoIncrement,wishName varchar(50))`,
    [],
    (txSql,res)=>{
     console.log("Table created successfully !")
    },(error)=>{
      console.log("error occured during table creation!")
    });
  }
   );

}

  function insertData(){
console.log('insert method called')
    db.transaction(txn=>{
      txn.executeSql(`insert into wish (wishname) values (?)`,
      [wish],
      (txSql,res)=>{
       fetchData()
       console.log("Record inserted..!")
      },(error)=>{
        console.log("error occured during data insertion!")
      });
    }
     );

  }
  function wishDatacomponent({item}){
    return(
      <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:20,color:'blue'}}>{item.wishName}</Text>
        <TouchableOpacity onPress={()=>deleteById(item.id)}>
          <Text style={{color:'red', fontFamily:'arial',fontSize:12}}>Delete</Text>
          </TouchableOpacity>
      </View>
    )
  }
  return(
    <View style={{flex:1}}>
      <Text style={{fontSize:18,color:'purple'}}> Wish:</Text>
      <TextInput value={wish} onChangeText={(value)=>setWish(value)} />
      <Button title={btnLabel} onPress={()=>insertData()}></Button>
      <Button title="Delete All" onPress={()=>deleteAll()}></Button>
      <FlatList data={wishList} renderItem={wishDatacomponent} />

    </View>
  )
}
