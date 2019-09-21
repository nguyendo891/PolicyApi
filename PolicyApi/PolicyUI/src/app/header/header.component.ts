import { Component, OnInit, OnDestroy} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { User } from "../auth/user.model";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    // isAuthenticatedByAdmin = false;
    currentUser: User;
    private userSub :Subscription;
    constructor(private dataStorageService: DataStorageService,
                private authService:AuthService){}
    ngOnInit() {
      this.userSub = this.authService.user.subscribe(
        user => {
          this.isAuthenticated = !!user;
          this.currentUser = user;
          // if(this.currentUser.token)
            console.log(!!user);
            console.log(!user);
          }
      );  
    }
    onSaveData(){
        this.dataStorageService.storePolicies();
    }

    onFetchData(){
      this.dataStorageService.fetchPolicies().subscribe();
    }

    onDeleteData() {
      this.dataStorageService.deletePolicies();
    }
    onLogout() {
        this.authService.logout();
    }
    
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}
