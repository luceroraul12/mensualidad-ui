import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensualidadRoutingModule } from './mensualidad-routing.module';
import { MensualidadComponent } from './mensualidad.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './menu/menu.component';
import { TablaPagoComponent } from './pag/components/tabla-pago/tabla-pago.component';
import { TablaServicioComponent } from './servicio/components/tabla-servicio/tabla-servicio.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ServicioComponent } from './servicio/servicio.component';
import { PagComponent } from './pag/pag.component';
import { ResumenComponent } from './resumen/resumen.component';
import { FormularioResumenComponent } from './resumen/components/formulario-resumen/formulario-resumen.component';
import { FormularioPagoComponent } from './pag/components/formulario-pago/formulario-pago.component';
import { TablaResumenComponent } from './resumen/components/tabla-resumen/tabla-resumen.component';
import { FormularioServicioComponent } from './servicio/components/formulario-servicio/formulario-servicio.component';
import { ResumenDialogPagoComponent } from './resumen/components/resumen-dialog-pago/resumen-dialog-pago.component';
import { ServicioDialogTablaFormularioComponent } from './servicio/components/servicio-dialog-tabla-formulario/servicio-dialog-tabla-formulario.component';
import { PagDialogComponent } from './pag/components/pag-dialog/pag-dialog.component';
import { FacturaOrdenPipe } from './servicio/pipe/factura-orden.pipe';
import { PagoOrdenPipe } from './pag/pipes/pago-orden.pipe';


@NgModule({
  declarations: [
    MensualidadComponent,
    MenuComponent,
    FormularioServicioComponent,
    FormularioPagoComponent,
    TablaServicioComponent,
    TablaPagoComponent,
    TablaResumenComponent,
    ServicioComponent,
    PagComponent,
    ResumenComponent,
    FormularioResumenComponent,
    ResumenDialogPagoComponent,
    ServicioDialogTablaFormularioComponent,
    PagDialogComponent,
    FacturaOrdenPipe,
    PagoOrdenPipe
  ],
  imports: [
    CommonModule,
    FormsModule,


    MensualidadRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class MensualidadModule { }
