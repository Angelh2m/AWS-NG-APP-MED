import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/client/user/user.service';

@Component({
  selector: 'app-medical-background',
  templateUrl: './medical-background.component.html',
})
export class MedicalBackgroundComponent implements OnInit {

  public medicalQuestions = {
    info: [
      { id: "1", question: "firstName", answer: '' },
      { id: "2", question: "lastName", answer: '' },
      { id: "3", question: "Gender", answer: '' },
      { id: "4", question: "Age", answer: '' },
      { id: "5", question: "Weight", answer: '' },
      { id: "6", question: "Height", answer: '' },
      { id: "7", question: "Country", answer: '' },
      { id: "8", question: "Phone Number", answer: '' },
      { id: "9", question: "Address", answer: '' },
      { id: "10", question: "City", answer: '' },
      { id: "11", question: "State", answer: '' },
      { id: "12", question: "Zip", answer: '' },
    ],
    general: [
      { id: "0", question: " Are you under physician's care now?", answer: '' },
      { id: "1", question: " Have you been hospitalized or had major operation?", answer: '' },
      { id: "2", question: " Are you taking any medication, pills or drugs?", answer: '' },
      { id: "3", question: " Are you on special diet?", answer: '' },
      { id: "4", question: "Do you use tobacco?", answer: '' },
    ],
    allergies: [
      { id: '5', allergy: "Aspirin?", answer: '' },
      { id: '6', allergy: "Penicillin?", answer: '' },
      { id: '7', allergy: "Codeine?", answer: '' },
      { id: '8', allergy: "Local Anesthetics?", answer: '' },
      { id: '9', allergy: "Metal", answer: '' },
      { id: '10', allergy: "Latex", answer: '' },
    ],
    health: [
      { id: '11', medicHistory: "AIDS/HIV positive", answer: '' },
      { id: '12', medicHistory: "Alzheimer's disease", answer: '' },
      { id: '13', medicHistory: "Anemia", answer: '' },
      { id: '14', medicHistory: "Cancer", answer: '' },
      { id: '15', medicHistory: "Diabetes", answer: '' },
      { id: '16', medicHistory: "Drug addiction", answer: '' },
      { id: '17', medicHistory: "Epilepsy or Seizures", answer: '' },
      { id: '18', medicHistory: "Excesice thirst", answer: '' },
      { id: '19', medicHistory: "Glucoma", answer: '' },
      { id: '20', medicHistory: "Hemophillia", answer: '' },
      { id: '21', medicHistory: "Hepatitis A", answer: '' },
      { id: '22', medicHistory: "Hepatitis B or C", answer: '' },
      { id: '23', medicHistory: "Herpes", answer: '' },
      { id: '24', medicHistory: "Kidney problems", answer: '' },
      { id: '25', medicHistory: "Leukemia", answer: '' },
      { id: '26', medicHistory: "Liver disease", answer: '' },
      { id: '27', medicHistory: "Low Blood Preassure", answer: '' },
      { id: '28', medicHistory: "Lung disease", answer: '' },
      { id: '29', medicHistory: "Osteoporosis", answer: '' },
      { id: '30', medicHistory: "Renal Dialysis", answer: '' },
      { id: '31', medicHistory: "Shingles", answer: '' },
      { id: '32', medicHistory: "Sinus trouble", answer: '' },
      { id: '33', medicHistory: "Thyroid Disease", answer: '' },
      { id: '34', medicHistory: "Ulcers", answer: '' },
      { id: '35', medicHistory: "Tonsillitis", answer: '' },
    ]
  }

  errors: any = []
  messages = '';

  @ViewChildren('form') viewChildren;
  form: FormGroup;
  constructor(
    private _userService: UserService
  ) { }

