import { Todo } from "../model/index.js";

// get all todos
const getTodos = async(req, res) => {
    const username = req.params['username'];
    await Todo.find({name: username})
            .then((todos) => res.json(todos))
            .catch((err) => console.log(err));
}

// get specific todo
const getTodo = async(req, res) => {
    const username = req.params['username'];
    const _id = req.params['id'];
    
    await Todo.findById(_id)
            .then((todo) => res.json(todo))
            .catch((err) => console.log(err));
}

// create todo
const createTodo = async(req, res) => {
    const { title, date, description, category, priority, status, username } = req.body;
    const name = req.params['username'];
    const newTodo = await Todo({
        title,
        date,
        description,
        category,
        priority,
        status,
        username: name
    });
    await newTodo.save()
            .then(() => res.json({msg: 'todo created', newTodo}))
            .catch((err) => res.status(400).json(`Error: ${err}`));
}

export { getTodos, getTodo, createTodo };