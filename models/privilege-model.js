const { Schema, model } = require("mongoose");

const privilegeSchema = new Schema({
  role: { type: String },
  role_id: { type: String },

  empadd: { type: String },
  empupdate: { type: String },
  empdelete: { type: String },
  emplist: { type: String },

  clientadd: { type: String },
  clientupdate: { type: String },
  clientdelete: { type: String },
  clientlist: { type: String },

  projectadd: { type: String },
  projectupdate: { type: String },
  projectdelete: { type: String },
  projectlist: { type: String },

  taskadd: { type: String },
  taskupdate: { type: String },
  taskdelete: { type: String },
  tasklist: { type: String },
});

module.exports = model("Privilege", privilegeSchema);
