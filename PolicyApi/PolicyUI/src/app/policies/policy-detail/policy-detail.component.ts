import { Component, OnInit} from '@angular/core';
import { Policy } from '../policy.model';
import { PolicyService } from '../policy.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.css']
})
export class PolicyDetailComponent implements OnInit {
  policy: Policy;
  id: number;
  constructor(private policyService: PolicyService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.policy = this.policyService.getPolicy(this.id);
      }
    )
  }

  onAddToShoppingList(){
    
    this.policyService.addSubPoliciesToShoppingList(this.policy.subPolicies);
  }

  onEditPolicy() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onDeletePolicy(){
    this.policyService.deletePolicy(this.id);
    this.router.navigate(['/policies'], {relativeTo: this.route});
  }
}
