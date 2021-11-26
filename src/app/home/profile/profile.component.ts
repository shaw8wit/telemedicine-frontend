import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Appointment } from 'src/app/Model/appointment.model';

enum ListingType {
  Day,
  Week,
  Month,
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  loading = true;
  isDoctor: boolean;
  listingType: ListingType;
  private userListener: Subscription;
  appointments: Appointment[] = [
    new Appointment(
      '123',
      'Shouvit Pradhan',
      'https://png.pngitem.com/pimgs/s/80-800373_it-benefits-per-users-default-profile-picture-green.png',
      '10:00',
      '10:30',
      true
    ),
    new Appointment(
      '123',
      'Shouvit Pradhan',
      'https://cdn.imgbin.com/15/10/13/imgbin-computer-icons-user-profile-avatar-profile-LJbrar10nYY8mYWt0CUXZ8CxE.jpg',
      '10:00',
      '10:30',
      true
    ),
    new Appointment(
      '123',
      'Shouvit Pradhan',
      'https://png.pngitem.com/pimgs/s/80-800373_it-benefits-per-users-default-profile-picture-green.png',
      '10:00',
      '10:30',
      true
    ),
    new Appointment(
      '123',
      'Shouvit Pradhan',
      'https://cdn.imgbin.com/15/10/13/imgbin-computer-icons-user-profile-avatar-profile-LJbrar10nYY8mYWt0CUXZ8CxE.jpg',
      '10:00',
      '10:30',
      false
    ),
    new Appointment(
      '123',
      'Shouvit Pradhan',
      'https://png.pngitem.com/pimgs/s/80-800373_it-benefits-per-users-default-profile-picture-green.png',
      '10:00',
      '10:30',
      true
    ),
    new Appointment(
      '123',
      'Shouvit Pradhan',
      'https://cdn.imgbin.com/15/10/13/imgbin-computer-icons-user-profile-avatar-profile-LJbrar10nYY8mYWt0CUXZ8CxE.jpg',
      '10:00',
      '10:30',
      true
    ),
    new Appointment(
      '123',
      'Shouvit Pradhan',
      'https://png.pngitem.com/pimgs/s/80-800373_it-benefits-per-users-default-profile-picture-green.png',
      '10:00',
      '10:30',
      false
    ),
  ];

  public get ListingType(): typeof ListingType {
    return ListingType;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setListingType(ListingType.Day);
    if (this.authService.getIsUserFetched()) this.setStatus();
    this.userListener = this.authService
      .getAuthStatusListener()
      .subscribe((userFetched) => userFetched && this.setStatus());
  }

  setListingType(listingType: ListingType) {
    this.listingType = listingType;
  }
  setStatus() {
    this.loading = false;
    this.isDoctor = this.authService.getIsDoctor();
    this.user = this.authService.getUser();
    console.log(this.user);
  }

  ngOnDestroy(): void {
    this.userListener.unsubscribe();
  }
}
