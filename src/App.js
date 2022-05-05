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


//create new user  
const createUser = async()=> {
  await addDoc(usersCollectionRef, {name: newName, age :Number(newAge),sex:newSex});
  //await addDoc(usersCollectionRef, {name: newName, age :Number(newAge)});
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
};
  useEffect(() =>{

    const getUsers = async()=>{
      const data = await getDocs(usersCollectionRef)
      //console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id:doc.id})));

    };
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
            <input placeholder="Sex ....." onChange={(event) => {setNewSex(event.target.value)}} />       
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
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Sex: {user.sex}</h1>
              <button onClick={()=> {
                 updateUser(user.id,user.age);
              }}>Increase Age</button>
              <button onClick={()=> {
                 deleteUser(user.id);
              }}>Delete User</button>
            </div>
          );
  
         
       })}
     
    </div>
  );
}

export default App;
