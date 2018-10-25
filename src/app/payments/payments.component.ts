import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {


  constructor(

    private router: Router,
    private title: Title,
    private meta: Meta
  ) {

    const metaTag: MetaDefinition = {
      name: 'description of the checkout',
      content: 'My checkout',
    }

    this.meta.updateTag(metaTag);

    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild == null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe(event => {
        console.log(event);
        this.title.setTitle(event.name);
      })

  }

  ngOnInit() {

  }

}
