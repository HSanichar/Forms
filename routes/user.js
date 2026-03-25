const express = require('express'); 
const router = express.Router(); 

router.route('/').get((req, res) => { 
    res.send('User list'); 
}).post((req, res) => { 

    const firstName = req.body.firstName; 
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const age = req.body.age;

    const isValid = firstName !== "" && lastName !== "";

    if(isValid){ 
        console.log(`Adding user: ${firstName}`); 
        users.push({firstName, lastName, gender, age}); 
        res.redirect("/users/lists"); 
    } 
    else{ 
        console.log('Error adding user!'); 
        res.render("users/new", {firstName: firstName}); 
    } 
}); 

router.get('/lists', (req, res) => { 
    res.render('users/list', {users}); 
}); 

router.get('/new', (req, res) => { 
    res.render('users/new', {firstName: ""}); 
}); 

router.route('/:id').get((req, res) => { 
    console.log(req.user); 
    console.log('Getting user data!'); 
    res.render("users/show", {user: req.user}); 
}).delete((req, res) => { 
    res.send(`Deleting User data for id: ${req.params.id}`); 
}).put((req, res) => { 
    res.send(`Updating User data for id: ${req.params.id}`); 
}); 

const users = [
    {firstName:"Hemani", lastName:"Patel", gender:"Female", age:20}, 
    {firstName:"George", lastName:"Smith", gender:"Male", age:25}
]; 

router.param('id', (req, res, next, id) => { 
    req.user = users[id]; 
    next(); 
}); 

module.exports = router; 