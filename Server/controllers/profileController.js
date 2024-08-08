import db from "../db.js";

export const createProfile = (req,res) =>{
    const sql = "INSERT INTO profile ( `name`, `contact`, `address`, `bio`, `image`,`user_id`) VALUES (?,?,?,?,?,?)";
    const {name, contact, address,bio} = req.body;
    const userId = req.user.id;
    const image = req.file ? `/${req.file.filename}` : null;

    db.query(sql, [name, contact, address, bio, image, userId], (err, result)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).send({message: "profile created", result})
    });
};

export const getProfile = (req,res) =>{
    const userId = req.user.id;
    const sql = "Select * from profile where user_id = ?";

    db.query(sql,[userId], (err,result)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(result)
    });
};

export const deleteProfile = (req, res) =>{
    const { id } = req.params;
    const userId = req.user.id;

    const sql = "DELETE FROM profile where id = ? and user_id = ?";

    db.query(sql,[id, userId], (err, result)=>{
        if(err) return res.status(500).send(err);
        if (result.afffectedRows === 0) {
            return res.status(404).send({message: "Profile not found or user not authorized"});

        }
        return res.status(200).send({message: "Profile Deleted"})
    });
};

export const updateProfile = (req, res) => {
    const sql = "UPDATE profile SET name = ?, contact = ?, address = ?, bio = ?, image = ? WHERE id = ? AND user_id = ?";
    const { name, contact, address, bio, id } = req.body;
    const userId = req.user.id;
    const image = req.file ? `/${req.file.filename}` : req.body.image;
  
    db.query(sql, [name, contact, address, bio, image, id, userId], (err, result) => {
      if (err) {
        console.error('Error updating profile:', err);
        return res.status(500).send({ message: 'Error updating profile', error: err.message });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: 'Profile not found or user not authorized' });
      }
  
      return res.status(200).send({ message: 'Profile updated successfully', result });
    });
  };