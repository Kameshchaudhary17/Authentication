import db from "../db";

export const createProfile = (req,res) =>{
    const sql = "INSERT INTO profile (`user_id`, `name`, `contact`, `address`, `bio`, `image`) VALUES (?,?,?,?,?,?)";
    const {name, contact, address,bio} = req.body;
    const userId = req.user.id;
    const image = req.file ? `/${req.file.filename}` : null;

    db.query(sql, [name, contact, address, bio, userId, image], (err, result)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).send({message: "profile created", result})
    });
};

exports.getProfile = (req,res) =>{
    const userId = req.user.id;
    const sql = "Select * from profile where user_id = ?";

    db.query(sql,[userId], (err,result)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(result)
    });
};

exports.deleteProfile = (req, res) =>{
    const { id } = req.params;
    const userId = req.user.id;

    const sql = "DELETE FROM profile where id = ? and user_id = ?";

    db.query(sql,[id, userId], (err, result)=>{
        if(err) return res.status(500).send(err);
        if (result.afffectedRows === 0) {
            return res.status(404).send({message: "Profile not found or user not authorized"});

        }
        return res.status(200).send({message: "Profile Created"})
    });
};

exports.updateProfile = (req, res)=>{
    const sql = "UPDATE profile set name = ?, contact = ?, address =?, bio = ?, image = ? AND user_id = ?";
    const { name, contact, address, bio, id } = req.body;
    const userId = req.user.id;
    const image = req.file ? `/${req.file.filename}` : req.body.image; // Use the new image or keep the existing one

    db.query(sql, [name, contact, address, bio, image, id, userId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Blog post not found or user not authorized" });
        }
        return res.status(200).send({ message: "Blog post updated successfully", result });
    });
}