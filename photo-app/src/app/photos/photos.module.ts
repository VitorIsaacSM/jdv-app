import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppPhotosComponent } from './app-photos/app-photos.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { CommonModule } from '@angular/common';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { filterByDescription } from './photo-list/filter.pipe';
import { lengthZero } from './photo-list/lengthZero.pipe';
import { LoadButtonComponent } from './photo-list/load-button/load-button.component';


@NgModule({
    declarations: [
        AppPhotosComponent, 
        PhotoListComponent,
        PhotoFormComponent,
        filterByDescription,
        lengthZero,
        LoadButtonComponent

    ],
    imports: [
        HttpClientModule,
        CommonModule
    ],
    exports: [
        PhotoListComponent
    ]
    
})
export class PhotosModule{

}