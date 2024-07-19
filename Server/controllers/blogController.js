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
  
  
  export const getBlog = (req, res)=>{
    const sql = "SELECT * from blog"
  
    db.query(sql,(err,result)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).send({message:"get details", result})
    });
  };
  
  
  export const deleteBlog = (req,res)=>{
  
    const {id} = req.params;
  
    const sql = "DELETE from blog WHERE id = ? and user_id = ?";
  
    db.query(sql,id,(err,result)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).send({message: "value deleted", result})
    })
  };
  
  
  export const updateBlog = (req,res)=>{
      
      const sql ="UPDATE blog set title = ?, description = ? WHERE id = ?";
      const value = req.body
      console.log(value);
  
      db.query(sql,[value.title, value.description, value.id],(err,result)=>{
          if(err) return res.status(500).send(err);
          return res.status(200).send({message: "Value Updated", result})
      })
  
  }