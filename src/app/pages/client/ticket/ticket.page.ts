/* eslint-disable new-parens */
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../models/ticket';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  ticForm: Ticket = new Ticket;
  balance:String;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.getBalance()
  }

  getBalance(){
    var email = localStorage.getItem('clientEmail');
    this.authService.getBalance(email)
    .subscribe(data => {
      console.log(data[0].balance)
      this.balance = data[0].balance
    })
  }

  
  buy_ticket(){
    var tripCost = 0;
    if(this.ticForm.tripType === "single"){
      tripCost = 30.00
    }
    else if(this.ticForm.tripType === "return"){
      tripCost = 55.00
    }
    else{
      tripCost = 275.00
    }

    const route ={
      origin_destination: this.ticForm.trip,
      cost: (tripCost*this.ticForm.quantity),
      clientId: localStorage.getItem('clientId')
    }
    this.authService.create_route(route)
    .subscribe(data => {
      console.log(data)
    })

    const ticket = {
      pass_type: this.ticForm.passType,
      trip_type: this.ticForm.tripType,
      quantity: this.ticForm.quantity,
      cost: (tripCost*this.ticForm.quantity),
      email: localStorage.getItem('clientEmail'),
      routeId: 17
    }

    this.authService.create_ticket(ticket)
    .subscribe(data => {
      console.log(data)
      this.router.navigate(['/tickets'])
    })
    

  }

}
