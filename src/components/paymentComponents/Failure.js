import axios from "../../config/axios"
import { useEffect } from "react"


export default function Failure(){

    //deleting payment if failure
    useEffect(()=>{
        (async ()=>{
                try{   
                    const stripeid = localStorage.getItem("stripeid") 
                    if(stripeid){
                        const response = await axios.delete(`/api/payment-delete/${stripeid}`)
                        console.log(response.data)
                        if(response.data){
                            localStorage.removeItem("stripeid")
                        }
                    }
                }catch(e){
                    console.log(e)
                }
        })()
    },[])

    return(
        <div>
            Failure
        </div>
    )
}