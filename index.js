const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

const USERS = [];
const passwords=[] ;

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
},
    {
      title: "Three states",
      description: "Given an array , return the maximum of the array?",
      testCases: [{
          input: "[1,2,3,4,5]",
          output: "5"
      }]
    },
    {
      title: "four states question number 4",
      description: "Given an array , return the maximum of the array?",
      testCases: [{
          input: "[1,2,3,4,5]",
          output: "5"
      }]
    },
    {
    title: "four states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}
];
// i have edited this

const SUBMISSIONS = [

]

function userExist(email){
  console.log("d")
  for(let i of USERS){
    console.log("user")
    if(i==email) return true ;
  }
  console.log("s")
  return false ;
}


app.get( '/', function(req, res) {
  res.send("Intial page")
}) ;

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const email=req.body.email; ;
  const password=req.body.password ;

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  
  if(userExist(email)==false) {
    USERS.push(email) ;
    passwords.push(password) ;
  }
  console.log(USERS.length)

  // return back 200 status code to the client
  res.status(200).send('Heldslo World!')
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password

    console.log(req.body.email,req.body.password)
    const email=req.body.email ;
    const password=req.body.password ;

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same

  doesExist =userExist(email) ;
  console.log("does exist is ->",doesExist) ;
  let passwordMatched =false ;

  if(doesExist) {
    const idx=USERS.findIndex( (user)=>user==email) ;
    if(password==passwords[idx]) passwordMatched=true ;
  }

  if(!doesExist) return res.status(200).send("does not exist")

  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)

  if(passwordMatched==true){
    return res.status(200).send("User exist and password matched") ;
  }
  // If the password is not the same, return back 401 status code to the client

  else if(doesExist && passwordMatched==false){
    return res.status(401).send("wrong password") ;
  }
  console.log(USERS.length)

  res.status(200).send('Hello World from route 2!')
})

app.get('/questions', function(req, res) {

  let ques="" ;

  for(let q of QUESTIONS){
    ques+=`<h2>${q.title}</h2>`
  }
  
  //return the user all the questions in the QUESTIONS array
  res.send("Hello World from route 3!"+ques)
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  
  res.send("Hello World from route 4!")
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  const submission=req.body.submission ;

  SUBMISSIONS.push(submission) ;
  let accepted=false ;
  if(Math.random()>0.5) accepted=true ;
  
  res.send("Hello World from route 4!",accepted)
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})
