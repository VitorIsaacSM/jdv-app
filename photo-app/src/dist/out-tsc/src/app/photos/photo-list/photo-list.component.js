import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PhotoService } from '../app-photos/photo.service';
var PhotoListComponent = /** @class */ (function () {
    /* loopFunc = () => {
      if(this.photosIndex == 13){
        this.photosIndex = 0;
      }
      else{
        this.photosIndex++;
      }
      this.photoUrl = this.photos[this.photosIndex].url;
      setTimeout(this.loopFunc, 1500);
    } */
    function PhotoListComponent(photoService) {
        var _this = this;
        this.photoService = photoService;
        this.photos = [];
        /* photoUrl : String;
        photosIndex: number = 0;
       */
        this.a = function (photos) {
            _this.photos = photos;
        };
    }
    PhotoListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.photoService.ListFromServer('').subscribe(function (photos) {
            _this.a(photos);
            console.log(_this.photos);
        });
    };
    PhotoListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-photo-list',
            templateUrl: './photo-list.component.html',
            styleUrls: ['./photo-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [PhotoService])
    ], PhotoListComponent);
    return PhotoListComponent;
}());
export { PhotoListComponent };
//# sourceMappingURL=photo-list.component.js.map