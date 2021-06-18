import axios from 'axios'
import React from 'react'
import Display from './Display'
import "../index.css"
function Admin({data}) {
    const [name1,setName]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [auth,setAuth]=React.useState(false)
    var reverseData=[...data]
    reverseData.reverse()
    const Styles={
        margin:"5px auto",
        padding:"10px",
        border:"2px solid grey",
        boxShadow:"2px 2px 2px grey"
    }
    // Entering the Branch or Admin to Check the Alerts
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios("http://localhost:3010/brachLogin")
        .then(res=>{
            var Auth=res.data
            for(var i=0;i<Auth.length;i++){
                if(Auth[i]["Branch Name"]==name1&&Auth[i]["password"]==password){
                    setAuth(true)
                    break;
                }
            }
        })
    }

    return (
        <div>
            {!auth?<form onSubmit={handleSubmit}>
                <input value={name1} placeholder="User Name" onChange={(e)=>setName(e.target.value)}/>
                <input value={password} type="password" placeholder="Password" 
                onChange={(e)=>setPassword(e.target.value)}/>
                <input value="Login" type="submit"/>
            </form>:<div>
                    <p>Your are a {name1} branch</p>
                    {/* Data displaying which is seen or unseen Notification by changeing the Color */}
                    <table style={Styles}>
                        <td>{reverseData.filter(e=>name1 in e).map(e=><tr><Display seen={e[name1]} name={e.name} pincode={e.pincode} admin={name1}/></tr>)}</td>
                    </table>
                </div>}
        </div>
    )
    }

export default Admin
