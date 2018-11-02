import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/client/user/user.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
})
export class QuestionsComponent implements OnInit {


  questionsList: any = [];
  currentMessage: any = {};
  question: FormGroup;
  @ViewChildren("questionBox") questionBox: QueryList<any>
  isClicked = [];
  currentUpload;
  dropzoneActive;
  activeElement = '';
  commentResponse = '';


  constructor(
    public _userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.fetchUserQuestions();
    this.question = new FormGroup({
      subject: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });

  }




  selectMessage(id) {
    this.currentMessage = this.questionsList[id];
    this.isClicked = [];
    this.isClicked[id] = !this.isClicked[id];
  }

  fetchUserQuestions() {
    this.questionsList = this._userService.usersPayload.questions;
    if (!this.questionsList) {
      this._userService.fetchUserProfile()
        .subscribe(
          (succ) => (this.questionsList = succ.questions),
          (err) => {
            // @TODO UNCOMMENT NAVIGATE
            // err.error ? this.router.navigate(['/']) : ''
          })
    }
  }

  commentOnQuestion() {

    if (this.commentResponse.length <= 3) {
      return
    }

    let commentQ: any = {
      id: this.currentMessage._id,
      comment: this.commentResponse
    }

    this._userService.commentQuestion(commentQ)
      .subscribe(
        (succ) => (console.log(succ),
          (err) => console.log(err)
        )
      )
    commentQ.user = 'You have responded:';
    commentQ.date = new Date();

    this.currentMessage.comments.unshift(commentQ)
    this.commentResponse = '';

  }

  askQuestion() {

    if (!this.question.value.content || this.question.value.content == '' && this.question.value.content.length >= 2) {
      return console.log('You must add content')
    }
    if (!this.question.value.subject || this.question.value.subject == '' && this.question.value.subject.length >= 2) {
      return console.log('You must add a subject')
    }

    this._userService.askQuestion(this.question.value)
      .subscribe(
        (succ) => (console.log(succ),
          (err) => console.log(err)
        )
      )
  }



  /* *
  *  IMAGE DROP
  */

  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  // hanldeDrop(filesList: FileList) {
  //   console.log(filesList.length);
  //   let filesIndex = _.range(filesList.length);
  //   _.each(filesIndex, (idx) => {
  //     this.currentUpload = filesList[idx];
  //     this._userService.onUploadImage(this.currentUpload)
  //       .subscribe(suc => console.log(suc))

  //   })
  //   console.warn(this.currentUpload);
  // }



}
