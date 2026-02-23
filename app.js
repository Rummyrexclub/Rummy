const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// User Data Model
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    coins: { type: Number, default: 0 }
}));

// Sign Up Route
app.post('/api/signup', async (req, res) => {
    const { name, phone, password } = req.body;
    const user = new User({ name, phone, password, coins: 100 }); // Free 100 coins
    await user.save();
    res.json({ success: true, message: "Account Created!" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
