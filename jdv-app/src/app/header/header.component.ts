import { GetIdService } from './../services/get-id.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sessionId = "";

  constructor(private idService : GetIdService) { }

  ngOnInit() {
    this.idService.getId().subscribe(
      (res : any) => {
        this.idService.changeId(res.id);
        this.sessionId = parseInt(res.session, 10).toString(16);
      }
    )
  }

}
