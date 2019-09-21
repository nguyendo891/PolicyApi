import { Policy } from "./policy.model";
import { Injectable } from "@angular/core";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { SubPolicy } from "../shared/sub-policy.model";

@Injectable()
export class PolicyService {
    policiesChanged= new Subject<Policy[]>();

    private policies: Policy[] = [];
    constructor( private slService: ShoppingListService){

    }  

    setPolicies(policies: Policy[]){
        this.policies = policies;
        this.policiesChanged.next(this.policies.slice());
    }

    getPolicies() {
        return this.policies.slice();
    }  

    getPolicy(index :number) {
        return this.policies[index];
    }
    addSubPoliciesToShoppingList(subPolicies: SubPolicy[]) {
      this.slService.addSubPolicies(subPolicies);
    }

    addPolicy(policy: Policy){
        this.policies.push(policy);
        this.policiesChanged.next(this.policies.slice());
    }

    updatePolicy(index: number, newPolicy: Policy){
        this.policies[index] = newPolicy;
        this.policiesChanged.next(this.policies.slice());
    }

    deletePolicy(index: number){
        this.policies.splice(index, 1);
        this.policiesChanged.next(this.policies.slice());
    }
}
