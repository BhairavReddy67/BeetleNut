import React from 'react'
import axios from "axios"
import {io} from "socket.io-client"
import Admin from "../Admin/Admin"
export const Socket=io.connect("http://localhost:3001")
function Search_pincode() {

    const [pincode,setPincode]=React.useState("")
    const [name,setName]=React.useState("")
    const [chat,setChat]=React.useState([])
    const [admin,setAdmin]=React.useState(false)
    const [displayPincode,SetDisplayPincode]=React.useState([])

// Geeting Data through the Scoket
    React.useEffect(()=>{
        Socket.on("message",pincode=>{
            setChat([...pincode])
        })
    },[chat])

// Sending Data TO Socket accoding to Pincodes
    const handleClick=(e)=>{
        e.preventDefault()
        setPincode("")
        setName("")
        axios(`http://localhost:3010/beetleNut`)
        .then(res=>{
            let Data=res.data
            var x=Data.filter(e=>e["Pincode covered"].split(", ").filter(e=>e==pincode).join("")==pincode)
            var obj={}
            SetDisplayPincode(x)
            for(let i=0;i<x.length;i++){
                obj[x[i]["Branch Name"]]=false
            }
            Socket.emit("message",({pincode,name,admin:false,...obj}))
        })
        setPincode("")
        setName("")
    }
    return (
        <div>
            {!admin && <form onSubmit={handleClick}>
                <input value={pincode} placeholder={"Pincode"} onChange={(e)=>setPincode(e.target.value)}/>
                <input value={name} placeholder={"name"} onChange={(e)=>setName(e.target.value)}/>
                <input type="submit" value="search"/>
            </form>}
            <button onClick={()=>setAdmin(!admin)}>{admin?"Admin or Branch Logout":"Admin or Branch Login"}</button>
            {admin && <Admin data={chat}/>}

            {/* Listing the Available Pincode */}
            <table style={{margin:"5px auto"}}>
                <td>{displayPincode && displayPincode.map((e,i)=><tr style={{textAlign:"left"}}>{i+1}) {e["Branch Name"]}</tr>)}</td>
            </table>
        </div>
    )
}

export {Search_pincode}
