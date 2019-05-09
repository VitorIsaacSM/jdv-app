import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { Photo } from '../photo';
import { PhotoService } from '../photo.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {
  

  photos: Photo[] = [];
  userName: string = '';
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  

  constructor(private photoService: PhotoService, private activatedRoute: ActivatedRoute){
    
  }
  ngOnInit(): void{
    
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data.photos

    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => this.filter = filter);
  }


  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  load() {
    this.photoService
        .listFromUserPaginated(this.userName, ++this.currentPage)
        .subscribe(photos => {
            this.photos = this.photos.concat(photos);
            if(!photos.length) this.hasMore = false;
        });
}
}
