import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var AppPhotosComponent = /** @class */ (function () {
    function AppPhotosComponent() {
        this.description = '';
        this.url = '';
    }
    AppPhotosComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input('description'),
        tslib_1.__metadata("design:type", String)
    ], AppPhotosComponent.prototype, "description", void 0);
    tslib_1.__decorate([
        Input('url'),
        tslib_1.__metadata("design:type", String)
    ], AppPhotosComponent.prototype, "url", void 0);
    AppPhotosComponent = tslib_1.__decorate([
        Component({
            selector: 'app-photo',
            templateUrl: './app-photos.component.html',
            styleUrls: ['./app-photos.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AppPhotosComponent);
    return AppPhotosComponent;
}());
export { AppPhotosComponent };
//# sourceMappingURL=app-photos.component.js.map