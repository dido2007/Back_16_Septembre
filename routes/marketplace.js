require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Offre, Demande } = require('../models/models');

module.exports = (db) => {  
  
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
           cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
           cb(null, Date.now() + '-' + file.originalname);
        }
      });
    
      const upload = multer({
          storage: storage
      });
     
    router.post("/add", upload.fields([{ name: 'images', maxCount: 3 }]), async (req, res) => {

      try {

        const data = JSON.parse(req.body.data);
         
        console.log("Uploaded Images:", req.files['images']);
        console.log('User id ',data.userId._id)
        if(data.annonceType == 'offre'){
            const offre = new Offre({
                user: data.userId._id,
                annonceType: data.annonceType,
                metier: data.metier,
                description: data.description,
                disponibilite: data.disponibilite,
                tarif: data.tarif,
                images: req.files['images'] ? req.files['images'].map(file => file.path) : [],
            })

            await offre.save()

            res.json({success: true, fallback: "L'annonce a ete cree avec succes"})
        }

        if(data.annonceType == 'demande'){
            const demande = new Demande({
                user: data.userId._id,
                annonceType: data.annonceType,
                metier: data.metier,
                description: data.description,
                disponibilite: data.disponibilite,
                tarif: data.tarif,
                images: req.files['images'] ? req.files['images'].map(file => file.path) : [],
            })

            await demande.save()

            res.json({success: true, fallback: "L'annonce a ete cree avec succes"})
        }
      } catch (error) {
        console.error(error);
        return res.json({ success: false, fallback: "An error occurred" });
      }
  
    });

    router.post('/getoffres', async (req, res) => {
        try {
          const userId = req.body.userId; 

          if (userId == false) {
            const offres = await Offre.find().populate('user', 'fullName avatar position');
      
            res.json({ success: true, fallback: "Les offres ont ete get avec succes", data: offres });
          }

          if (userId) {
            const offres = await Offre.find({ user: userId });
      
            res.json({ success: true, fallback: "Les offres ont ete get avec succes", data: offres });
          } 
        } catch (error) {
          console.error(error);
          return res.json({ success: false, fallback: "Failed to get the annonces" });
        }
      });
      
      router.post('/getdemandes', async (req, res) => {
        try {
          const userId = req.body.userId;
          if(userId == false){
            const demandes = await Demande.find().populate('user', 'fullName avatar position');
            res.json({ success: true, fallback: "Les demandes ont ete get avec succes", data: demandes });
          }

          if (userId) {
            const demandes = await Demande.find({ user: userId });
      
            res.json({ success: true, fallback: "Les demandes ont ete get avec succes", data: demandes });
          }
        } catch (error) {
          console.error(error);
          return res.json({ success: false, fallback: "Failed to get the annonces" });
        }
      });

      router.post('/annonce', async (req, res) => {
        const { id, annonceType } = req.body;

        console.log("id " + id);
        console.log("annonceType" + annonceType)
        try {
          if(annonceType == 'Offre'){
            const annonce = await Offre.findById(id).populate('user', 'fullName avatar position');;

            if (!annonce) {
              return res.status(404).json({ error: 'Annonce not found' });
            }
            res.json(annonce);
          }
          if(annonceType == 'Demande'){
            const annonce = await Demande.findById(id).populate('user', 'fullName avatar position');;

            if(!annonce){
              return res.status(404).json({ error: 'Annonce not found'});
            }
            res.json(annonce);
          }

        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      })

    return router;
  };
