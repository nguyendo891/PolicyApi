import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';

import {Policy} from './policy.model';
import { DataStorageService } from '../shared/data-storage.service';
import { PolicyService } from './policy.service';

@Injectable({providedIn:'root'})
export class PoliciesResolverService implements Resolve<Policy[]>{

    constructor(private dataStorageService: DataStorageService,
                private policiesService : PolicyService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const policies = this.policiesService.getPolicies();
      
        if(policies.length === 0) {
            return this.dataStorageService.fetchPolicies();
        } else {
            return policies;
        }
        
    }
}
