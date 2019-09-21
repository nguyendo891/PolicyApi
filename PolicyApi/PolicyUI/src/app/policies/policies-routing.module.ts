import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PoliciesComponent } from './policies.component';
import { AuthGuard } from '../auth/auth.guard';
import { PolicyStartComponent } from './policy-start/policy-start.component';
import { PolicyEditComponent } from './policy-edit/policy-edit.component';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { PoliciesResolverService } from './policies-resolver.service';
import { CommonModule } from '@angular/common';


const routes: Routes = [
     {path:'', component: PoliciesComponent
    ,canActivate:[AuthGuard]
    ,children:[
        {path:'',component: PolicyStartComponent},
        {path:'new', component: PolicyEditComponent},
        {path:':id', component: PolicyDetailComponent, resolve:[PoliciesResolverService]},
        {path:':id/edit', component: PolicyEditComponent, resolve:[PoliciesResolverService]},
    ]},
];

@NgModule({
    imports: [CommonModule,RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PoliciesRoutingModule {}
