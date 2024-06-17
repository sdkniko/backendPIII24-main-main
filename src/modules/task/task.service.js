// src/modules/task/task.service.js
const taskModel = require('../../models/task');

async function findAll() {
    return await taskModel.find().populate('user').exec();
}

async function findOneById(_id) {
    return await taskModel.findById(_id).populate('user').exec();
}

async function save(task) {
    let _task = new taskModel(task);
    return await _task.save();
}

async function update(id, updatedTask) {
    return await taskModel.findByIdAndUpdate(id, updatedTask, { new: true }).populate('user').exec();
}

async function remove(id) {
    return await taskModel.findOneAndDelete({ _id: id }).exec();
}


module.exports = { findAll, findOneById, save, update, remove };

