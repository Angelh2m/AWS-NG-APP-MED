import { Component, OnInit } from '@angular/core';
import { UserService } from '../../client/user/user.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
})
export class AppointmentsComponent implements OnInit {
  appointmets;
  constructor(
    private _user: UserService
  ) { }

  ngOnInit() {

    this.appointmets = this._user.usersPayload.appointments;
    if (!this.appointmets) {

      this._user.fetchUserProfile()
        .subscribe(
          (res) => {
            this.appointmets = res.appointments
          },
          (err) => {
            // @TODO UNCOMMENT NAVIGATE
            // err.error ? this.router.navigate(['/']) : ''
          })
    }

  }

}
