import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/client/login/login.service';
import { UserService } from 'src/app/client/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formTitle: string;
  form: FormGroup;
  onSelectOption: boolean = false;
  fields = [
    { type: 'text', placeholder: 'Email', name: 'email' },
    { type: 'text', placeholder: 'Password', name: 'password' },
  ];
  payload: any = {
    name: '',
    email: '',
    password: '',
    password2: '',
  }
  errors: string = '';
  success: string = '';
  // ResetPassword
  token: '';


  constructor(
    public _loginService: LoginService,
    private _user: UserService,
    private router: Router,
    private _ar: ActivatedRoute
  ) { }

  ngOnInit() {
    this.onSelectOption = true;
    this.onChangeState('Sign-in');

    const x = this._ar.queryParams.subscribe(params => {
      this.token = params.token;
      if (params.token) {
        this.fields = [
          { type: 'text', placeholder: 'Password', name: 'password' },
          { type: 'text', placeholder: 'Password', name: 'password2' },
        ];
      }

    })
  }

  setNewPassword() {

    let token = this.token;
    if (this.payload.password !== this.payload.password2) {
      return this.errors = "Passwords don't match"
    }
    this.errors = "";

    const payload = {
      password: this.payload.password,
      email: jwt_decode(token).user,
      token,
    }

    this._loginService.setPassword(payload)
      .subscribe((resp: any) => {
        console.log(resp.success);
        if (resp.success) {
          this.success = 'You password has been restored'
        }

      },
        (err) => { err })

  }

  onChangeState(state) {
    this.formTitle = state.replace();

    switch (state) {
      case 'Sign-in':
        this.fields = [
          { type: 'text', placeholder: 'Email', name: 'email' },
          { type: 'text', placeholder: 'Password', name: 'password' },
        ];
        break;
      case 'Recover':
        this.fields = [
          { type: 'text', placeholder: 'Name', name: 'name' },
          { type: 'text', placeholder: 'Email', name: 'email' },
        ];
        break;
      case 'Create-an-account':
        this.fields = [
          { type: 'text', placeholder: 'Name', name: 'name' },
          { type: 'text', placeholder: 'Email', name: 'email' },
          { type: 'text', placeholder: 'Password', name: 'password' },
          { type: 'text', placeholder: 'Confirm Password', name: 'password2' }
        ];
        break;

      default:
        this.fields = [
          { type: 'text', placeholder: 'Email', name: 'email' },
          { type: 'text', placeholder: 'Password', name: 'password' },
        ];
        break;
    }

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onType(e) {
    this.payload = {
      ...this.payload,
      [e.target.name]: e.target.value
    }
  }

  willReset() {
    this.onChangeState(this.formTitle);
    this.payload = {};
  }

  onFormSumbit() {

    switch (this.formTitle) {
      case 'Sign-in':

        let user = {
          email: this.payload.email,
          password: this.payload.password,
        };

        this.willReset();
        this.onLoginUser(user)

        break;

      case 'Recover':

        let userEmail = {
          email: this.payload.email,
        }

        this.willReset();
        this.onResetPassword(userEmail)

        break;

      case 'Create-an-account':


        const info = {
          email: this.payload.email,
          name: this.payload.name,
          password: this.payload.password,
          password2: this.payload.password2
        }

        if (info.password !== info.password2 || !info.password || !info.password2) {
          console.warn('Pass not the same');
          return
        }

        this.willReset();
        this.onRegisterUser(info);

        break;

      default:
        break;
    }
  }

  onRedirect() {
    this.router.navigate(['/dashboard']);
  }

  onLoginUser(user) {
    this._loginService.loginUser(user)
      .subscribe((res: any) => {
        console.warn(res.token);
        this._user.setToken(res.token)
        this._user.setDecodedToken();
        this._user.setAvatar(this._user.userTokenData.avatar);
        this._loginService.loginModal.next('false')

        this.onRedirect();
      }),
      (err => console.log(err))
  }

  onRegisterUser(user) {
    this._loginService.registerUser(user)
      .subscribe
      ((res: any) => {
        console.warn(res);
      }),
      (err => {
        console.log(err)
      })
  }

  onResetPassword(user) {
    this._loginService.resetPassword(user)
      .subscribe((res: any) => {
        if (res.ok !== true) {
          this.errors = "Not a user yet";
        }
        console.warn('RESPONSE ', res);
        this._loginService.loginModal.next('false')
      }),
      (err: any) => {
        console.log('Sorry you are not a user yet', err)
      }
  }

  onSelectLogin() {
    this.onSelectOption = true;
  }


}
