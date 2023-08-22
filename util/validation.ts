

export const isValidObjectIdMongo = (id: string): boolean => {
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if(!checkMongoIDRegExp.test(id)){        
        return false;
    }
    return true;
}