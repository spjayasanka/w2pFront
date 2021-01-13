import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Organization} from '../dto/organization';
import {Invitation} from '../dto/invitation';
import {UserOrganization} from '../dto/user-organization';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient) { }

  getInvitationByMemberEmail(memberemail: string): Observable<Invitation[]> {
    return this.http.get<Invitation[]>('http://localhost:8080/getInvitationByMemberEmail/' + memberemail);
  }

  getInvitationByOrganizationId(organizationId: number): Observable<Invitation[]> {
    console.log('this orgId: ' + organizationId);
    return this.http.get<Invitation[]>('http://localhost:8080/getInvitationByOrganizationId/' + organizationId);
  }

  addInvitation(invitation: Invitation): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:8080/saveInvitation', invitation);
  }

  acceptInvitation(userOrganization: UserOrganization): Observable<boolean> {
    console.log(userOrganization.organizationId);
    return this.http.post<boolean>('http://localhost:8080/addMembersToOrganization/', userOrganization);
  }

  updateStatus(invitation: Invitation): Observable<boolean> {
    console.log(invitation.status);
    return this.http.put<boolean>('http://localhost:8080/updateStatus/', invitation);
  }
}
