# React Journal

## Overview

Calendar app back-end built with NodeJS and ExpressJS. The app allows you to create users and manage a calendar, being able to create events as reminders with a set date and edit or delete them later.

The front-end of this app has been created with React and Redux and you can see the code in [this repository](https://github.com/em-jose/js-calendar-frontend).

## Tech stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Init

### 1. Install dependencies

* This project uses [npm](https://docs.npmjs.com/about-npm) as a dependency manager.
* To install all dependencies run the following command:

```bash
npm install
```

### 2. Create .env files

* Create the ".env" file with the following variables:

```txt
PORT
DB_CNN
SECRET_JWT_SEED
```
### 3. Launch the development server

```bash
npm run dev
```

## Endpoints

### Endpoints usage

In order to use certain endpoints, it is necessary to add the "x-token" to the request header. This token is obtained when creating a user in the application or when logging in with an existing user.

```json
// Login response
{
    "ok": true,
    "uid": "111",
    "name": "Test",
    "token": "AAA111BBB222CCC333" // x-token
}
```

### POST - Create new user

**ENDPOINT**
```txt
/api/auth/new
```

**REQUEST BODY**
```json
{
    "name": "<newuserName>",
    "email": "<newUserEmail>",
    "password": "<newUserPassword>"
}
```

### POST - Login user

**ENDPOINT**
```txt
/api/auth/
```

**REQUEST BODY**
```json
{
    "email": "<userEmail>",
    "password": "<passWord>"
}
```

### GET - Renew auth token

**ENDPOINT**
```txt
/api/auth/renew
```

**REQUEST HEADER**
```txt
x-token: <token>
```

### POST - Create calendar event

**ENDPOINT**
```txt
/api/events/
```

**REQUEST HEADER**
```txt
x-token: <token>
```

**REQUEST BODY**
```json
{
    "title": "<newEventName>",
    "start": <startingTimeInMilliseconds>,
    "end": <endingTimeInMilliseconds>
}
```

### GET - Get all calendar events

**ENDPOINT**
```txt
/api/events/
```

**REQUEST HEADER**
```txt
x-token: <token>
```

### PUT - Update event

**ENDPOINT**
```txt
/api/events/<eventId>
```

**REQUEST HEADER**
```txt
x-token: <token>
```
**REQUEST BODY**
```json
{
    "title": "<eventTitle>",
    "start": <startingTimeInMilliseconds>,
    "end": <endingTimeInMilliseconds>,
    "notes": "<eventNote>"
}
```

### DELETE - Delete event

**ENDPOINT**
```txt
/api/events/<eventId>
```

**REQUEST HEADER**
```txt
x-token: <token>
```

## Commands

| Command          | Action                                        |
| :--------------- | :-------------------------------------------- |
| `dev`            | Run the local development server with Nodemon (auto refresh when any change is made). |
| `start`          | Run the local development server  with Node (no auto refresh).    |
| `test`           | Launch tests. |
