import {Component, Inject, OnInit} from '@angular/core';
import {Organization} from '../dto/organization';
import {OrganizationService} from '../service/organization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {AuthenticationService} from '../service/authentication.service';
import {Invitation} from '../dto/invitation';
import {InvitationService} from '../service/invitation.service';
import {UserOrganization} from '../dto/user-organization';
import {User} from '../dto/User';
import {UserService} from '../service/User.service';

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
  userOrganization: UserOrganization = new UserOrganization();

  user: User = new User();


  invitations: Invitation[] = [];

  constructor(private organizationService: OrganizationService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              @Inject(DOCUMENT) private Doc: Document,
              private auth: AuthenticationService,
              private router: Router,
              private invitationService: InvitationService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.organizationService.findOrganizationByUsername().subscribe(organization => {
      this.organizations = organization;
    });

    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
    });

    this.invitationService.getInvitationByMemberEmail(this.username).subscribe(invitation => {
      this.invitations = invitation;
    });

    this.userService.getUserByUsername(this.username).subscribe( user => {
      this.user = user;
    });

    // console.log(this.user.firstname);



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
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }

  openOrganization(organization: Organization){
    this.router.navigate(['/organizationDashBoard/' + organization.id]);
    console.log(organization.id);
  }

  joinToOrganization(invitation: Invitation) {

    this.userOrganization.username = this.username;
    this.userOrganization.organizationId = invitation.organizationId;
    invitation.status = 'accepted';


    this.invitationService.updateStatus(invitation).subscribe(isOk => {
      if (isOk){
        console.log('done');
      } else {
        console.log('failed');
      }
    });

    this.invitationService.acceptInvitation(this.userOrganization).subscribe(isOk => {
      if (isOk){
        alert('added successfully');
      }else{
        alert('failed to add');
      }
    });

    // console.log(this.userOrganization.OrganizationId);
    // console.log(this.username);
    // console.log(invitation.id);
  }

  rejectInvitation(invitation: Invitation){
    invitation.status = 'rejected';

    this.invitationService.updateStatus(invitation).subscribe(isOk => {
      if (isOk){
        console.log('done');
      } else {
        console.log('failed');
      }
    });
  }

  deleteOrganization(organization: Organization) {
    this.organizationService.deleteOrganization(organization.id).subscribe(isOk => {
      if (isOk){
        alert('failed to delete');
      } else {
        alert('deleted successfully');
      }
    });
  }

}
