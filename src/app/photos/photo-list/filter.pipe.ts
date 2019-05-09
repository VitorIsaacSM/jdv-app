import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo';

@Pipe({
    name:'filterByDescription'
})
export class filterByDescription implements PipeTransform{

    transform(photos: Photo[], descriptionQuery: string) : Photo[] {
        let rPhotos: Photo[] = [];
        descriptionQuery = descriptionQuery
        .trim()
        .toLowerCase()
        console.log(descriptionQuery);
        if(descriptionQuery){
            rPhotos = photos.filter( photo => {
                return photo.description.toLowerCase().includes(descriptionQuery);
            });
            console.log(rPhotos);
            return rPhotos;
        }
        else{
            return photos;
        }
    }

}