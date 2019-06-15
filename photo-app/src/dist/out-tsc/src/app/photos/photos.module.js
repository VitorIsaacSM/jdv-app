import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppPhotosComponent } from './app-photos/app-photos.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { CommonModule } from '@angular/common';
import { PhotoFormComponent } from './photo-form/photo-form.component';
var PhotosModule = /** @class */ (function () {
    function PhotosModule() {
    }
    PhotosModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppPhotosComponent,
                PhotoListComponent, PhotoFormComponent
            ],
            imports: [
                HttpClientModule,
                CommonModule
            ],
            exports: [
                PhotoListComponent
            ]
        })
    ], PhotosModule);
    return PhotosModule;
}());
export { PhotosModule };
//# sourceMappingURL=photos.module.js.map