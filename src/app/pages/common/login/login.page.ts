/* eslint-disable new-parens */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logForm: User = new User;
  errors = [];

  constructor(private router: Router,
              public loadingController: LoadingController,
              private authService: AuthService) { }

  ngOnInit() {
    this.login();
  }

  login() {

    this.authService.login(this.logForm).subscribe(data => {
      localStorage.setItem('clientId', data[0].id.toString())
      localStorage.setItem('clientEmail', data[0].email.toString())
      localStorage.setItem('clientName', (data[0].firstname +' '+data[0].lastname).toString())
      this.router.navigate(['/udash'])


    }, error =>{
      console.log(error)
    })
    /*this.authService.login().subscribe(data => {
      console.log(data);
      this.logForm = data;
      console.log(data)
    });*/

  }

}
