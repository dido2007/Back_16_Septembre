require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Feedback } = require('../models/models');

module.exports = (db) => {  
  
    router.post("/feedback", async (req, res) => {
      try {
        const title = req.body.title;
        const description = req.body.description;

        const feedback = new Feedback({
            title: title,
            description: description,
        });

        await feedback.save()

        res.json({success: true, fallback: "Le feedback a ete envoye avec succes"})
      } catch (error) {
        console.error(error);
        return res.json({ success: false, fallback: "An error occurred" });
      }
  
    });

    return router;
  };