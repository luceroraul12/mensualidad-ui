import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first, Subscription } from 'rxjs';
import { PagoDto } from 'src/app/interfaces/pago.interface';
import { FacturaDto } from 'src/app/interfaces/servicio.interface';
import { ComunicadorService } from 'src/app/services/comunicador.service';
import { PagoService } from 'src/app/services/pago.service';
import { ResumenService } from 'src/app/services/resumen.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { TablaServiceService } from 'src/app/services/tabla-service.service';
import { ResumenDialogPagoComponent } from '../resumen-dialog-pago/resumen-dialog-pago.component';

@Component({
  selector: 'app-tabla-resumen',
  templateUrl: './tabla-resumen.component.html',
  styles: [
  ]
})
export class TablaResumenComponent implements OnInit, OnDestroy {

  public fechaElegida!: Date;;

  public facturasPagadas!: FacturaDto[];
  public facturasSinPagar!: FacturaDto[];
  public pagosRealizados!: PagoDto[];
  private facturasTotales!: FacturaDto[];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private comunicadorService: ComunicadorService,
    private resumenService: ResumenService,
    private tablaService: TablaServiceService<PagoDto>,
    private dialog: MatDialog,
    private facturaService: ServicioService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.fechaElegida = new Date(Date.now());
    this.subscriptions.add(this.comunicadorService.fechaResumen$.subscribe(
      fecha => {
        this.fechaElegida = fecha;
        this.traerTodosLosPagosDelBackend();
      }
    ));
    this.subscriptions.add(this.tablaService.comunicadorFormularioTabla$.subscribe(
      () => {
        this.traerTodosLosPagosDelBackend();
      } 
    ));
    this.subscriptions.add(this.facturaService.leer().subscribe(resultado => this.facturasTotales = resultado));
  }
  abrirFromularioPago(facturaSeleccionada: FacturaDto): void {
    this.dialog.open(ResumenDialogPagoComponent,{data: facturaSeleccionada})
  }
  traerTodosLosPagosDelBackend():void  {
    this.resumenService.obtenerResumenMesAnio(this.fechaElegida.getMonth()+1,this.fechaElegida.getFullYear())
    .pipe(first())
    .subscribe(
      ({facturasImpagas,facturasPagadas,pagosPagados}) => {
        this.facturasPagadas = facturasPagadas;
        this.facturasSinPagar = facturasImpagas;
        this.pagosRealizados = pagosPagados;
        this.comunicadorService.pagosResumen$.next(pagosPagados);
      }
    )
  }
}


