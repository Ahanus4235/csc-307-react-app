// backend.js
import express from "express";
import cors from "cors";

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

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const generateId = (user) =>{
  const newId = Math.round(Math.random() * 1000000);
  let updates = { id: newId };
  user = { ...user, ...updates };
  return user;
}

const addUser = (user) => {
  user=generateId(user);
  users["users_list"].push(user);
  return user;
};

const deleteUser = (user) => {
  const index = users["users_list"].findIndex(u => u.id === user.id);
  users["users_list"].splice(index,1);
}

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  deleteUser(result);
  res.send();
})

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (userToAdd === undefined){
    res.status(400).send('Bad request');
  } else {
    const newUser = addUser(userToAdd);
    res.status(201).json(newUser);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});