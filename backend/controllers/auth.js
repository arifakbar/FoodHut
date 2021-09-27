const User = require("../models/user");

exports.CreateOrUpdateUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOneAndUpdate(
      { email: email },
      { email: email },
      { new: true }
    );
    if (user) {
      res.status(201).json({
        data: user,
        mesage: "User updated successfully",
      });
    } else {
      const newUser = new User({
        email: email,
        name: email.split("@")[0],
      });
      await newUser.save();
      res.status(201).json({
        data: user,
        mesage: "User created successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Some error occured!",
    });
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.status(200).json({
      data: user,
      message: "User fetched successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Some error occured!",
    });
  }
};

exports.updateUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { name: username }
    );
    res.status(201).json({
      data: user,
      message: "Username updated successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Some error occured!",
    });
  }
};
