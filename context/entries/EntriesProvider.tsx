import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from '.';
import { Entry } from '@/interfaces';


export interface EntriesState {
   entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: [
    {
        _id: uuidv4(),
        description: 'Pendiente: Nisi eiusmod aliquip labore esse et irure et laboris consectetur.',
        status:'pending',
        createdAt: Date.now()
    },
    {
        _id: uuidv4(),
        description: 'En-Progreso: Nulla nisi consequat aliqua veniam pariatur sint nisi est ullamco commodo anim.',
        status:'in-progress',
        createdAt: Date.now() - 1000000
    },
    {
        _id: uuidv4(),
        description: 'Terminados: Excepteur reprehenderit aliqua veniam nulla velit nostrud commodo excepteur laboris.',
        status:'finished',
        createdAt: Date.now() - 100000
    },

   ],
}

interface Props extends PropsWithChildren {

}

export const EntriesProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description: description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] - AddEntry', payload: newEntry });
    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] - Entry-Update', payload: entry});
    }

    return (
       <EntriesContext.Provider value={{
           ...state,

           //Methods
           addNewEntry,
           updateEntry,
       }}>
           { children }
       </EntriesContext.Provider>
   )
}