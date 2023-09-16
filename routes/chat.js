const express = require('express');
const router = express.Router();
const { Conversation } = require('../models/models');

router.get('/history/:from/:to', async (req, res) => {
    const { from, to } = req.params;
    
    try {
        const conversation = await Conversation.findOne({
            participants: { $all: [from, to] }
        });

        if (conversation) {
            res.json({ success: true, messages: conversation.messages });
        } else {
            res.json({ success: false, messages: [] });
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, error: 'Erreur lors de la récupération des messages.' });
    }
});

module.exports = router;
