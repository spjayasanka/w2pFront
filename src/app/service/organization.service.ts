import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Organization} from '../dto/organization';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  findOrganizationByUsername(): Observable<Organization[]> {
    return this.http.get<Organization[]>('http://localhost:8080/findOrganizationByUsername');
  }

  addOrganization(organization: Organization): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:8080/addOrganization', organization);
  }

  getOrganizationByIdAndOrgUserName(id: number): Observable<any> {
    console.log(id);
    return this.http.get<Organization>('http://localhost:8080/getOrganizationByIdAndOrgUserName/' + id);

  }

}
