import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialService } from '../../Services/material/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {

  constructor( 
    private rutaActiva: ActivatedRoute,
    private _material:MaterialService
    ) { }
  idMaterial:any;
  data:any;
  ngOnInit() {
    this.idMaterial=  this.rutaActiva.snapshot.params['id'];
    console.log(this.idMaterial);
    
    this._material.getMateterialId( this.idMaterial)
    .subscribe(data=>{ 
      if (data == 'error') {
        alert('Error en el material.')
      } else {
        this.data = data[0].nombreMaterial;
        // console.log(this.data);
        
      }
    });
  }

}
