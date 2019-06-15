import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loginForm : FormGroup;
  invalidUsername = '';

  constructor(private formBuilder: FormBuilder, private loginService : LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  addUser(){
    let user = {
      email: this.loginForm.get('email').value,
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
      id: 0
    }
    this.loginService.addUser(user).subscribe(
      (res) => {
        if(res.username == null){
          this.invalidUsername = user.username;
        }
        else{
          this.router.navigate(['login']);
        }
      }
    )
  }

}
