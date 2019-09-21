import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PolicyService } from '../policy.service';
import { Policy } from '../policy.model';

@Component({
  selector: 'app-policy-edit',
  templateUrl: './policy-edit.component.html',
  styleUrls: ['./policy-edit.component.css']
})
export class PolicyEditComponent implements OnInit {
  id: number;
  editMode = false;
  policyForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private policyService : PolicyService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit(){
    if(this.editMode) {
      this.policyService.updatePolicy(this.id,this.policyForm.value);
    }else{
      this.policyService.addPolicy(this.policyForm.value);
    }
    this.onCancel();
  }

  private initForm() {

    let policyName = '';
    let policyImagePath = '';
    let policyDescription = '';
    let policySubPolicies = new FormArray([]);

    if(this.editMode){
      const policy = this.policyService.getPolicy(this.id);
      policyName = policy.name;
      policyImagePath = policy.imagePath;
      policyDescription= policy.description;
      if( policy['subPolicies']) {
        for (let subPolicy of policy.subPolicies) {
          policySubPolicies.push(
              new FormGroup({
                'name': new FormControl(subPolicy.name, Validators.required),
                'amount': new FormControl(subPolicy.amount,[
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
        }
      }
    }

    this.policyForm = new FormGroup({
      'name': new FormControl(policyName, Validators.required),
      'imagePath': new FormControl(policyImagePath,Validators.required),
      'description': new FormControl(policyDescription,Validators.required),
      'subPolicies': policySubPolicies,
    });
  }

  onAddSubPolicies() {
    (<FormArray>this.policyForm.get('subPolicies')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount' : new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  get controls(){
    return (this.policyForm.get('subPolicies') as FormArray).controls;
  }

  onDeleteSubPolicy(index: number){
    (<FormArray>this.policyForm.get('subPolicies')).removeAt(index);
  }
}
