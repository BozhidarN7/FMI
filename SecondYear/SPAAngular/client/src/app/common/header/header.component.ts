import { Component, OnInit } from '@angular/core';
import { Organization, User } from 'src/app/interfaces/commonInterfaces';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: Organization | User | undefined = undefined;

  constructor(
    private userService: UserService,
    private organizatoinService: OrganizationService
  ) {}

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('user')!);
    if (userInfo.role === 'organization') {
      this.user = this.organizatoinService.findOrganization(userInfo._id);
    } else {
      this.user = this.userService.findUser(userInfo._id);
    }
    console.log(this.user);
  }
}
