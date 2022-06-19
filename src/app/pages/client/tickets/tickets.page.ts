import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.displayTicket()
  }

  Route:any
  Tickets: any

  displayTicket(){
    var id = localStorage.getItem('clientId')
    this.authService.getRoutes(id)
    .subscribe(data => {console.log(data)})
  }

}
