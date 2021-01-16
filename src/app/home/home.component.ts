import { Component, OnInit } from '@angular/core';
import {User} from '../dto/User';
import {UserService} from '../service/User.service';
import {Router, Routes} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedUser: User = new User();

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private loginService: AuthenticationService) { }

  isValidFormSubmitted = false;
  validateEmail = true;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  registeredForm: FormGroup;
  submitted = false;

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  ngOnInit(): void {
    this.registeredForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    },
      {
        validator: this.MustMatch('password', 'confirmPassword')
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
        this.loginService.authenticate(this.selectedUser.username, this.selectedUser.password).subscribe(data => {
          this.router.navigate(['/userDashBoard/' + this.selectedUser.username]);
        });
      } else {
        alert('User add failed');
      }
    });

  }

//   this.loginService.authenticate(this.selectedUser.username, this.selectedUser.password).subscribe(logged => {
//   if (logged){
//     console.log('success');
//   } else {
//   console.log('failed');
// }
// });
// this.router.navigate(['/userDashBoard/' + this.selectedUser.username]);


}
