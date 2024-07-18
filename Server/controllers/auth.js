import db from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM auth WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).send({ message: "Database query error", error: err });

    if (results.length === 0) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.cookie('token', token);

    return res.status(200).send({ message: "Login successful", token, user: { id: user.id, username: user.username, email: user.email } });
  });
};


export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
      return res.status(400).send({ message: "Username, email, and password are required" });
  }

  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = "INSERT INTO auth(`username`,`email`,`password`) VALUES (?,?,?)";

      db.query(sql, [username, email, hashedPassword], (err, result) => {
          if (err) {
              // Check for duplicate entry error (e.g., duplicate email)
              if (err.code === 'ER_DUP_ENTRY') {
                  return res.status(409).send({ message: "Email already registered" });
              }
              return res.status(500).send({ message: "Database query error", error: err });
          }

          res.status(201).send({ message: "Registration successful", result });
      });
  } catch (err) {
      res.status(500).send({ message: "Error hashing password", error: err });
  }
};


