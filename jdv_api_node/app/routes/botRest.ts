import  express from 'express';

export const router = express.Router();

router.post('start', () => {
    console.log('post works');
});


