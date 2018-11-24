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
  surgeries = ["Addiction Medicine", "Adolescent Medicine", "Adult Psychiatry", "Aerospace Medicine", "Allergy / Immunology", "Allergy Medicine", "Anesthesiology", "Bariatric Surgery", "Behavioral Medicine", "Breast Surgery", "Cardiac Electrophysiology", "Cardiac Surgery", "Cardiology", "Cardiothoracic Surgery", "Child Psychiatry", "Colorectal Surgery", "Cosmetic Surgery", "Critical Care Medicine", "Critical Care Pediatrics", "Dermatology", "Dermatopathology", "Diabetology", "Diagnostic Radiology", "Emergency Medicine", "Endocrinology", "ENT / Otolaryngology", "Epileptology", "Family Medicine", "Foot & Ankle Orthopedics", "Functional Medicine", "Gastroenterology", "General Practice", "General Surgery", "Geriatrics", "Gynecologic Oncology", "Gynecology", "Hand Surgery", "Head & Neck Surgery", "Hematology", "Hematology / Oncology", "Hepatology", "Holistic Medicine", "Immunology", "Infectious Disease Medicine", "Internal Medicine", "Internal Medicine / Pediatrics", "Interventional Cardiology", "Interventional Pain Management", "Medical Genetics", "Neonatology", "Nephrology", "Neurology", "Neuroradiology", "Neurosurgery", "Nuclear Cardiology", "Nuclear Medicine", "OBGYN / Obstetrics & Gynecology", "Obstetrics", "Occupational Medicine", "Oncology", "Ophthalmology", "Orthopedic Spine Surgery", "Orthopedic Surgery", "Osteopathic Medicine", "Pain Management", "Palliative Care", "Pathology", "Pediatric Cardiology", "Pediatric Endocrinology", "Pediatric Gastroenterology", "Pediatric Hematology / Oncology", "Pediatric Neurology", "Pediatric Pulmonology", "Pediatric Radiology", "Pediatric Surgery", "Pediatrics", "Physical Medicine & Rehabilitation", "Plastic Surgery", "Preventive Medicine", "Psychiatry", "Pulmonary Critical Care", "Pulmonology", "Radiation Oncology", "Radiology", "Reconstructive Orthopedic Surgery", "Reproductive Endocrinology", "Rheumatology", "Sleep Medicine", "Sports Medicine", "Surgical Oncology", "Thoracic Surgery", "Transplant Surgery", "Trauma Surgery", "Urgent Care", "Urogynecology", "Urology", "Vascular & Interventional Radiology", "Vascular Surgery"];
  surgeries2 = [
    'Arthroplasty', 'Shoulder arthroscopy ',
    'Lumbar spinal fusion', 'Low back intervertebral disc surgery',
    'Reconstructive surgery',
  ]

  @ViewChild("usa", { read: ElementRef }) usa: ElementRef;
  @ViewChild("mexico", { read: ElementRef }) mexico: ElementRef;

  selection = 0;

  constructor(
    private title: Title,
    private meta: Meta,
  ) { }
  ngOnInit() {
    this.title.setTitle('Surgery Care');
    this.meta.updateTag({
      'description': 'Best surgeries'
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



  switchIt(num) {
    this.selection = num
  }


}
