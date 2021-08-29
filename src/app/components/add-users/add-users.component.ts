import { Component, OnInit } from '@angular/core';
import { Fsc } from 'src/app/models/fsc.model';
import { FscService } from 'src/app/services/fsc.service';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  user: Fsc = {
    name:'',
    email:''
  }
  submitted = false;

  constructor(private FscService: FscService) { }

  ngOnInit(): void {
  }

  saveUser(): void{
    const data = {
      name: this.user.name,
      email: this.user.email
    }

    this.FscService.create(data).subscribe(response => {
      console.log(response);
      this.submitted = true;
    }, error => {
      console.log(error);
    });
  }

}
