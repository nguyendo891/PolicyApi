import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ManagerComponent } from './manager.component';
import { ManagerRoutingModule } from './manger-routing.module';


@NgModule({
    declarations: [
        ManagerComponent
    ],
    imports: [ 
        CommonModule,
        RouterModule,
        ReactiveFormsModule, 
        SharedModule,
        ManagerRoutingModule],
})
export class ManagerModule {}