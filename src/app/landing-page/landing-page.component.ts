import { Component, OnInit } from '@angular/core';
import { Faq } from '../utils/interfaces/faq';
import { FaqData } from '../utils/data/data.faq';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {

  x: number = 0;
  surgeries = [
    'Low back pain surgery', 'Gastric bypass',
    'Knee replacements ', 'hip replacement ', ' joint replacement',
    'femoral shaft fracture',
  ]
  surgeries2 = [
    'Arthroplasty', 'Shoulder arthroscopy ',
    'Lumbar spinal fusion', 'Low back intervertebral disc surgery',
    'Reconstructive surgery',
  ]


  constructor(
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    this.title.setTitle('About / Angular SSR');
    this.meta.updateTag({
      'description': 'Welcome to about section'
    });
  }

  /* *
  *  Toggle FAQ
  */
  onToggle(event) {
    let isActive = event.path[1].className.split(' ').indexOf('faq--is-active') > 0;
    isActive == false ? event.path[1].classList.add("faq--is-active") : null;
    isActive == true ? event.path[1].classList.remove("faq--is-active") : null;
  }

  questions: Faq[] = FaqData;

}
