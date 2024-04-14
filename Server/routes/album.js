const album = require("../models/album");

const router = require("express").Router();


router.post("/save", async (req, res) => {
    const newAlbum = album({
        name: req.body.name,
        imageurl: req.body.imageurl
        
    })
    
    try{
        const savedAlbum = await newAlbum.save();
        res.status(200).send({sucess:true,album:savedAlbum,message:"Album saved successfully"})
    }
    catch(error){
        res.status(400).send({sucess:false, message:error,album:null})
    }
    })

    module.exports = router