import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var PhotoService = /** @class */ (function () {
    function PhotoService(http) {
        this.http = http;
    }
    PhotoService.prototype.ListFromServer = function (userName) {
        return this.http
            .get('http://localhost:3000/flavio/photos');
    };
    PhotoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], PhotoService);
    return PhotoService;
}());
export { PhotoService };
//# sourceMappingURL=photo.service.js.map