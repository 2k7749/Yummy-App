import { GetVandors, GetVandorByID } from './../controllers/AdminController';
import { CreateVandor } from '../controllers';
import express, { Request, Response, NextFunction } from 'express'

const router = express.Router();

router.post('/vandor', CreateVandor)

router.get('/vandors', GetVandors)

router.get('/vandor/:id', GetVandorByID)

router.get('/', (req: Request, res: Response, next: NextFunction) => {


res.json({ message: ' Hello from Admin' })

})

export { router as AdminRoute };