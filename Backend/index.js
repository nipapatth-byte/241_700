const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 8000;

let users = [];
let counter = 1;
/**
 GET /users - ดึงข้อมุลทั้งหมด
 POST /users - เพิ่มผู้ใช้ใหม่
 GET /users/:id - ดึงข้อมูลผู้ใช้ตาม id
 PUT /users/:id - แก้ไขข้อมูลผู้ใช้ตาม ID ที่บันทึก
 DELETE /users/:id - ลบผู้ใช้ตาม ID ที่บันทึก
 */

// path: = /
app.get('/users',(req,res) => {
    res.json(users);
});
// path: = PORT /user
app.post('/user', (req,res) => {
    //res.json({massage: 'Data received successfully!'});
    let user = req.body;
    user.id = counter
    counter += 1;
    users.push(user);
    res.json({
        massage: 'User added succesfully',
        user: user
    });
    //res.send(req.body);
});

// path: = PUT /user/:id
app.patch('/user/:id', (req,res) => {
    let id = req.params.id;
    let updateUser = req.body;
    // หา users ที่จาก id ที่ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id);
    //res.send(selectedIndex + '')
    // อัพเดตข้อมูล users
    users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname;
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname;
    
    if(updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname;
    }
    if(updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname;
    }
    
    res.json({
        massage: 'User updated succesfully',
        data: {
            user: updateUser,
            indexUpdate: selectedIndex
        }
    });
    // ส่ง users ที่อัพเดทแล้วกลับไป
});

app.delete('/users/:id', (req,res) => {
    let id = req.params.id;

    //หา index จาก id ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id);
    users.slice(selectedIndex,1);
    //ลบ user ออกจาก users
    //delete users[selectedIndex];
    res.json({
        massage: 'User deleate succesfully',
        indexUpdate: selectedIndex
    });
});

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});



/**
//ทำการ import โมดูล http
const http = require('http');
const host = 'localhost';
const port = 8000;

//กำหนดค่า server

const reqestListener = function (req , res) {
    res.writeHead(200);
    res.end('Hello, World! This is my frist server.');
}
//run server
const server = http.createServer(reqestListener);
server.listen(port,host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});*/