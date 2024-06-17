const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  resume: String,
  domicilio: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }  // Relación con el usuario
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
