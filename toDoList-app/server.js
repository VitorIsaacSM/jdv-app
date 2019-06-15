const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jwt-simple');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');

app.use(express.static(path.join(__dirname, 'dist/toDoListApp')));

app.listen(process.env.PORT || 3000);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname , 'dist/toDoListApp/index.html'));
});

app.post('/register', (req, res)=> {
    let user = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        id: 0
    };

    users = getUsers();

    if(!checkUsername(users, user.username)){
        return res.send({invalidUsername: true});
    }

    user.id = users.length;

    users.push(user);

    saveOnFile(users, 'users.json');

    let todoList = getDataFromFile();

    todoList.push([]);

    saveOnFile(todoList, 'data.json');

    res.json(user);
});

app.post('/tokenCheck', (req, res) => {
    
    console.log(req.body);
    let token = req.body.token;
    
    if(token){
        let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
        users = getUsers();
        myUser = users.filter( user => { return user.id == decoded.iss});
        myUser = myUser[0];
        return res.send({name: myUser.username});
    }
    else{
        return res.json({noToken: true});
    }

});

app.post('/login', (req, res)=> {
  
    let username = req.body.username;
    let password = req.body.password;

    let users = getUsers();

    user = users.filter( user => {
        return user.username == username;
    })

    console.log(user.length);
    if(user.length > 1){
        return res.status(503).json({err: 'server is fucked'});
    }
    

    else if(user.length == 0){
        return res.json({invalid: true});
    }

    else{
        if(user[0].password == password){
            console.log(...user);

            let token = jwt.encode({
                iss: user[0].id,
                exp: null
            }, app.get('jwtTokenSecret'));

            res.json({
                token: token
            })
        }
        else{
            res.json({invalid: true});
        }
    }
        
    
});

app.post('/getTodos', (req, res) => {
    let myUser = validateToken(req.body.token);

    let todoList = getDataFromFile();

    res.json(todoList[myUser.id]);
    
});

app.post('/addTodo', (req, res) => {

    let myUser = validateToken(req.body.token);

    let todo = {
        title: req.body.todo.title,
        description: req.body.todo.description,
        limit: req.body.todo.limit,
        isDone: req.body.todo.isDone,
        index: 0
    };

    let newDB = getDataFromFile();

    let userTodos = newDB[myUser.id];

    todo.index = userTodos.length + 1;
    
    userTodos.push(todo);

    newDB[myUser.id] = userTodos;
    
    console.log('TAREFA ADICIONADA ' + todo.title);

    saveOnFile(newDB, 'data.json');

    res.status(200).json(userTodos);
});

app.post('/refresh', (req, res) => {
    let myList = req.body.todos;

    let myUser = validateToken(req.body.token);

    let myTodos = getDataFromFile();

    console.log('LISTA ATUALIZADA');
    
    myList = myList.filter((todo) => {return todo.isDone == false});

    myTodos[myUser.id] = myList;

    refreshFile(myTodos[myUser.id]);

    saveOnFile(myTodos, 'data.json')

    res.json(myTodos[myUser.id]);

});

app.post('/erase', (req, res) => {

    let myUser = validateToken(req.body.token);

    let myList = [];

    console.log('LISTA COMPLETAMENTE DELETADA');

    let todosList = getDataFromFile();

    todosList[myUser.id] = myList;

    saveOnFile(todosList, 'data.json');

    res.json(myList);


});

console.log('server is running');

function getDataFromFile (){
    return JSON.parse(fs.readFileSync('./data/data.json'));
    
}

function saveOnFile(todos, file){
    fs.writeFileSync('./data/'+ file, JSON.stringify(todos));
}

function refreshFile(todos){

    for(let i = 0; i < todos.length; i += 1){
        todos[i].index = i + 1;
    }

    return todos;
}

function getUsers(){
    return JSON.parse(fs.readFileSync('./data/users.json'));
}

function checkUsername(users, username){
    checkedUsers = users.filter(user => user.username == username);
    console.log(checkedUsers);
    if(checkedUsers.length > 0){
        return false;
    }
    return true;
}

function validateToken(token){
    let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
    let users = getUsers();
    let myUser = users.filter( user => { return user.id == decoded.iss});
    myUser = myUser[0];
    return myUser;
}
