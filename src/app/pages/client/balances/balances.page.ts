/* eslint-disable new-parens */
import { Component, OnInit } from '@angular/core';
import { Deposit } from 'src/app/models/deposit';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.page.html',
  styleUrls: ['./balances.page.scss'],
})
export class BalancesPage implements OnInit {

  voForm: Deposit = new Deposit;
  balance:String;
  email:String
  constructor(private router: Router,
    private authService: AuthService) { }

    ngOnInit() {
      this.getBalance()
    }
  
    getBalance(){
      this.email = localStorage.getItem('clientEmail');
      this.authService.getBalance(this.email)
      .subscribe(data => {
        console.log(data[0].balance)
        this.balance = data[0].balance
      })
    }

}
