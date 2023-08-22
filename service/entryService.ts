import { db } from "@/database";
import { Entry, IEntry } from "@/models";

type Data = {
    entry?: IEntry  | null  
}   


export const getEntryById = async (id: string):Promise<IEntry  | null> => { // Promise<IEntry  | null  >
    await db.connect();    
    const entry = await Entry.findById(id);
    await db.disconnect();
    return JSON.parse(JSON.stringify(entry));
}