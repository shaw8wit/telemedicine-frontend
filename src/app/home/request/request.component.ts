import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  isLoading = true;
  doctors = [];
  requests = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getRequestedAppointments().subscribe((response) => {
      if (response !== null) this.requests = response['data']['list'];
      this.isLoading = false;
    });
    this.homeService.getDoctors().subscribe((response) => {
      this.doctors = response['data']['doctors'];
      this.isLoading = false;
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid || form.value.startTime >= form.value.endTime) {
      alert(
        'All fields must be filled!\nStart Time should come before the End Time'
      );
      return;
    }
    this.homeService
      .requestAppointment(
        form.value.selected.map((doc) => doc._id),
        form.value.startTime,
        form.value.endTime
      )
      .subscribe((_) => form.resetForm());
  }

  acceptAppointment(index: number) {
    this.homeService
      .acceptAppointment(this.requests[index]._id)
      .subscribe((response) => {
        // add notification here
      });
    this.requests.splice(index, 1);
  }

  getToday() {
    let date = new Date().toISOString();
    return date.substring(0, date.lastIndexOf(':'));
  }
}
