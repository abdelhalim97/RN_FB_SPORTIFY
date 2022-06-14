import { useState, useEffect } from "react";
import { ref,onValue } from 'firebase/database'
import {  db } from "../firebase";

const useFetchUsers = ()=>{
    const [dataUsers, setDataUsers] = useState([]);
    useEffect(() => {
      onValue(ref(db,'users'),(snapshot)=>{
          setDataUsers([])
        const dataLocal = snapshot.val();
        if(dataLocal!==null){
          Object.values(dataLocal).map((d)=>{
              setDataUsers((oldArray)=>[...oldArray,d]);
            return 0
          })
        }
      })
  }, [])
    return dataUsers
}
export default useFetchUsers