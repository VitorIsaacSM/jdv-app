import { Usuario } from './../models/usuario';

const listaIds: Usuario[] = [];

export const geraId = (user: Usuario): Usuario => {
    const oldId = user.id;
    const oldSession = user.session
    let newId = oldId;

    if(listaIds.length !== 0) {
        for(let i = 0; i < listaIds.length; i++) {
            if(listaIds[i].session === oldSession) {
                newId = listaIds[i].id;
            }
        }
    }

    if(oldId === newId) {
        user.id = (listaIds.length + 1).toString();
        listaIds.push(user);
    } else {
        user.id = newId;
    }

    console.log(`Usuario logado: id = ${user.id}, session = ${oldSession}`);

    return user;
}