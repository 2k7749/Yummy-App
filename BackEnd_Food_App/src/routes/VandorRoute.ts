import express, { Request, Response, NextFunction } from 'express'
import { GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin, AddFood, GetFoods, UpdateVandorCoverImage } from '../controllers';
import { Authenticate } from '../middlewares';
import multer from 'multer'; // upload files

const router = express.Router();

const imageStorage = multer.diskStorage({
    
    destination: function(req, file, cb){
        cb(null, 'images')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().substring(0, 13)+'_'+file.originalname)
		//Date.now()
    }
    
})

const images = multer({ storage: imageStorage }).array('images', 10)

router.post('/login', VandorLogin);

router.use(Authenticate)

router.get('/profile',GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/coverimage', images, UpdateVandorCoverImage);
router.patch('/service', UpdateVandorService);

router.post('/food', images, AddFood)
router.get('/foods', GetFoods)


router.get('/', (req: Request, res: Response, next: NextFunction) => {


res.json({ message: ' Hello from Vandor!' })

})


export { router as VandorRoute };