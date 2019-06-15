import { Component, OnInit } from '@angular/core';
import { GetDataService } from './get-data.service';
import { ObjetoJson } from './objetoJson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'siteProj';
  data : ObjetoJson[] = [];

  objNome : string;
  objIdade: string;
  objEmprego: string;
  objFormacao: string;

  constructor(private service: GetDataService){

  }

  ngOnInit(){
    setTimeout(()=>{
      this.service.getDataFromServer().subscribe( data => {
        this.data = data;
        console.log(this.data);
      });
    }, 100);
  }

  evento(){
    setTimeout(()=>{
      window.location.href = 'https://angular-pessoa-app.herokuapp.com/';
    }, 1500);
  }

  addUser(){
    let objeto: ObjetoJson = {
      nome: this.objNome,
      idade: this.objIdade,
      emprego: this.objEmprego,
      formacao: this.objFormacao
    };

    console.log(objeto);
    this.service.addUserOnServer(objeto).subscribe();
  }

  resetData(){
    this.service.resetDataFromServer().subscribe(()=>{console.log('dados resetados')});
  }

  getData(){
    this.service.getDataFromServer().subscribe( data => {
      this.data = data;
      console.log(this.data);
    });
    
  }
}
