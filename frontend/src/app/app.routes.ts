import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReserveComponent } from './pages/reserve/reserve.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'reserve', component: ReserveComponent },
    { path: '**', redirectTo: '' }
];
