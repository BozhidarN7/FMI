import { Injectable } from '@angular/core';
import { Organization } from '../interfaces/commonInterfaces';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  organizations: Organization[] = [];
  constructor() {}

  addOrganization(organization: Organization) {
    this.organizations.push(organization);
  }
  findOrganization(_id: string): Organization {
    return this.organizations.find((organization) => organization._id === _id)!;
  }
}
