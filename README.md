# node-todo-api
MongoDB todo api

#Endpoints
#To-DO Endpoints

POST /todos
GET /todos
GET /todos/id
DELETE /todos/id
PATCH /todos/id

#User Endpoints

POST /users
GET /users/me
POST /users/login
DELETE /users/me/token

#User Body

{
   "email":"email@example.com",
   "password":"1@234"
}

email : Required
password : Required

#To-Do item Body structure

{
   "text":"body of To-do item"
}

text : Required
header: Required
   x-auth : get token from /users or /users/login end point by providing email and password

