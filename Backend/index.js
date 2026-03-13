const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
app.use(bodyParser.json());
const cors = require('cors');
 
app.use(cors());

let conn = null;
const initMtSQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port:8700
    });
    console.log('Connected to MySQL database');
}

app.get('/users', async(req,res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})

const validateData = (userData) => {
    let errors = [];
    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล')
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ')
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ')
    }
    if (!userData.interests) {
        errors.push('กรุณาเลือกงานอดิเรก')
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย')
    }
    return errors;
}

app.post('/users', async(req,res) => {
    try {
        let user = req.body;
        const errors = validateData(user);
        if (errors.length > 0){
            throw{
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        const results = await conn.query('INSERT INTO users SET ?',user);
        console.log('results:',results);
        res.json({
            massage: 'User added successfully',
            data: results[0]
        });
    }catch (error) {
        const errorMessage = error.massage || 'Error adding user';
        const errors = error.errors || [];
        console.error('Error inserting user:',error);
        res.status(500).json({
             message: errorMessage,
             errors: errors
        });
    }
})

app.get('/users/:id', async (req,res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT *FROM users WHERE id = ?',id);
        if (results[0].length === 0) {
            throw {statusCode: 404, message: 'User not found'};
        }
        res.json(results[0][0]);
    } catch (error) {
        console.error('Error fetching user:',error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({ 
            message: error.massage || 'Error fetching user'});
    }
})

//Path: put
app.put('/users/:id', async (req,res) => {
    try{
        let id = req.params.id;
        let updateUsers = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?',[updateUsers,id]);

        res.json({
            message: 'User updated successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('Error updating user:',error);
        res.status(500).json({ message: 'Error updating user'});
    }
});

app.delete('/users/:id', async (req,res) => {
    try{
        let id = req.params.id;
        const results = await conn.query('DELETE FROM users WHERE id = ?',[id]);
        res.json({
            massage: 'User deleted successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('Error deleting user:',error);
        res.status(500).json({ message: 'Error deleting user'});
    }
})

app.listen(port, async () => {
    await initMtSQL();
    console.log(`server is running on http://localhost:${port}`);
});


/** 
app.get('/testdb-new', async (req,res) => {
    try{
        const results = await conn.query('SELECT * FROM users');
        res.json(results[0]);
    } catch (err) {
        console.error('Error connecting to the database:',err);
        res.status(500).json({ error: err.message});
    }
});*/


/**
//เส้น API : testdb แบบยาว
app.get('/testdb', (req, res) => {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port:8700
    }).then((conn) => {
        conn
        .query('SELECT * FROM users')
        .then((results) => {
        res.json(results[0]);
        }).catch((err) => {
        res.json({ error: err.message});
        });
    })
})*/

/**
let users = [];
let counter = 1;
 GET /users - ดึงข้อมุลทั้งหมด
 POST /users - เพิ่มผู้ใช้ใหม่
 GET /users/:id - ดึงข้อมูลผู้ใช้ตาม id
 PUT /users/:id - แก้ไขข้อมูลผู้ใช้ตาม ID ที่บันทึก
 DELETE /users/:id - ลบผู้ใช้ตาม ID ที่บันทึก


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
}); */



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