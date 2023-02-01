import express from "express";
import { getTodos, createTodo, getTodo } from "../controller/index.js";

const router = express.Router();

router.get('/users/:username/todos', getTodos);
router.get("/users/:username/todos/:id", getTodo);
router.post('/users/:username/todos', createTodo);

export default router;