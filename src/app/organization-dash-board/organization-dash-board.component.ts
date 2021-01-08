import { Component, OnInit } from '@angular/core';
import {Organization} from '../dto/organization';
import {AuthenticationService} from '../service/authentication.service';
import {OrganizationService} from '../service/organization.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-organization-dash-board',
  templateUrl: './organization-dash-board.component.html',
  styleUrls: ['./organization-dash-board.component.css']
})
export class OrganizationDashBoardComponent implements OnInit {
  organization: Organization = new Organization();
  id: number;

  constructor(private authenticationService: AuthenticationService,
              private organizationService: OrganizationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
    this.organizationService.getOrganizationByIdAndOrgUserName(this.id).subscribe(data => {
      this.organization = data;
      // console.log(this.id);
    });
  }

}
