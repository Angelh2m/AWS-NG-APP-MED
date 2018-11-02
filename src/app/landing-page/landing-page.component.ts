import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild("usa", { read: ElementRef }) usa: ElementRef;
  @ViewChild("mexico", { read: ElementRef }) mexico: ElementRef;

  USA = {
    hospital: 73,
    surgery: 50,
    total: 40
  }
  MEXICO = {
    hospital: 72,
    surgery: 70,
    total: 80
  }

  LIMIT = {
    hospital: 80.8010025024414,
    surgery: 80.0,
    total: 80
  }
  procedures = [
    {
      type: 'Knee prostetic',
      hospital: 30,
      surgery: 20,
      total: 60
    },
    {
      type: 'Column prostetic',
      hospital: 20,
      surgery: 30,
      total: 10
    }
  ]
  counter = 0;

  // public usa = '110,84 23,84 23,84 40,52 76.801,43 110,13 ';
  constructor(
    private title: Title,
    private meta: Meta,
  ) { }
  ngOnInit() {

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

  animateChart() {
    console.warn(this.usa.nativeElement.points);
    console.warn("LOGG!!! ", this.usa);

    this.usa.nativeElement.points[3].y = this.procedures[this.counter].hospital
    this.usa.nativeElement.points[4].y = this.procedures[this.counter].surgery;
    this.usa.nativeElement.points[5].y = this.procedures[this.counter].total;

    this.MEXICO.hospital = this.usa.nativeElement.points[3].y;
    this.MEXICO.surgery = this.usa.nativeElement.points[4].y;
    this.MEXICO.total = this.usa.nativeElement.points[5].y;
    this.counter += 1;
    // START FROM USA
    this.mexico.nativeElement.points[3].y = this.usa.nativeElement.points[3].y;
    this.mexico.nativeElement.points[4].y = this.usa.nativeElement.points[4].y;
    this.mexico.nativeElement.points[5].y = this.usa.nativeElement.points[5].y;

    const animate1 = setInterval(() => {
      this.mexico.nativeElement.points[3].y = this.MEXICO.hospital;
      this.mexico.nativeElement.points[4].y = this.MEXICO.surgery;
      this.mexico.nativeElement.points[5].y = this.MEXICO.total;
      this.MEXICO.hospital += .05;
      this.MEXICO.surgery += .05;
      this.MEXICO.total += .05;

      if (this.MEXICO.surgery >= this.LIMIT.surgery) {
        this.MEXICO.surgery = this.LIMIT.surgery;
      }
      if (this.MEXICO.hospital >= this.LIMIT.hospital) {
        this.MEXICO.hospital = this.LIMIT.hospital;
      }
      if (this.MEXICO.total >= this.LIMIT.total) {
        this.MEXICO.total = this.LIMIT.total;
      }
      if (this.MEXICO.hospital >= this.LIMIT.hospital
        && this.MEXICO.surgery >= this.LIMIT.surgery
        && this.MEXICO.total >= this.LIMIT.total
      ) {
        clearInterval(animate1);
      }
    }, 0)

    this.title.setTitle('About / Angular SSR');
    this.meta.updateTag({
      'description': 'Welcome to about section'
    });
    // setTimeout(() => {
    //   this.USA.hospital = 30
    //   this.USA.surgery = 40
    //   this.USA.total = 40
    // }, 3000);
  }



}
