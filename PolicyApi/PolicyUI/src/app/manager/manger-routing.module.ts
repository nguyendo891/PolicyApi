import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ManagerComponent } from './manager.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes =[
    {path:'', component: ManagerComponent
    ,canActivate:[AuthGuard]}
];

@NgModule({
    declarations: [],
    imports: [ CommonModule, RouterModule.forChild(routes) ],
    exports: [RouterModule],
})
export class ManagerRoutingModule {}