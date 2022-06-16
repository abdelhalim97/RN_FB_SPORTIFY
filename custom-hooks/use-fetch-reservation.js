import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useFetchReservation = (rent) => {
const [rentData, setRentData] = useState([])
    useEffect(() => {
        if(rent?.uid){
        onValue(ref(db,'reservation'),(snapshot)=>{
          setRentData([])
          const dataLocalRent = snapshot.val();
          if(dataLocalRent!==null){
            Object.values(dataLocalRent).map((d)=>{
              if(d.stadiumUid===rent?.uid){
                setRentData((oldArray)=>[...oldArray,d]);
              }
              return 0
            })
          }
        })}  
    }, [rent])
  return rentData
  
}

export default useFetchReservation