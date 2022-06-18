import { ref, push, set } from 'firebase/database'
import {  db } from "../firebase";

const useAddReservation = (user,rent,timing)=>{
    const newRef=ref(db,'reservation')
      const newReservation=push(newRef)
      const newReservationKey = newReservation.key
        set(newReservation,{
            uid:newReservationKey,
            reserverEmail:user.email,
            stadiumUid:rent.uid,
            cost:rent.cost,
            year:timing.date.year,
            month:timing.date.month,
            day:timing.date.day,
            fromHours:timing.timeFrom.hours,
            fromMinutes:timing.timeFrom.minutes,
            toHours:timing.timeTo.hours,
            toMinutes:timing.timeTo.minutes,
          });
}
export default useAddReservation