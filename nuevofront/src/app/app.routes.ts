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
import { AsignacionBusComponent } from './asignaciones/asignacion-bus/asignacion-bus.component';
import { AsignacionRutaComponent } from './asignaciones/asignacion-ruta/asignacion-ruta.component';
import { RutasListComponent} from './usuario/rutas-list/rutas-list.component';
import { RutasViewComponent} from './usuario/rutas-view/rutas-view.component';


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
  { path: 'rutas/crear', component: RutaCreateComponent },
  { path: 'rutas/ver/:id', component: RutaViewComponent },
  { path: 'rutas/editar/:id', component: RutaEditComponent },
  { path: 'rutas', component: RutaListComponent },
  { path: 'usuario', component: RutasListComponent},
  { path: 'consulta/:id', component: RutasViewComponent},
  { path: 'asignaciones/asignar-bus/:conductorId', component: AsignacionBusComponent},
  { path: 'asignaciones/asignar-ruta/:id', component: AsignacionRutaComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' } // Redirección al dashboard
];
