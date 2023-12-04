// import React , {useState,useEffect} from 'react'
// import { StyleSheet,Text,View,FlatList,TextInput,Button,TouchableOpacity} from 'react-native'
// import { openDatabase } from 'react-native-sqlite-storage'

// const db=openDatabase(
//     {
//       name:'wishTable'
//     }
//   )

//   function deleteAll() {
//     db.transaction(txn => {
//       txn.executeSql(
//         `DELETE FROM wish`,
//         [],
//         (sqlTxn, res) => {
//           console.log("Table deleted successfully");
//         },
//         error => {
//           console.log("Error on deleting table: " + error.message);
//         }
//       );
//     });
//   }

//   function deleteByID(id) {
//     db.transaction(txn => {
//       txn.executeSql(
//         `DELETE FROM wish WHERE id=?`,
//         [id],
//         (sqlTxn, res) => {
//           console.log("Row deleted successfully");
//         },
//         error => {
//           console.log("Error on deleting row: " + error.message);
//         }
//       );
//     });
//   }


//   function createTables() {
//     db.transaction(txn => {
//       txn.executeSql(
//         `CREATE TABLE IF NOT EXISTS wish (id INTEGER PRIMARY KEY AUTOINCREMENT, wishname VARCHAR(20))`,
//         [],
//         (sqlTxn, res) => {
//           console.log("Table created successfully");
//         },
//         error => {
//           console.log("Error on creating table: " + error.message);
//         }
//       );
//     });
//   }


// function insertData(){
//     console.log('Add Product Called')
//     console.log('Add Product in progress')
//         db.transaction(txn => {
//           txn.executeSql(
//             `INSERT INTO wish (name) VALUES (?)`,[wish],
//             (sqlTxn, res) => {
//               console.log(`${wishname} product added successfully`);
//               fetchData();
//               resetValues();
//             },
//             error => {
//               console.log("error on adding product " + error.message);
//             },
//           )
//         });
// }

// function fetchData(){
//     db.transaction(txn => {
//         txn.executeSql(
//           `SELECT * FROM products ORDER BY id DESC`,
//           [],
//           (sqlTxn, res) => {
//             console.log("products retrieved successfully");
//             let len = res.rows.length;
//             let results = [];
//             if (len > 0) {
//               for (let i = 0; i < len; i++) {
//                 let item = res.rows.item(i);
//                 results.push({ id: item.id, name: item.name });
//               }
//             }
//             setWishList(results);
//           },
//           error => {
//             console.log("error on getting products " + error.message);
//           },
//         );
//       });
// }

// export default function App(){
//     const [wish,setWish]=useState('')
//     const [btnLabel,setBtnLabel]=useState('Add')
//     const [wishList,setWishList]=useState([])

//     useEffect(()=>{
//         createTables()
//         fetchData()
//     },[]);



//     return(
//         <View style={{ flex:1 }}>
//             <Text style={{fontSize:18,color:'purple'}}>Wish :</Text>
//                 <TextInput value={} onChangeText={(value)=>set}/>
//                 <Button title={btnLabel} onPress={()=>insertData}></Button>
//         </View>
//     )
// }
