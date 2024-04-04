import { User } from "../models/user.models";
import { asyncHandler } from "../utils/asyncHandler";

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please fill full details");
  }
  const user = User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("user already exist");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({ name, email, password: hashedPassword });
  const createdUser = User.findById(newUser._id).select("-password email");
  res.status(200).json({ message: "registered", createdUser });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please fill full details");
  }
  res.status(200).json({ message: "logged in" });
});

export { register, login };
