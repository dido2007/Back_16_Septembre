const mongoose = require('mongoose');

const verifCodeSchema = new mongoose.Schema({
    phoneNumber: String,
    verificationCode: Number,
});

const VerifCode = mongoose.model('VerifCode', verifCodeSchema);

const feedbackSchema = new mongoose.Schema({
    title: String,
    description: String,
});
    
const Feedback = mongoose.model('Feedback', feedbackSchema);

const userSchema = new mongoose.Schema({
    phoneNumber: String,
    fullName: String,
    age: Number,
    avatar: String,
    rating: Number,
    bio: String,
    images: [String],
    position: {
      latitude: Number,
      longitude: Number,
    },
    userType: String,
    interestedServices: [String],
    createdDate: {
      type: Date,
      default: Date.now,
    },
    offres: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offre',
    }],
    demandes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Demande',
    }],
    commentaires: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Commentaire',
    }],
});
  
const User = mongoose.model('User', userSchema);
  
const commentaireSchema = new mongoose.Schema({
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: String,
});
  
const Commentaire = mongoose.model('Commentaire', commentaireSchema);
  
const demandeSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    annonceType: String,
    metier: String,
    description: String,
    disponibilite: [String],
    images: [String],
    tarif: String,
    createdDate: {
      type: Date,
      default: Date.now,
    },
});
  
const Demande = mongoose.model('Demande', demandeSchema);
  
const offreSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    annonceType: String,
    metier: String,
    description: String,
    disponibilite: [String],
    images: [String],
    tarif: String,
    createdDate: {
      type: Date,
      default: Date.now,
    },
});
  
const Offre = mongoose.model('Offre', offreSchema);

const messageSchema = new mongoose.Schema({
  content: String,
  from: String,
  to: String,
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema({
  participants: [String], 
  messages: [messageSchema],
});


const Conversation = mongoose.model('Conversation', conversationSchema);
  
module.exports = { VerifCode, Feedback, User, Commentaire, Demande, Offre, Conversation };

