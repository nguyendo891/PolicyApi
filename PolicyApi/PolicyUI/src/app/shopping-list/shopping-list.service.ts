import { SubPolicy } from "../shared/sub-policy.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    subPoliciesChanged = new Subject<SubPolicy[]>();
    startedEditting = new Subject<number>();
    private subPolicies: SubPolicy[] = [
        new SubPolicy('Apples',5),
        new SubPolicy('Tomatoes',10)
      ];

    getSubPolicies(){
        return this.subPolicies.slice();
    }
    
    getSubPolicy(index: number){
        return this.subPolicies[index];
    }

    addSubPolicy(subPolicy: SubPolicy){
      this.subPolicies.push(subPolicy);
      this.subPoliciesChanged.next(this.subPolicies.slice());
    }

    addSubPolicies(subPolicies: SubPolicy[]){
      this.subPolicies.push(...subPolicies);
      this.subPoliciesChanged.next(this.subPolicies.slice());
    }

    updateSubPolicy(index: number, newSubPolicy: SubPolicy){
        this.subPolicies[index] = newSubPolicy;
        this.subPoliciesChanged.next(this.subPolicies.slice());
    }

    deleteSubPolicies(index: number){
        this.subPolicies.splice(index,1);
        this.subPoliciesChanged.next(this.subPolicies.slice());
    }
}
