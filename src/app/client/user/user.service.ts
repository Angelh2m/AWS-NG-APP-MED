import { Injectable, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from "rxjs"
import { Router } from '@angular/router';
import { URL_ENDPOINTS } from 'src/app/config/config';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  userToken: string = '';
  userTokenData: any;

  private avatar = new BehaviorSubject<string>(null);
  avatarObsv = this.avatar.asObservable();

  public usersPayload: any = {
    email: '',
    info: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      email: '',
      city: '',
      state: '',
    }
  };

  constructor(private _http: HttpClient, private router: Router) { }

  OnInit() {
    console.log('USER SERVICE ACTIVATED!!!');
  }

  setToken(token) {
    localStorage.setItem('Token', JSON.stringify(token))
  }

  getToken() {
    return this.userToken = localStorage.getItem('Token') ? localStorage.getItem('Token') : null;
  }
  setDecodedToken() {
    this.userTokenData = jwt_decode(this.getToken());
  }

  isLogged() {
    const token = this.getToken() !== null ? jwt_decode(this.getToken()) : null;
    // console.log('token', token);

    if (token) {
      this.avatar.next(token.avatar);

      // // // EPOC UNIX TIME MILLISECONDS TO SECONDS 
      var tokenExpiry = new Date(token.exp * 1000);
      var currentTime = new Date();

      if (currentTime > tokenExpiry) {
        console.log('IT HAS EXPIRED');
        return false
      }

      return true
    }

    if (!token) {
      console.log('THERE IS NO TOKEN');
      return false
    }


    return this.userTokenData && this.userTokenData.length > 35 ? true : false;
  }

  getUserDataTest() {
    console.log(this.usersPayload);
  }

  fetchUserProfile() {
    this.userTokenData = jwt_decode(this.getToken());

    // IF THERE IS NO EMAIL USER DOES NOT EXIST
    if (this.usersPayload.email == '') {
      // console.warn('FETCH A USER FROM API THERE IS NO EMAIL');
      return this._http.get(`${URL_ENDPOINTS.AWS}/api/profile`).pipe(
        tap(el => {
          console.log(el);
          return el
        }),
        map((el: any) => {
          this.usersPayload = { ...el.user }
          // Broadcast the users avatar to header
          this.avatar.next(this.usersPayload.info.avatar);
          console.log(this.usersPayload);
          return el.user
        }),
        catchError((err) => {
          if (err)
            console.log('USERS TOKEN HAS EXPIRED');
          this.router.navigate(['/']);
          // @TODO REMOVE THE TOKEN TOO!
          throw err;
        })
      )
    } else {
      // console.warn('RETURN OBSERVABLE WITH USERS PAYLOAD', this.usersPayload);
      const simpleObservable = new Observable((observer) => {
        observer.next({ ...this.usersPayload })
        observer.complete()
      })

      return simpleObservable
    }
  }

  updateUserData(requestUserUpdate) {

    const body = new HttpParams()
      .set('updateUserData', JSON.stringify(requestUserUpdate))

    return this._http.put(`${URL_ENDPOINTS.AWS}/api/user`, body).pipe(
      map((el: any) => {
        this.usersPayload = {
          ...this.usersPayload,
          info: {
            ...el.user
          }
        }
        return el
      })
    )
  }

  askQuestion(question) {
    const body = new HttpParams()
      .set('subject', question.subject)
      .set('content', question.content)

    return this._http.post(`${URL_ENDPOINTS.AWS}/api/questions`, body).pipe(
      map((el: any) => {
        // if (el.user !== undefined) {
        //   this.usersPayload = { ...el.user }
        // }
        return el
      })
    )
  }

  commentQuestion(comment) {
    const body = new HttpParams()
      .set('id', comment.id)
      .set('comment', comment.comment)
    console.log(body);

    return this._http.put(`${URL_ENDPOINTS.AWS}/api/respond-question`, body)
      .pipe(
        map((el: any) => {
          return el
        })
      )
  }

  medicalHistory(payload) {
    const body = new HttpParams()
      .set('medical', JSON.stringify(payload))


    return this._http.post(`${URL_ENDPOINTS.AWS}/api/medical-exam`, body).pipe(
      map((el: any) => {
        // if (el.user !== undefined) {
        //   this.usersPayload = { ...el.user }
        // }
        return el
      })
    )
  }

  onUploadImage(userImages) {
    const uploadData = new FormData();
    uploadData.append('image', userImages, 'name');
    return this._http.post(`api/photos/upload`, uploadData)
  }


  makePayment(token, payload) {
    const body = new HttpParams()
      .set('stripeToken', token)
      .set('membership', JSON.stringify(payload))
    return this._http.post(`${URL_ENDPOINTS.AWS}/api/payments`, body)
  }

  onLogout() {
    this.router.navigate(['/']);
    localStorage.removeItem('Token');
    this.userToken = '';
    this.userTokenData = null;
    this.avatar.next(null);
    // this.usersPayload.info = {};
  }

  setAvatar(img) {
    this.avatar.next(img);
  }

}
