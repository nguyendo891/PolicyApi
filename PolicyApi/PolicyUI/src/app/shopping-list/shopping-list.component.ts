import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubPolicy } from '../shared/sub-policy.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  subPolicies: SubPolicy[];
  private igChangeSub: Subscription; 
  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.subPolicies = this.shoppingListService.getSubPolicies();
    this.igChangeSub = this.shoppingListService.subPoliciesChanged.subscribe(
      (subPolicies: SubPolicy[]) => {
        this.subPolicies = subPolicies;
      }
    )

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }
  
  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditting.next(index);
  }
}
