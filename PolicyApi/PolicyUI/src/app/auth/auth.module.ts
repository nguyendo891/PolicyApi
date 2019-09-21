import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AuthComponent],
    imports: [ 
        FormsModule,
        RouterModule.forChild([{path:'', component:AuthComponent}]),
        SharedModule
    ],

    exports: [],
    providers: [],
})
export class AuthModule {}