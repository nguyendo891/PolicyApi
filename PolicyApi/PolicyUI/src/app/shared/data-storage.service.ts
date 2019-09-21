import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Policy } from '../policies/policy.model';
import { PolicyService } from '../policies/policy.service';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class DataStorageService {
    deletePoliciesChanged = new Subject<string>();
    savedPoliciesChanged = new Subject<string>();
    constructor(private http: HttpClient,
                private policiesService: PolicyService,
                private authService: AuthService,
      @Inject('BASE_URL') private baseUrl: string) {
    }
   
  storePolicies() {
    const policies = this.policiesService.getPolicies();
   
    //this.http.post(this.baseUrl + 'api/policy/ValidateCurrentUser',
    //  {
    //    email: currentUser.email,
    //    token: currentUser.token
    //  }
    //).subscribe(response => {
    //  console.log(response);
    //});

    this.http.put<Policy[]>(this.baseUrl + 'api/policy/StorePolicies',policies
        )
      .subscribe(response => {
        console.log(response);
        this.savedPoliciesChanged.next("Saved!");
      });
    }

    fetchPolicies() {
        // "take" operator gets 1 value and then it auto unsubscribe
        // ExhaustMap converts user observable to a new observabler 
        //pipe series : take(1) -> exhaustMap: to convert to http observable -> map: the recipes of the http observable -> tap: the recipes
      return this.http.get<Policy[]>(this.baseUrl + 'api/policy', 
      ).pipe(map(policies => {
                    return policies.map(policy => 
                        {
                        return {...policy, subPolicies: policy.subPolicies ? policy.subPolicies : []}
                        });
                }),
                tap(policies => {
                this.policiesService.setPolicies(policies);
            }));   
    }

    deletePolicies() {
       this.http.delete(this.baseUrl + 'api/policy/deleteall').subscribe(response => {
         console.log(response);
         this.deletePoliciesChanged.next("deleted!");
      });
    }
}
