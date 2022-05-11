import React, { useMemo } from 'react'

//import MOCK_DATA from './MOCK_DATA.json'

import './App.css'




import {useState, useEffect} from "react";
import './App.css';
import {db} from './firebase-config'
import {collection, getDocs,addDoc,updateDoc,doc,deleteDoc,orderBy,query} from "firebase/firestore"
import { FirebaseError } from 'firebase/app';





function App() {

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newSex, setNewSex] = useState("");

  const [users,setUsers]= useState([]);
  const usersCollectionRef = collection(db,"users");


  const getUsers = async()=>{
    
    const data = await getDocs(usersCollectionRef)
    //console.log(data);
   // 
   
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id:doc.id})));

 
  };

//create new user  
const createUser = async()=> {
  await addDoc(usersCollectionRef, {name: newName, age :Number(newAge),sex:newSex});
  //await addDoc(usersCollectionRef, {name: newName, age :Number(newAge)});

  
  getUsers();



};
//test
const updateUser =async(id,age)=>{
  const userDoc = doc(db,"users",id);
  const newFields = {age: age + 1};
  await updateDoc(userDoc,newFields);
};
const deleteUser = async(id)=>{
  const userDoc = doc(db,"users",id);
  await deleteDoc(userDoc);
  getUsers();
};
  useEffect(() =>{
/*
    const getUsers = async()=>{
      const data = await getDocs(usersCollectionRef)
      //console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id:doc.id})));

    };*/
    getUsers();
  },[]);

  return (
    <div className="App">
          
          <table id ="customers">
                <thead>
                  <tr>
                      <th></th>
                      <th width={5}>wait</th>
                      <th width={50}>Name</th>
                      <th width={50}>Age</th>
                      <th width={50}>Sex</th>
                  </tr>
                </thead>

               { users.map((user) => (
                
              
              <tbody>
              <tr> 


                  <td width={50}><button onClick={()=> {
                 updateUser(user.id,user.age);
              }}>Increase Age</button></td>
                  <td width={50}><button onClick={()=> {
                 deleteUser(user.id);
              }}>Delete User</button></td>
                  <td width={50}>{user.name}</td>
                  <td width={50}>{user.age}</td>
                  <td width={50}>{user.sex}</td>
                </tr>
                </tbody>
                
               ))};
          </table>
   
    </div>
  );
}

export default App;
