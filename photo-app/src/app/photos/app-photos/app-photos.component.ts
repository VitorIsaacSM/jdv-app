import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './app-photos.component.html',
  styleUrls: ['./app-photos.component.css']
})
export class AppPhotosComponent implements OnInit {

  @Input('description') description: string = '';

  @Input('url') url: string = '';

  constructor() { }

  ngOnInit() {

  }

}
