import { Component, OnInit, OnDestroy} from '@angular/core';
import { Policy } from '../policy.model';
import { PolicyService } from '../policy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subscribable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';


@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit, OnDestroy {

  policies:Policy[];
  policySubscription: Subscription;
  authSubscription: Subscription;
  deletePoliciesSubscription: Subscription;
  savedPoliciesSubscription: Subscription;
  isEnabled: boolean;
  text: string;
  constructor(private policyService: PolicyService,
              private authService: AuthService,
              private dataStorageService: DataStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.isEnabled = false;
    this.policySubscription = this.policyService.policiesChanged
    .subscribe(
      (policies: Policy[]) => {
        this.policies = policies;
        this.isEnabled = false;
      })
    this.policySubscription = this.authService.clearItem
      .subscribe(result => {
        this.policies = null;
      })
    this.deletePoliciesSubscription = this.dataStorageService.deletePoliciesChanged
      .subscribe(result => {
        this.policies = null;
        this.text = result;
        this.isEnabled = true;
      })

    this.savedPoliciesSubscription = this.dataStorageService.savedPoliciesChanged
      .subscribe(result => {
        this.isEnabled = true;
        this.text = result;
        this.policies = null;
      })
    this.policies = this.policyService.getPolicies();
  }

  onNewPolicy(){
      this.router.navigate(['new'], {relativeTo: this.route});
  }
 ngOnDestroy(): void {
   //Called once, before the instance is destroyed.
   //Add 'implements OnDestroy' to the class.
   this.policySubscription.unsubscribe();
   if (this.authSubscription && !this.authSubscription.closed) {
     this.authSubscription.unsubscribe();
   }
   if (this.deletePoliciesSubscription && !this.deletePoliciesSubscription.closed) {
     this.deletePoliciesSubscription.unsubscribe();
   }
   if (this.savedPoliciesSubscription && !this.savedPoliciesSubscription.closed) {
     this.savedPoliciesSubscription.unsubscribe();
   }
   this.isEnabled = false;
 }
}
