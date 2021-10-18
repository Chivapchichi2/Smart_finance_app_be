# REST API for smart-finance project 'Kapu$ta'.

## 1. MongoDB database

- @ GET /api/ledgers/income/:date(mm.yyyy) Получает от залогиненого пользователя дату, 
  возвращает массив с доходами пользователя за месяц.Если пользователь не залогинен, 
  возвращает статус 401(Not authorized), если не отправилась дата, статус 400(Bad Request).

- @ GET /api/ledgers/expense/:date(mm.yyyy)  Получает от залогиненого пользователя дату, 
  возвращает массив с расходами пользователя за месяц.Если пользователь не залогинен, 
  возвращает статус 401(Not authorized), если не отправилась дата, статус 400(Bad Request).

- @ POST /api/ledgers/income Получает body в формате { date, category, description,value} 
  Если в body нет каких-то обязательных полей, возвращает json с ключом {"message":
  "missing required name field"} и статусом 400. Если с body все хорошо,
  добавляет транзакцию дохода. По результату
  работы возвращает объект с телом {date, category, description, value, balance, ledger} и
  статусом 200

- @ POST /api/ledgers/expense Получает body в формате { date, category, description,value} 
  Если в body нет каких-то обязательных полей, возвращает json с ключом {"message":
  "missing required name field"} и статусом 400. Если транзакция расхода превышает баланс, 
  возвращает статус 400 с ключом{ "message":"Эта затрата сделает ваш баланс отрицательным. 
  Пополните баланс внесением доходов, либо откоректируйте значение баланса вручную"} 
  Если с body все хорошо, добавляет транзакцию расхода. По результату
  работы возвращает объект с телом {date, category, description, value, balance, ledger} и
  статусом 200

- @ DELETE /api/ledgers/:id Получает параметр transactionId от залогиненого пользователя.
  Удаляет транзакцию дохода или расхода, возвращает json с ключом {message,balance,ledger}.
  Если не залогинен, возвращает статус 401 Not authorized. Если не получает параметр transactionId
  возвращает статус 400 Bad Request.

## 2. Joi validation for (POST, PATCH)

## 3. SIGNUP request

### POST /api/users/signup

Content-Type: application/json RequestBody: { "email": "example@example.com",
"password": "examplepassword" }

- Registration conflict error

Status: 409 Conflict Content-Type: application/json ResponseBody: { "message":
"Already register" }

- Registration success response

Status: 201 Created Content-Type: application/json ResponseBody: { { "data": {
"email": "a@gmail.com", "avatarURL": "string" }, "token":
"eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDlhMjJjMWMxOGZkNTM1Yzk3NDVjOCIsImlhdCI6MTYzMjI0ODg3Mn0.hnm3qyuHVl913NARFUEqVlKaSJRBfE6rcwOFZ5nOglM",
"balance": 0, ledger} }

## 4. SIGNIN request

### POST /users/login

Content-Type: application/json RequestBody: { "email": "example@example.com",
"password": "examplepassword" }

- Login validation error

Status: 400 Bad Request Content-Type: application/json ResponseBody: <Ошибка от
Joi или другой библиотеки валидации>

- Login success response

Status: 200 OK Content-Type: application/json ResponseBody: { { "data": {
"email": "a@gmail.com", "avatarURL": "string" }, "token":
"eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDlhMjJjMWMxOGZkNTM1Yzk3NDVjOCIsImlhdCI6MTYzMjI0ODg3Mn0.hnm3qyuHVl913NARFUEqVlKaSJRBfE6rcwOFZ5nOglM",
"balance": 0, ledger } }

- Login auth error Status: 400 Bad Request ResponseBody: { "message": "Email or
  password is wrong" }

## 5. User infirmation request

### GET /api/users/current

Authorization: "Bearer {{token}}"

- Current user unauthorized error

Status: 401 Unauthorized Content-Type: application/json ResponseBody: {
"message": "Not authorized" }

Status: 400 Bad Request Content-Type: application/json ResponseBody: {
"message": "Invalid request body / Token not provided" }

- Current user success response

Status: 200 OK Content-Type: application/json ResponseBody: { { "User": {
"email": "a@gmail.com", "avatarURL": "string" }, "balance": 0, "ledger": {
"incomes": { "year": { "month": "130" } }, "expenses": { "year": { "month": "50"
} } } } }

## 6. LOGOUT request

### GET /api/users/logout

Authorization: "Bearer {{token}}"

- Logout unauthorized error

Status: 401 Unauthorized Content-Type: application/json ResponseBody: {
"message": "Not authorized" }

- Logout success response

Status: 204 No Content

## 7. Update current user balance

### PATCH /api/users/balance

Authorization: "Bearer {{token}}"

- Success Content-Type: application/json RequestBody: { "balance": 12500 }

Status: 200 Success Content-Type: application/json ResponseBody: { "balance":
12500 }

- Response Error

Status: 401 Unauthorized Content-Type: application/json ResponseBody: {
"message": "Not authorized" }

Status: 400 Bad Request Content-Type: application/json ResponseBody: {
"message": "Bad Request" }

Status: 404 Not Found Content-Type: application/json ResponseBody: { "message":
"Not Found" }
