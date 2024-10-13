import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConductorCreateComponent } from './conductores/conductor-create/conductor-create.component';
import { ConductorListComponent } from './conductores/conductor-list/conductor-list.component';
import { ConductorViewComponent } from './conductores/conductor-view/conductor-view.component';
import { ConductorEditComponent } from './conductores/conductor-edit/conductor-edit.component';
import { BusCreateComponent } from './buses/bus-create/bus-create.component';
import { BusListComponent } from './buses/bus-list/bus-list.component';
import { BusViewComponent } from './buses/bus-view/bus-view.component';
import { BusEditComponent } from './buses/bus-edit/bus-edit.component';
import { RutaCreateComponent } from './rutas/ruta-create/ruta-create.component';
import { RutaListComponent } from './rutas/ruta-list/ruta-list.component';
import { RutaViewComponent } from './rutas/ruta-view/ruta-view.component';
import { RutaEditComponent } from './rutas/ruta-edit/ruta-edit.component';
import { ConsultaListComponent} from "./usuario/consulta-list/consulta-list.component";
import { ConsultaViewComponent} from "./usuario/consulta-view/consulta-view.component";


export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent }, // Ruta para el dashboard
  { path: 'crear-conductor', component: ConductorCreateComponent }, // Ruta para crear conductor
  { path: 'conductores', component: ConductorListComponent }, // Ruta para listar conductores
  { path: 'conductores/editar/:id', component: ConductorEditComponent },
  { path: 'conductores/ver/:id', component: ConductorViewComponent }, // Ruta para ver un conductor
  { path: 'buses/crear', component: BusCreateComponent },
  { path: 'buses/ver/:id', component: BusViewComponent },
  { path: 'buses/editar/:id', component: BusEditComponent },
  { path: 'buses', component: BusListComponent },
  { path: 'rutas', component: RutaListComponent},
  { path: 'rutas/crear', component: RutaCreateComponent },
  { path: 'rutas/ver/:id', component: RutaViewComponent },
  { path: 'rutas/editar/:id', component: RutaEditComponent },
  { path: 'usuario', component: ConsultaListComponent},
  { path: 'usuario/ver/ruta/:id', component: ConsultaViewComponent},

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' } // Redirección al dashboard
];
