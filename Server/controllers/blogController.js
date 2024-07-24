import db from "../db.js";

export const createBlog = (req, res) => {
    const sql = "INSERT INTO blog (`title`, `description`, `user_id`) VALUES (?, ?, ?)";
  
    const { title, description } = req.body;
    const userId = req.user.id; // Get the user ID from the request object
  
    db.query(sql, [title, description, userId], (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send({ message: "Blog post created successfully", result });
    });
  };
  
  
  export const getBlog = (req, res) => {
    const userId = req.user.id; 
    const sql = "SELECT * FROM blog WHERE user_id = ?";
  
    db.query(sql, [userId], (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(result);
    });
  };

  export const publicBlog = (req, res) => {
    const userId = req.user.id; 
    const sql = "SELECT * FROM blog";
  
    db.query(sql, [userId], (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(result);
    });
  };
  
  
  export const deleteBlog = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; 
  
    const sql = "DELETE FROM blog WHERE id = ? AND user_id = ?";
  
    db.query(sql, [id, userId], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Blog post not found or user not authorized" });
      }
      return res.status(200).send({ message: "Blog post deleted successfully", result });
    });
  };
  
  
  
  export const updateBlog = (req, res) => {
    const sql = "UPDATE blog SET title = ?, description = ? WHERE id = ? AND user_id = ?";
    const { title, description, id } = req.body;
    const userId = req.user.id; // Get the user ID from the authenticated user
  
    db.query(sql, [title, description, id, userId], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Blog post not found or user not authorized" });
      }
      return res.status(200).send({ message: "Blog post updated successfully", result });
    });
  };
  