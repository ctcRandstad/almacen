import { Component, OnInit } from '@angular/core';
import { PaletService } from 'src/app/Services/palet/palet.service';

@Component({
  selector: 'app-ver-salidas',
  templateUrl: './ver-salidas.page.html',
  styleUrls: ['./ver-salidas.page.scss'],
})
export class VerSalidasPage implements OnInit {

  constructor(
    private _sobpeti: PaletService
    ) {
    
  }

  ngOnInit() {
  }


  ionViewWillEnter(){
    this.getComandasPalet();
   
  }

  data:any=[];
  getComandasPalet(){
  this._sobpeti.getEntradasPalet()
  .subscribe(res=>{
    if (res != 'error') {
      this.data =res;  
    }
  })
}


}
