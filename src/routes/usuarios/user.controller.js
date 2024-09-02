import { UserModel } from "./user.model.js"

//----REGISTRAR UN NUEVO USER------
export const createUser = async ({username, password, email})=> {
    const newUser = await UserModel.create({
        username,
        password,
        email
    })
    return newUser.toJSON()
}


export const getUserByName = async ({username})=>{

    const userFromDataBase = await UserModel.findOne({username});
    if(userFromDataBase){
        return userFromDataBase.toJSON();
    } else {
        return false;
    }
}