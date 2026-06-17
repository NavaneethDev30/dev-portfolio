import { Router } from "express";

const MessageRoute = Router();

MessageRoute.get('/', (req, res) => res.send({ title: "Get the users" }));

export default MessageRoute;
