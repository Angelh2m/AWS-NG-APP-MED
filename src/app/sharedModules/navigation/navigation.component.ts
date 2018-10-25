import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
// import { UserService } from '../../services/user/user.service';

// import { LoginService } from '../../services/login/login.service';
import { PaymentsService } from '../../client/payments/payments.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  @Input() theme: string;
  @Input() dashboard: string;
  @ViewChild("burger", { read: ElementRef }) burger: ElementRef;

  isActive: any = false;
  showModal: boolean = false;
  usersAvatar: string;

  constructor(
    private el: ElementRef,
    // public _userService: UserService,
    // private _payments: PaymentsService,
    // private _login: LoginService
  ) { }

  ngOnInit() {

    // this._userService.isLogged();
    // this._userService.avatarObsv
    //   .subscribe(avatar => {
    //     this.usersAvatar = avatar
    //   });
    // this._login.loginModalSwitch
    //   .subscribe((resp) => {
    //     this.isActive = false;
    //     this.showModal = false;
    //     this.burger.nativeElement.checked = false
    //   })

  }

  // toggle() {
  //   this.isActive = !this.isActive;
  // }

  // loginModal() {
  //   this.showModal = !this.showModal;
  //   this.burger.nativeElement.checked = false
  //   this.isActive = !this.isActive;
  // }
  // closeModal() {
  //   this.showModal = !this.showModal;
  //   this._login.loginModal.next(this.showModal);
  //   this.burger.nativeElement.checked = false
  // }

}
