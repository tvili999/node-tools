# Auth router

Auth router is a feature for express. This allows easy routing based on authentication state.

## Usage

```js
const createAuthRouter = require("node-tools/authRouter");
const createContext = require("node-tools/context");
const express = require("express");

const context = createContext();
app.use(context);

context.add("me", (req) => req.cookies.username);

let verified = ["Peter"];

const authRouter = createAuthRouter({
    unauthenticated: async (req) => !req.context.me,
    authenticated: async (req) => req.context.me,
    verified: async (req) => req.context.me && verified.includes(req.context.me),
});

app.get("/", authRouter.authenticated((req, res) => {
    res.send("Hi friend");
}));

app.get("/", authRouter.unverified((req, res) => {
    res.send("Verify your e-mail");
}));

app.get("/", authRouter.unauthenticated((req, res) => {
    res.send("Hello stranger");
}));

```
