import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { PolicyService } from './policies/policy.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoggingService } from './logging.service';

@NgModule({
    declarations: [],
    imports: [ CommonModule ],
    exports: [],
    providers: [
        ShoppingListService, 
        PolicyService,
        {
            provide: HTTP_INTERCEPTORS, 
            useClass:AuthInterceptorService, 
            multi:true
        },
    ],
})
export class CoreModule {}