import * as express from 'express';
import { GetChirp, GetChirps, UpdateChirp, DeleteChirp, CreateChirp } from '../chirpstore';
const router: express.Router = express.Router();

//npm run dev to start server
//Ctrl + C to stop server

router.get('/:id?', (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    if (id) {
        res.json(GetChirp(id));
    } else {
        let chirps = GetChirps()
        let chirpArr: any[] = []
        Object.keys(chirps).map(key => chirpArr.push({ id: key, name: chirps[key].name, msg: chirps[key].msg }))
        chirpArr.pop()

        res.json(chirpArr)
    }
});

router.post('/', (req: express.Request, res: express.Response) => {
    CreateChirp(req.body)
    res.send("success");
});

//mandatory id param to tell the server which chirp to update
router.put('/:id', (req: express.Request, res: express.Response) => {
    const id = req.params.id
    const chirp = req.body

    res.send(UpdateChirp(id, chirp))
})

router.delete('/:id', (req: express.Request, res: express.Response) => {
    const id = req.params.id

    res.send(DeleteChirp(id))
})

export default router