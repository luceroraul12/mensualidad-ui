import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Actividad } from 'src/app/interfaces/informacionFormularioTabla.interface';
import { Factura } from 'src/app/interfaces/servicio.interface';
import { ServicioService } from 'src/app/services/servicio.service';
import { TablaServiceService } from 'src/app/services/tabla-service.service';

@Component({
  selector: 'app-formulario-servicio',
  templateUrl: './formulario-servicio.component.html',
  styles: [
  ]
})
export class FormularioServicioComponent implements OnInit {

  @ViewChild('formServicio') formServicio!: NgForm;
  @Input() esParaModificar: boolean = false;
  @Input() facturaModificable!: Factura;

  public facturaParaCrear: Factura = {
    nombre: '',
    url: ''
  }

  constructor(
    private servicioService: ServicioService,
    private tablaService: TablaServiceService<Factura>
  ) { }

  ngOnInit(): void {
  }

  cargarFormulario(): void {
    if(!this.esParaModificar){
      this.servicioService.agregar(this.facturaParaCrear).subscribe(
        respuesta => {
          console.log('servicio registrado', respuesta);
          this.formServicio.resetForm();
          this.tablaService.comunicadorFormularioTabla$.next({
            actividad: Actividad.CREAR,
            elemento: respuesta
          });
        }
      )
    } else {
      this.servicioService.modificar(this.facturaParaCrear).subscribe(
        respuesta => {
          console.log('servicio modificado', respuesta);
          this.formServicio.resetForm();
          this.tablaService.comunicadorFormularioTabla$.next({
            actividad: Actividad.MODIFICAR,
            elemento: respuesta
          });
        }
      )
    }
    
  }

}
