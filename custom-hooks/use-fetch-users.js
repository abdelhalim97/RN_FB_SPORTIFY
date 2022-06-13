import { useState, useEffect } from "react";
import { ref,onValue } from 'firebase/database'
import {  db } from "../firebase";

const useFetchUsers = ()=>{
    const [data, setData] = useState([]);
    useEffect(() => {
        onValue(ref(db,'users'),(snapshot)=>{
          setData([])
          const dataLocal = snapshot.val();
          if(dataLocal!==null){
            Object.values(dataLocal).map((d)=>{
                setData((oldArray)=>[...oldArray,d]);
              return 0
            })
          }
        })
    }, [])
    return data
}
export default useFetchUsers