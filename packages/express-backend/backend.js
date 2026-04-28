// backend.js
import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";
const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// const findUserByName = (name) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name
//   );
// };

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

// const generateId = (user) =>{
//   const newId = Math.round(Math.random() * 1000000).toString();
//   let updates = { id: newId };
//   user = { ...user, ...updates };
//   return user;
// }

// const addUser = (user) => {
//   user=generateId(user);
//   users["users_list"].push(user);
//   return user;
// };

const deleteUser = (user) => {
  const index = users["users_list"].findIndex(u => u.id === user.id);
  if (index==-1)
    return -1;
  else{
    users["users_list"].splice(index,1);
    return 0;
  }
}

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices.deleteUserById(id)
  .then((data)=>{res.status(204).send(data);})
  .catch((error)=>{console.log(error);
                   res.status(400).send();
  })
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd)
  .then((data)=>{res.status(201).send(data);})
  .catch((error)=> {console.log(error);})
});

app.get("/users", (req, res) => {
  // if (name != undefined) {
  userServices.getUsers(req.query.name,req.query.job)
  .then((data)=>{res.send({ users_list: data});})
  .catch((error)=>{console.log(error);})
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userServices.findUserById(id)
  .then((data)=>{res.send({data});})
  .catch((error)=> {console.log(error);})
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});