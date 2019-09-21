import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { CommonModule } from "@angular/common";


const appRoutes: Routes = [
    {path:'', redirectTo:'/policies', pathMatch: 'full'}, 
    {path: 'policies', loadChildren:() => import('./policies/policies.module')
    .then(m => m.PoliciesModule)},
    {path: 'shopping-list', loadChildren:() => import('./shopping-list/shopping-list.module')
    .then(m => m.ShoppingListModule)},
    {path: 'auth', loadChildren:() => import('./auth/auth.module')
    .then(m =>m.AuthModule)},
    {path:'manager', loadChildren:() => import('./manager/manager.module'). then (m => m.ManagerModule)}
];

@NgModule({
    imports:[CommonModule,RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {}