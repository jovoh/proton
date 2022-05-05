import React, { useMemo } from 'react'

//import MOCK_DATA from './MOCK_DATA.json'

import './App.css'




import {useState, useEffect} from "react";
import './App.css';
import {db} from './firebase-config'
import {collection, getDocs,addDoc,updateDoc,doc,deleteDoc} from "firebase/firestore"





function App() {





  
    


  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newSex, setNewSex] = useState("");

  const [users,setUsers]= useState([]);
  const usersCollectionRef = collection(db,"users");

  const getUsers = async()=>{
    const data = await getDocs(usersCollectionRef)
    //console.log(data);
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
      
    <table>
        <tr>
          <td>
          Name : 
          </td>
          <td>
            <input placeholder="Name...." onChange={(event) => {setNewName(event.target.value)}}/>     
          </td>
        </tr>
        <tr>
          <td>
          Age :
          </td>
          <td>
            <input type ="number" placeholder="Age...." onChange={(event) => {setNewAge(event.target.value)}} />      
          </td>
        </tr>
        <tr>
          <td>
          Sex :
          </td>
          <td>
           {/* <input  placeholder="Sex ....." onChange={(event) => {setNewSex(event.target.value)}} />   */}

            <select style={{width:'150px'}} onChange={(event) => {setNewSex(event.target.value)}}>
              
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
            </select>

          </td>
        </tr><tr>
          <td>
           
          </td>
          <td>
            <button onClick ={createUser}> Create User </button>     
          </td>
        </tr>
    </table>
    
                
       {users.map((user) => {
          return (
            <div>
              {" "}
              <table id ="customers">
      
    <tr>
                  <th >wait</th>
                  <th >wait</th>
                  <th >Name</th>
                  <th >Age</th>
                  <th >Sex</th>
                </tr>
               
              <tr>
                  <td><button onClick={()=> {
                 updateUser(user.id,user.age);
              }}>Increase Age</button></td>
                  <td><button onClick={()=> {
                 deleteUser(user.id);
              }}>Delete User</button></td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.sex}</td>
                </tr>
              
              
          </table>
               
               
              
              
            </div>
          );
  
       }) //end map
       
       
       }
     
    </div>
  );
}

export default App;
