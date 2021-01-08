import { Component, OnInit } from '@angular/core';
import {User} from '../dto/User';
import {UserService} from '../service/User.service';
import {Router, Routes} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedUser: User = new User();

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  isValidFormSubmitted = false;
  validateEmail = true;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  registeredForm: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.registeredForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }
  get f() {
    return this.registeredForm.controls;
  }

  addUser() {

    this.submitted = true;
    if (this.registeredForm.invalid) {
      return;
    }

    this.submitted = true;
    this.userService.addUser(this.selectedUser).subscribe(isOk => {
      if (isOk){
        alert('User added Successfully');
        this.router.navigate(['/login']);
      } else {
        alert('User add failed');
      }
    });

  }

}
