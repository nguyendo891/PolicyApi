import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

export interface AuthResponseData {
    token: string;
    email: string;
    expiresIn: string;
    userTokenId: string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    clearItem = new Subject();
    private tokenExpirationTimer: any;
    
    constructor(private http: HttpClient,
                private router: Router,
                @Inject('BASE_URL') private baseUrl: string){
    }

    signup(email: string, password: string, role: string){
        return this.http.post<AuthResponseData>(
          this.baseUrl + 'api/signup',
        {
            email: email,
            password: password,
            role: role
        })
        .pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email,resData.userTokenId, resData.token, +resData.expiresIn);
        }));
    }

    logout() {
        this.user.next(null);
        this.clearItem.next();
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        // need to clear the token expiration timer because , if we logout manually before the timer ends, it will call logout again
        if(this.tokenExpirationTimer) {
           clearTimeout(this.tokenExpirationTimer); 
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        },expirationDuration);

    }

    private handleAuthentication (email: string, userTokenId: string, token: string, expiresIn: number )  {
        const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
        const user = new User(email, userTokenId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    } 

    autoLogin() {
        const userData: {email:string;
                         id: string;
                        _token: string;
                        _tokenExpirationDate: string
                        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }

        const loadedUser = new User(userData.email,
                                    userData.id,
                                    userData._token, 
                                    new Date(userData._tokenExpirationDate));
        if(loadedUser.token) {
            this.user.next(loadedUser);
            //check remaining time to auto logout 
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }                            
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            //'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
            this.baseUrl + 'api/signin/authenticate',
            {
                email: email,
                password: password
            })
            .pipe(catchError(this.handleError),tap(resData => {
                this.handleAuthentication(resData.email,resData.userTokenId, resData.token, +resData.expiresIn);
            }));
        }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage ="This email exists already!";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email does not exist.";    
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "This password is not correct.";
                break;
        }
        
        return throwError(errorMessage);
    }
}
