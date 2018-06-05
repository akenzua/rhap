import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { User } from './../user.interface';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  user: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
     this.userService.getUser()
       .subscribe(
          (user: User[] )=>this.user = user,
         (error: Response) => console.log(error)
      );
  }


  

}
