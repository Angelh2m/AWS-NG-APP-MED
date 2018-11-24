import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  value = true;
  constructor(
    public router: Router,
    private _login: LoginService,
    public _userService: UserService) { }

  canActivate() {

    if (this._userService.isLogged()) {
      this._login.loginModal.next(this.value);
      return true;
    }
    this._login.loginModal.next(false);
    this.router.navigate(['/']);
    return false

  }

}
