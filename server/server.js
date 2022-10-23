const express = require('express');
const app = express();

// Cors
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Service
const argonautesService = require ('./argonautesService');

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Welcome")
})

app.get('/argonautes', async (_req, res) => {
    try {
        const members = await argonautesService.getMembers()
        return res.status(200).json({
          data: members.rows,
        });
    } catch (error) {
        return res.status(400).json({ message: err });
    }
})

app.post('/argonautes', async (req, res) => {
    try {
        const name = req.body.name
        await argonautesService.createMember(name);
    } catch(error) {
        return res.status(400).json({ message: err });
    }
    return res.status(200).json({
            message: "Membres ajouté",
        });
})

const port = 8000;
app.listen(port, () => {
    console.log("Argonautes are coming...")
})