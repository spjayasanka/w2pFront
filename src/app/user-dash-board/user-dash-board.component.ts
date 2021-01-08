import {Component, Inject, OnInit} from '@angular/core';
import {Organization} from '../dto/organization';
import {OrganizationService} from '../service/organization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css']
})
export class UserDashBoardComponent implements OnInit {

  organizations: Organization[] = [];
  username: string;
  showed = false;
  registerForm: FormGroup;
  submitted = false;
  organization: Organization = new Organization();

  constructor(private organizationService: OrganizationService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              @Inject(DOCUMENT) private Doc: Document,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.organizationService.findOrganizationByUsername().subscribe(organization => {
      this.organizations = organization;
    });

    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  showForm(){
    this.showed = true;
  }

  addOrganization(): void {

    // console.log(this.organization.name);

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.submitted = true;
    this.organizationService.addOrganization(this.organization).subscribe(isOk => {
      if (isOk){
        alert('organization added successfully');
      } else {
        alert('failed to add organization');
      }
    });
    this.Doc.defaultView.location.reload();
  }

  remove(){
    this.auth.logOut();
    this.router.navigate(['/home']);
    sessionStorage.clear();
  }

  openOrganization(organization: Organization){
    this.router.navigate(['/organizationDashBoard/' + organization.id]);
    console.log(organization.id);
  }
}
