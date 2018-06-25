import { User } from './../../../models/user';
import { AuthServiceService } from './../../../service/auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {


  user = new User();

  constructor(
    private authService : AuthServiceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if(profile){
        this.user = profile.user;
        console.log(this.user);
        //this.role = profile.user.role;
       //  console.log(profile.user.role);
      }else{
        return;
      }
    });
  }

}
