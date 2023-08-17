
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status:string;
    createdAt: number;
}


export const seedData: SeedData = {
    entries: [
        {            
            description: 'Pendiente: Nisi eiusmod aliquip labore esse et irure et laboris consectetur.',
            status:'pending',
            createdAt: Date.now()
        },
        {            
            description: 'En-Progreso: Nulla nisi consequat aliqua veniam pariatur sint nisi est ullamco commodo anim.',
            status:'in-progress',
            createdAt: Date.now() - 1000000
        },
        {            
            description: 'Terminados: Excepteur reprehenderit aliqua veniam nulla velit nostrud commodo excepteur laboris.',
            status:'finished',
            createdAt: Date.now() - 100000
        },
    ]
}