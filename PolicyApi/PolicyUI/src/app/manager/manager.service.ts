import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Account } from "./account.model";

@Injectable({providedIn:'root'})
export class ManagerService {

    constructor(private http: HttpClient ,
                private authService: AuthService,
                @Inject('BASE_URL') private baseUrl: string) {
    }

    getAllData(){
       return this.http.get<Account[]>(this.baseUrl+'api/accountmanager/GetAllAccounts');   
    }
}