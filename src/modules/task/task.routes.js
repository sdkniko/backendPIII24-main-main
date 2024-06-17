// routes/task.routes.js
const express = require('express');
const taskService = require('./task.service');
const userService = require('../user/user.service'); // Importa el userService

const router = express.Router();

// GET /api/task
router.get('/api/task', async (req, res) => {
    try {
        const tasks = await taskService.findAll();
        res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// GET /api/task/:id
router.get('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskService.findOneById(taskId);
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// POST /api/task
router.post('/api/task', async (req, res) => {
    try {
        const newTask = req.body;
        const task = await taskService.save(newTask);

        // Si la tarea tiene un userId, asociarla al usuario
        if (task.user) {
            await userService.addTaskToUser(task.user, task._id);
        }

        res.status(201).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// PUT /api/task/:id
router.put('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;
        const task = await taskService.update(taskId, updatedTask);
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// DELETE /api/task/:id
router.delete('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await taskService.remove(taskId);
        res.status(200).send('Tarea eliminada correctamente.');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;


