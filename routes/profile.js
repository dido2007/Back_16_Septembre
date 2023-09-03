const express = require('express');
const router = express.Router();
const { User } = require('../models/models');

module.exports = (db) => {  

    router.get('/:id', async (req, res) => {
        const userId = req.params.id;
        try {
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return router;
};