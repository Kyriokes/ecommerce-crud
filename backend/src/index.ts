import express, { Request, Response } from 'express';
import cors from 'cors';
import {productRoutes} from './routes/productRoutes';
import {userRoutes} from './routes/userRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use("/users", userRoutes);

app.get('/', (_req: Request, res: Response) => {
    res.send('Server up!');
});

app.listen(PORT, ()=>{
    console.log(`Server listening http://localhost:${PORT}`);
})