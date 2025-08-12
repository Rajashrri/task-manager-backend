const Privilege = require("../models/privilege-model");
const mongoose = require('mongoose');
const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");

const getPriByid = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Privilege.find({ role_id: id });
    if (!response) {
      res.status(404).json({ msg: "No Data Found" });
      return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.error("Error in getdata:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.msg });
  }
};
const setprivileges = async (req, res) => {
  const { id } = req.params;
  const privilegesArray = req.body;

  try {
    const projectMap = {
      Employee: "emp",
      Client: "client",
      Project: "project",
      Task: "task",
    };

    const privilegeObject = {
      role_id: id,
    };

    if (privilegesArray.length > 0 && privilegesArray[0].role) {
      privilegeObject.role = privilegesArray[0].role;
    }

    privilegesArray.forEach((item) => {
      const prefix = projectMap[item.projectName];
      if (prefix) {
        privilegeObject[`${prefix}add`] = item.add === "Active" ? "1" : "0";
        privilegeObject[`${prefix}update`] = item.edit === "Active" ? "1" : "0";
        privilegeObject[`${prefix}delete`] = item.delete === "Active" ? "1" : "0";
        privilegeObject[`${prefix}list`] = item.list === "Active" ? "1" : "0";
      }
    });

    const result = await Privilege.findOneAndUpdate(
      { role_id: id },
      { $set: privilegeObject },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Privileges updated", data: result });
  } catch (error) {
    console.error("Update privileges error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { setprivileges,getPriByid};
