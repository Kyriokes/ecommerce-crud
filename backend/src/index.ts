import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

app.get('/', (_req: Request, res: Response) => {
    res.send('Server up!');
});

app.listen(PORT, ()=>{
    console.log(`Server listening http://localhost:${PORT}`);
})