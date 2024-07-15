import db from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const sendResponse = (res, status, message, data = null) => {
  res.status(status).json({ message, data });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, 400, "Email and password are required");
  }

  try {
    const sql = "SELECT * FROM auth WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return sendResponse(res, 500, "Internal server error");
      }

      if (results.length === 0) {
        return sendResponse(res, 401, "Invalid credentials");
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return sendResponse(res, 401, "Invalid credentials");
      }


      return sendResponse(res, 200, "Login successful", { 
        user: { id: user.id, username: user.username, email: user.email }
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(res, 500, "Internal server error");
  }


};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return sendResponse(res, 400, "Username, email, and password are required");
  }

  try {
    const checkUserSql = "SELECT * FROM auth WHERE email = ?";
    db.query(checkUserSql, [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return sendResponse(res, 500, "Internal server error");
      }

      if (results.length > 0) {
        return sendResponse(res, 409, "User with this email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertUserSql = "INSERT INTO auth (`username`, `email`, `password`) VALUES (?, ?, ?)";
      db.query(insertUserSql, [username, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return sendResponse(res, 500, "Internal server error");
        }
        return sendResponse(res, 201, "User registered successfully", { 
          id: result.insertId, username, email 
        });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(res, 500, "Internal server error");
  }
};