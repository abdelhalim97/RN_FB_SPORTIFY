import { db } from "../firebase";
import { push, ref, set } from "firebase/database";
const useAddUser=(user,displayName)=>{
            const newRef=ref(db,'users')
            const newUserRef=push(newRef)
            const newUserKey=newUserRef.key
            set(newUserRef,{
              uid:newUserKey,
              displayName,
              email:user.email,
              userId:user.id?user.id:user.uid,
              photoURL:user.id?user.picture:user.photoURL,
            })
}
export default useAddUser
