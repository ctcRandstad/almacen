import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  constructor(
  
    // public storage: Storage,
  ) { }


  main:string = 'Pantalla principal'
  data:any=[];
  public filterQuery = "";
  public rowsOnPage = 10;
  tipoUsuario:any;
  ngOnInit() {
    
  }
  



  
}
