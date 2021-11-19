import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppSettings } from '../app-settings';
import { Register } from './register/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  private userId: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate || !userId) {
      return;
    }
    return {
      token: token,
      userId: userId,
      expirationDate: new Date(expirationDate),
    };
  }

  private setAuthTimer(token: string, expiresInDuration, userId: string) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresInDuration * 1000);
    this.token = token;
    this.userId = userId;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.setAuthTimer(
        authInformation.token,
        expiresIn / 1000,
        authInformation.userId
      );
    }
  }

  private saveToken(data) {
    const expiresInDuration = 3600;
    this.setAuthTimer(data.token, expiresInDuration, data.user._id);
    const expirationDate = new Date(
      new Date().getTime() + expiresInDuration * 1000
    );
    this.saveAuthData(this.token, expirationDate, this.userId);
    this.router.navigate(['/home']);
  }

  createUser(userData: Register) {
    this.http
      .post<{ data: any; message: string; success: boolean }>(
        AppSettings.API_ENDPOINT + '/users/register',
        { ...userData }
      )
      .subscribe(
        (response) => response.success && this.saveToken(response.data)
      );
  }

  login(email: string, password: string) {
    this.http
      .post<{ data: any; message: string; success: boolean }>(
        AppSettings.API_ENDPOINT + '/users/login',
        {
          email: email,
          password: password,
        }
      )
      .subscribe(
        (response) => response.success && this.saveToken(response.data)
      );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
  }
}
