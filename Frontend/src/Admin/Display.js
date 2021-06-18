import React from 'react'
import {Socket} from "../User/Search_pincode"
// console.log(Socket)
function Display({name,pincode,admin,seen}) {
    console.log(seen)
    const styles={
        background:"rgb(188, 227, 243)",
        textAlign:"left",
        padding:"10px"
    }
    const after={
        background:"none",
        textAlign:"left",
        padding:"10px"
    }

    // sending to Socket for Seend Alerts and changing the color after seen
    const handleData=(e)=>{
        e.preventDefault()
        alert("you are seen this Notification")
        Socket.emit("message",{name,pincode,admin})
    }
    return (
        <>
            <div onClick={handleData} style={seen?after:styles}>{name} searched for {pincode}</div>
        </>
    )
}

export default Display
