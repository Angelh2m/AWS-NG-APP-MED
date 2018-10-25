import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/client/user/user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {


  percentage: Number = 0;
  isEdit = false;
  form: FormGroup;
  usersPayload = this._userService.usersPayload;

  constructor(private _userService: UserService) { }

  toggleEdit() { this.isEdit = !this.isEdit; }

  ngOnInit() {
    this.onComponentLoad();
  }

  onComponentLoad() {
    // FETCH FOR THE USER and GET THE DATA
    this._userService.fetchUserProfile()
      .subscribe((res: any) => {
        if (res.info) {
          this.usersPayload = { ...res }
        }
        this.progress();
      });
  }

  setFormValues(e) {
    this.usersPayload = {
      ...this.usersPayload,
      info: {
        ...this.usersPayload.info,
        [e.target.name]: e.target.value
      }
    }
  }

  test() {
    this._userService.getUserDataTest();
  }

  progress() {
    let filled = 0;
    let requiredFields = 0;

    Object.keys(this.usersPayload.info).map((el, i) => {
      requiredFields += 1;
      if (this.usersPayload.info[el] && this.usersPayload.info[el].length >= 1) {
        filled += 1;
      }
    })

    this.percentage = Math.floor((filled / requiredFields) * 100);

  }

  onLogout() {
    this._userService.onLogout();
  }

  onSaveData() {
    // Close Edit Field
    this.isEdit = !this.isEdit
    this._userService.updateUserData(this.usersPayload.info)
      .subscribe(
        (res: any) => {
          this.usersPayload = {
            ...this.usersPayload,
            info: {
              ...res.user
            }
          }
          console.warn("SAVETHISDATA BACKEDN", this.usersPayload);

          this.progress();
        }, (err) => console.log(err)
      );

  }

}
