import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { SubPolicy } from 'src/app/shared/sub-policy.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { format } from 'util';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: SubPolicy;
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditting
    .subscribe(
      (index: number)=>{
          this.editedItemIndex = index;
          this.editMode =true;
          this.editedItem = this.slService.getSubPolicy(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
      }
    );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newSubPolicy = new SubPolicy(value.name, value.amount);
    if(this.editMode){
      this.slService.updateSubPolicy(this.editedItemIndex, newSubPolicy);
    }
    else{
      this.slService.addSubPolicy(newSubPolicy);
    }
    this.editMode =false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode =false;
  }

  onDelete(){
    this.slService.deleteSubPolicies(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
  }

  
}