  validate(event, type) {
    var onlyLetters = new RegExp('[a-z A-Z]');
    var onlyDigits = new RegExp('[0-9]');

    if (type === 'text' && onlyLetters.test(event.key)) {
      return
    }
    if (type === 'number' && onlyDigits.test(event.key)) {
      return
    }
    event.preventDefault();
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: Validators.pattern('^[a-zA-Z]+$'), updateOn: 'change'
      }),
      lastName: new FormControl(null, Validators.required),
      Gender: new FormControl(null, Validators.required),
      Age: new FormControl(null, Validators.required),
      Height: new FormControl(null, Validators.required),
      Weight: new FormControl(null, Validators.required),
      Phone: new FormControl(null, Validators.required),
      Address: new FormControl(null, Validators.required),
      Country: new FormControl(null, Validators.required),
      City: new FormControl(null, Validators.required),
      State: new FormControl(null, Validators.required),
      Zip: new FormControl(null, Validators.required),
    })
  }

  phoneNumber: any = [];

  formatNumber(e: any) {

    this.phoneNumber = [...e.target.value];

    if (this.phoneNumber.length >= 15) {
      return e.preventDefault();
    }

    this.phoneNumber.split().forEach((el, i) => {

      if (el.toString().length === 0) {
        e.target.value += "(";
      }
      if (el.toString().length === 4) {
        e.target.value += ")\ ";
      }
      if (el.toString().length === 10) {
        e.target.value += "-";
      }

    });
  }


  onSelection(e, section, id) {

    const QUESTION_ID = id;
    const SECTION = section;
    const CHECKBOX_VALUE = e.target.id.split('-')[0];
    const INPUT_VALUE = e.target.value;

    if (SECTION === 'info') {
      console.log(e);
      const QUESTION_NAME = e.target.name;

      let INDEX: any = this.medicalQuestions.info.findIndex((el: any, i: any) => {
        return (el.question == QUESTION_NAME ? i + 1 : null);
      });

      const errors = this.errors;

      switch (QUESTION_NAME) {
        case 'firstName':
          INPUT_VALUE.length <= 2 ? (errors.firstName = 'Name is required') : errors.firstName = '';
          break;
        case 'lastName':
          INPUT_VALUE.length <= 2 ? (errors.lastName = 'Last name is required') : errors.lastName = null;
          break;
        case 'lastName':
          INPUT_VALUE.length <= 4 ? (this.errors.firstName = 'Last name is required') : null;
          break;

        default:
          break;
      }
      console.log('Errors', this.errors);

      this.medicalQuestions.info[INDEX] ? this.medicalQuestions.info[INDEX].answer = INPUT_VALUE : null;
      console.log(this.medicalQuestions.info);

    }

    if (SECTION === 'general') {
      let INDEX: any = this.medicalQuestions.general.findIndex((el: any, i: any) => {
        return (Number(el.id) == Number(QUESTION_ID) ? i : null);
      });
      INDEX == -1 ? INDEX = 0 : null;
      this.medicalQuestions.health[INDEX] ? this.medicalQuestions.general[INDEX].answer = CHECKBOX_VALUE : null;
    }

    if (SECTION === 'general') {
      let INDEX: any = this.medicalQuestions.general.findIndex((el: any, i: any) => {
        return (Number(el.id) == Number(QUESTION_ID) ? i : null);
      });
      INDEX == -1 ? INDEX = 0 : null;
      this.medicalQuestions.health[INDEX] ? this.medicalQuestions.general[INDEX].answer = CHECKBOX_VALUE : null;
    }

    if (SECTION === 'allergies') {
      const CHECKBOX_VALUE = e.target.checked
      let INDEX: any = this.medicalQuestions.allergies.findIndex((el: any, i: any) => {
        return (Number(el.id) == Number(QUESTION_ID) ? i : null);
      });
      this.medicalQuestions.health[INDEX] ? this.medicalQuestions.allergies[INDEX].answer = CHECKBOX_VALUE : null;
    }

    if (SECTION === 'health') {
      let INDEX: any = this.medicalQuestions.health.findIndex((el: any, i: any) => {
        return (Number(el.id) == Number(QUESTION_ID) ? i : null);
      });
      this.medicalQuestions.health[INDEX] ? this.medicalQuestions.health[INDEX].answer = CHECKBOX_VALUE : null;
    }


  }

  onSubmit() {

    this._userService.medicalHistory(this.medicalQuestions)
      .subscribe((res) => {
        this.messages = 'Your medical background has been succesfully sent!'
      })

  }

}
