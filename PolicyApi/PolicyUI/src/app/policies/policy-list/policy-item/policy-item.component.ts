import { Component, OnInit, Input } from '@angular/core';
import { Policy } from '../../policy.model';
import { PolicyService } from '../../policy.service';

@Component({
  selector: 'app-policy-item',
  templateUrl: './policy-item.component.html',
  styleUrls: ['./policy-item.component.css']
})
export class PolicyItemComponent implements OnInit {
  @Input() policy: Policy;
  @Input() index: number;
  ngOnInit() {
  }

}
