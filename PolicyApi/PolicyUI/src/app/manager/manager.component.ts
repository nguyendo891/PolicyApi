import { Component, OnInit } from '@angular/core';
import { ManagerService } from './manager.service';
import { Account } from "./account.model";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  accounts: Account[];
  constructor(private manangerService: ManagerService) { }

  ngOnInit() {
    this.manangerService.getAllData().subscribe(
      data => {
        this.accounts =data;
      }
    );
  }

}
