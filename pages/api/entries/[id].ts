import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import { isValidObjectIdMongo } from "@/util";
import { entryService } from "@/service";


type Data = 
    |{message: string}
    |IEntry
    

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {id} = req.query;

    if( !isValidObjectIdMongo( id as string )){
        return res.status(400).json({message: 'El id no es valido ' + id });
    }

    switch (req.method) {
        case 'GET':            
            return getEntryById(req, res); 
        case 'PUT':            
            return updateEntry(req, res);    

        default:
            return res.status(400).json({message: 'Método no existe'});
    }
}

const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query;
    const entry  = await entryService.getEntryById(id as string);    
    return res.status(200).json(entry as IEntry); 
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if( !entryToUpdate ){
        await db.disconnect();
        return res.status(400).json({message: 'No hay entrada con es ID: ' + id})
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } =  req.body;
    
    try {
        const updateToEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true });
        await db.disconnect();
        return res.status(200).json( updateToEntry! );

    } catch (error: any) {
        console.error(error);
        await db.disconnect();
        return res.status(400).json({message: error.errors.status.message});        
    }

    
    
}