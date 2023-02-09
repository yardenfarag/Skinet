import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl
  private loggedinUserSource = new ReplaySubject<User | null>(1)
  loggedinUser$ = this.loggedinUserSource.asObservable()

  constructor(private http: HttpClient, private router: Router) { }

  getLoggedinUser(token: string | null) {
    if (token === null) {
      this.loggedinUserSource.next(null)
      return of(null)
    }
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(this.baseUrl + 'account', { headers }).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('token', user.token)
          this.loggedinUserSource.next(user)
          return user
        } else {
          return null
        }
      })
    )
  }

  login(values: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token)
        this.loggedinUserSource.next(user)
      })
    )
  }

  register(values: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token)
        this.loggedinUserSource.next(user)
      })
    )
  }

  logout() {
    localStorage.removeItem('token')
    this.loggedinUserSource.next(null)
    this.router.navigateByUrl('/')
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(this.baseUrl + '/account/emailexists?email=' + email)
  }

  getUserAddress() {
    return this.http.get<Address>(this.baseUrl + 'account/address')
  }

  updateUserAddress(address: Address) {
    return this.http.put(this.baseUrl + '/account/address', address)
  }
}
