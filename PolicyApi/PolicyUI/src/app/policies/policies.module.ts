import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { PoliciesComponent } from './policies.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { PolicyItemComponent } from './policy-list/policy-item/policy-item.component';
import { PolicyStartComponent } from './policy-start/policy-start.component';
import { PolicyEditComponent } from './policy-edit/policy-edit.component';
import { PoliciesRoutingModule } from './policies-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        PoliciesComponent,
        PolicyListComponent,
        PolicyDetailComponent,
        PolicyItemComponent,
        PolicyStartComponent,
        PolicyEditComponent,
    ],
    imports: [ 
        RouterModule,
        ReactiveFormsModule,
        PoliciesRoutingModule,
        SharedModule
     ],
})
export class PoliciesModule {}