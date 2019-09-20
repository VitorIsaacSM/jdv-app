import express from "express";

const app = express();

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});

app.get('/teste', () => {
    console.log('funfo karai236');
});