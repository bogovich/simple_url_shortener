import USER from "../models/userModel.js";
const signUp = async (req, res) => {
  try {
    const user = new USER(req.body);
    await user.save();
    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export { signUp };
