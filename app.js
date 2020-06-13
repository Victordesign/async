const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

//CALL BACKS
// function getUsers(cb){
//   fs.readFile('data.json', 'utf8', (err, data) => {
//     if (err) 
//       return cb(err);
//     const users = JSON.parse(data);
//     return cb(null, users);
//   });
// }

// app.get('/', (req,res) => {
//   getUsers((err,users)=>{
//      if(err){
//          res.render('view',{error:err});
//      }else{
//         res.render('index',{title:'Users',users:users.users});
//      }
//   });
// }); 

function asyncHandler(cb){
  return async(req,res,next)=>{
    try{
       return await cb(req,res,next);
    }catch(err){
      res.render('error',{error:err});
  }
 }
}

// promise method
function getUsers(){
   return new Promise((resolve,reject)=>{
     fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){
           reject(err);
           console.log(err);
        }else{
           const users = JSON.parse(data);
           resolve(users);
           console.log(users);
        }
     })
   });
}

// app.get('/',(req,res)=>{
//   getUsers()
//   .then((users)=>{

//     res.render('index',{title:'Users',users:users.users})
//   })
//   .catch((err)=>{
//     res.render('error',{error:err});
//   })
// });

app.get('/', asyncHandler(async(req,res)=>{
  const users = await getUsers();
  res.render('index',{title:'Users',users:users.users})
}));


app.listen(3000, () => console.log('App listening on port 3000!'));