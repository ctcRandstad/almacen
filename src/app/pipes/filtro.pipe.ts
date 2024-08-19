import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    
    if (query) {
      return _.filter(array, row => (
        row.nombreCategoria+
        row.ancho+
        row.largo+
        row.razonSocial+
        row.nombreMaterial+
        row.codigo+
        row.idPedido+
        row.instruccion+
        row.fecha+
        row.paraFecha+
        row.estadoPedido+
        row.estado+
        row.idAlbaran+
        row.instruccionSobrantes
        ).toLowerCase().indexOf(query) > -1
        
        );
      }
    return array;
  }

}
