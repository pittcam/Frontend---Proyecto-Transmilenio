import { Routes } from '@angular/router';
import { LoginComponent} from './componentes/login/login.component';
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
import { SeleccionarDiasComponent} from './buses/seleccionar-dias/seleccionar-dias.component';
import {RegistrarseComponent} from './componentes/registrarse/registrarse.component';
import {Role} from './dto/role';
import {roleGuard} from './guards/role.guard';
import {authGuard} from './guards/auth.guard';


export const routes: Routes = [
  { path: 'login',
    component: LoginComponent
  },

  { path: 'registrarse',
    component: RegistrarseComponent
  },

  { path: 'dashboard',
    component: DashboardComponent
  }, // Ruta para el dashboard
  { path: 'crear-conductor',
    component: ConductorCreateComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] }
  },

  { path: 'conductores',
    component: ConductorListComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] }
  },

  { path: 'conductores/editar/:id',
    component: ConductorEditComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] } },

  { path: 'conductores/ver/:id',
    component: ConductorViewComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] }
  },

  { path: 'buses/crear',
    component: BusCreateComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] }
  },

  { path: 'buses/ver/:id',
    component: BusViewComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] }
  },

  { path: 'buses/editar/:id',
    component: BusEditComponent ,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] }
  },

  { path: 'buses',
    component: BusListComponent ,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] }
  },

  { path: 'rutas/crear',
    component: RutaCreateComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Coordinador] }
  },

  { path: 'rutas/ver/:id',
    component: RutaViewComponent ,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Coordinador, Role.User] }
  },

  { path: 'rutas/editar/:id',
    component: RutaEditComponent ,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Coordinador] }
  },

  { path: 'rutas',
    component: RutaListComponent ,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Coordinador] }
  },

  { path: 'usuario',
    component: RutasListComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.User] }
  },

  { path: 'consulta/:id',
    component: RutasViewComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.User] }
  },

  { path: 'asignaciones/asignar-bus/:conductorId',
    component: AsignacionBusComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] }
  },

  { path: 'asignaciones/asignar-ruta/:id',
    component: AsignacionRutaComponent
    ,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] }
  },

  { path: 'buses/seleccionar-dias/:id',
    component: SeleccionarDiasComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] }
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirección al login
];
