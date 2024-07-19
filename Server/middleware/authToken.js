import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies);

  if (!token) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = { id: decoded.id, email: decoded.email }; 
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
