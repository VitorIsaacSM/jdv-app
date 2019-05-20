import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm : FormGroup;
  invalid: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService : LoginService, private router: Router) { }

  ngOnInit() {

    this.checkToken();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  

  checkToken(){
    this.loginService.checkToken().subscribe(
      (user : any)=>{
        if(!user.noToken){
          console.log('token found, redirecting');
          this.router.navigate(['user',user.name]);
        }
      }
    )
  }

  login(){
    this.loginService.login({
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }).subscribe(
      (seila : any) => {
        console.log(seila);
        if(seila.invalid){
          this.invalid = true;
        }
        else{
          console.log(seila);
          window.localStorage.setItem('token',seila.token);
          this.checkToken();
        }
      }
    );
  }
}
