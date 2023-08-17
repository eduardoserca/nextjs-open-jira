import mongoose from "mongoose";
/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongooConnection = {
    isConnected: 0
}

export const connect = async() => {

    try {

        if(mongooConnection.isConnected === 1) {        
            return;
        }

        if(mongoose.connections.length > 0){            
            if(mongoose.connections[0].readyState === 1){//Ya existe una conexión y se reutiliza
                mongooConnection.isConnected = mongoose.connections[0].readyState;                
                console.log('Usando conexión anterior');
                return; 
            }
        }
    
        await mongoose.connect( process.env.MONGO_URL || ''  );
        mongooConnection.isConnected = 1;
        console.log('Conectado a MongoDB: ',process.env.MONGO_URL);
        
    } catch (error) {
        mongooConnection.isConnected = 0;
        console.error('Error al conectar a la BD Mongo: ', error);
    }

    

}

export const disconnect = async() => {
    
    if(mongooConnection.isConnected === 0 ){
        return;
    }

    await mongoose.disconnect();
    mongooConnection.isConnected = 0;
    console.log('Desconectado de MongoDB');
    
}
