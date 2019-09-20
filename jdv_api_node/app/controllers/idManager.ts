import { Usuario } from './../models/usuario';

const listaIds: Usuario[] = [];

exports.geraId = (user: Usuario): Usuario => {
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

exports.requestNewGame = (requestedId: string, requesterId: string): Usuario => {
    const requestedUserIndex = findIdIndex(requestedId);
    if(listaIds[requestedUserIndex] != null && listaIds[requestedUserIndex].isLogged) {
        listaIds[requestedUserIndex].gameRequest = true;
        listaIds[requestedUserIndex].requesterId = requesterId;
        return listaIds[requestedUserIndex];
    }
    return null;
}

exports.confirmLoggedStatus = (id: string) => {
    const userIndex = findIdIndex(id);
    if(listaIds[userIndex] !== null) {
        listaIds[userIndex].isLogged = true;
        return;
    }
    throw new Error('User not found');
}

const findIdIndex = (id: string): number => {
    for(let i = 0; i < listaIds.length; i++) {
        if(listaIds[i].id == id) {
            return i;
        }
    }
    return null;
}