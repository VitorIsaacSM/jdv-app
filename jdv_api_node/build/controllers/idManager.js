"use strict";
exports.__esModule = true;
var listaIds = [];
exports.geraId = function (user) {
    var oldId = user.id;
    var oldSession = user.session;
    var newId = oldId;
    if (listaIds.length !== 0) {
        for (var i = 0; i < listaIds.length; i++) {
            if (listaIds[i].session === oldSession) {
                newId = listaIds[i].id;
            }
        }
    }
    if (oldId === newId) {
        user.id = (listaIds.length + 1).toString();
        listaIds.push(user);
    }
    else {
        user.id = newId;
    }
    console.log("Usuario logado: id = " + user.id + ", session = " + oldSession);
    return user;
};
