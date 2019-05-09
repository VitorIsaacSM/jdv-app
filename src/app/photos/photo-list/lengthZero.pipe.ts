import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo';

@Pipe({
    name:'lengthZero'
})
export class lengthZero implements PipeTransform{

    transform(photos: Photo[], descriptionQuery: string) : boolean {
        let rPhotos: Photo[] = [];
        descriptionQuery = descriptionQuery
        .trim()
        .toLowerCase()
        if(descriptionQuery){
            rPhotos = photos.filter( photo => {
                return photo.description.toLowerCase().includes(descriptionQuery);
            });
           
            if(rPhotos.length === 0){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

}