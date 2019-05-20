import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() username : string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.loginService.checkToken().subscribe(
      () => {
        console.log('logout efetuado com sucesso');
        window.localStorage.removeItem('token');
        this.router.navigate(['']);
      }
    )

  }

}
