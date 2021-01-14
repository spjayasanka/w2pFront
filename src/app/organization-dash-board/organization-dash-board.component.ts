import {Component, Inject, OnInit} from '@angular/core';
import {Organization} from '../dto/organization';
import {AuthenticationService} from '../service/authentication.service';
import {OrganizationService} from '../service/organization.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Invitation} from '../dto/invitation';
import {InvitationService} from '../service/invitation.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-organization-dash-board',
  templateUrl: './organization-dash-board.component.html',
  styleUrls: ['./organization-dash-board.component.css']
})
export class OrganizationDashBoardComponent implements OnInit {
  organization: Organization = new Organization();
  id: number;
  registeredForm: FormGroup;
  invitation: Invitation = new Invitation();
  submitted = false;
  invitations: Invitation[] = [];

  constructor(private authenticationService: AuthenticationService,
              private organizationService: OrganizationService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private invitationService: InvitationService,
              @Inject(DOCUMENT) private Doc: Document) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
    this.organizationService.getOrganizationByIdAndOrgUserName(this.id).subscribe(data => {
      this.organization = data;
      // console.log(this.id);
    });

    this.invitationService.getInvitationByOrganizationId(this.id).subscribe(invitations => {
      this.invitations = invitations;
    });

    console.log('ts file ID: ' + this.id);

    this.registeredForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  get f() {
    return this.registeredForm.controls;
  }

  sendInvitation(){
    this.invitation.organizationId = this.organization.id;
    this.invitation.status = 'pending';

    this.invitationService.addInvitation(this.invitation).subscribe(isOk => {
      if (isOk){
        alert('Invite sent successfully');
      } else {
        alert('failed to send invitation');
      }
    });

    console.log(this.invitation.memberEmail);

    console.log(this.invitation.organizationId);
    this.Doc.defaultView.location.reload();

  }

  deleteInvitation(delInvite: Invitation){
    this.invitationService.deleteInvitation(delInvite).subscribe(isOk => {
      if (isOk){
        console.log('failed');
      } else {
        console.log('done');
      }
    });
    this.Doc.defaultView.location.reload();
  }

}
