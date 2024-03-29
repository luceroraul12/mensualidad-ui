import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FacturaDto } from 'src/app/interfaces/servicio.interface';
import { ComunicadorService } from 'src/app/services/comunicador.service';
import { TablaServiceService } from 'src/app/services/tabla-service.service';

@Component({
  selector: 'app-servicio-dialog-tabla-formulario',
  templateUrl: './servicio-dialog-tabla-formulario.component.html',
  styleUrls: ['./servicio-dialog-tabla-formulario.component.css']
})
export class ServicioDialogTablaFormularioComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;
  public facturaCopia: FacturaDto = {...this.factura};

  constructor(
    public dialogRef: MatDialogRef<ServicioDialogTablaFormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public factura: FacturaDto,
    public tablaService: TablaServiceService<FacturaDto>
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.tablaService.comunicadorFormularioTabla$.subscribe(
      factura => this.dialogRef.close()
    );
  }

}
