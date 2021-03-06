import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './global/menu/menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification.component';
import { ProfileComponent } from './home/profile/profile.component';
import { MeetingsComponent } from './home/meetings/meetings.component';
import { RequestComponent } from './home/request/request.component';
import { SettingsComponent } from './home/settings/settings.component';
import { HelpComponent } from './home/help/help.component';
import { MeetingComponent } from './home/meetings/meeting/meeting.component';
import { ForgotPasswordComponent } from './auth/login/forgot-password/forgot-password.component';
import { ProfileDetailsComponent } from './home/profile/profile-details/profile-details.component';
import { MeetComponent } from './meet/meet.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptor } from './api.interceptor';
import { PrescriptionComponent } from './meet/prescription/prescription.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DisableRoomComponent } from './global/disable-room/disable-room.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    OtpVerificationComponent,
    ProfileComponent,
    MeetingsComponent,
    RequestComponent,
    SettingsComponent,
    HelpComponent,
    MeetingComponent,
    ForgotPasswordComponent,
    ProfileDetailsComponent,
    MeetComponent,
    PrescriptionComponent,
    DisableRoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
