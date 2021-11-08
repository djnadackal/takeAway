const express = require("express");
const mongoose = require("mongoose");
const User = require("../Model/dataModel");
const router = require("../Router/www.abc.com/user");

const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const validateUser = async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  try {
    const user = await User.findOne({ email: email, password: password });
    if (user === null) res.status(404).json({ message: "user doesnt exist" });
    else res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    lastLogin: req.body.lastLogin,
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const existingUser = await User.findOneAndUpdate(
      { email: req.params.email },
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        lastLogin: req.body.lastLogin,
      }
    );
    res.status(200).json("updated successfully", existingUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const existingUser = await User.deleteOne({ email: req.params.email });
    res.status(201).json(existingUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getUsers, validateUser, createUser, updateUser, deleteUser };
