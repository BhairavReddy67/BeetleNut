const app=require("express")();
const http=require("http").createServer(app)
const io=require("socket.io")(http,{
    cors:{
        origin:"*"
    }
})

var port=3001
// storing all Alters and searched Peoples
var Storing=[]
io.on("connection",(socket)=>{
    socket.on("message",({name,pincode,admin,...obj})=>{
        console.log(admin)
        let count=0
        for(var i=0;i<Storing.length;i++){
            if(name==Storing[i].name&&Storing[i].pincode==pincode){
                // dividing data Admin and Branch Users for Changing status
                if(admin=="admin"){
                    Storing[i].admin=true
                }
                else if(admin in Storing[i]){
                    Storing[i][admin]=true
                }
                count++
                break
            }
        }
        if(count==0){
            Storing.push({name,pincode,admin,...obj})
        }
        console.log(Storing)
        io.emit("message",Storing)
    })
})



http.listen(port,"localhost",()=>{
    console.log("connecting port 8080",port)
})
