import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: FormGroup;
  @ViewChild('recaptcha') recaptchaElem: ElementRef;
  isSending = false;
  wasSent = false;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.contact = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

    // Will need this if module is lazy loaded
    // (window as any).grecaptcha.render(this.recaptchaElem.nativeElement);
  }

  send() {

    this.isSending = true;

    const name = this.contact.value.name;
    const email = this.contact.value.email;
    const message = this.contact.value.message;
    const recaptcha = this.recaptchaElem.nativeElement.querySelector('.g-recaptcha-response').value;

    const functionUrl = 'https://posmn-send-mail.azurewebsites.net/api/Send'
      + '?code=Azt6UTfVxWn73wefp3IwWnAoFCfYy6wXc29plV39kk2gaTw7xJ8yPw==';

    this.httpClient.post(functionUrl, {
      name,
      email,
      recaptcha,
      message
    })
      .pipe(
        catchError(error => {
          this.isSending = false;
          this.snackBar.open('Oops. Message could not be sent. Try it again.', null, {
            duration: 1000,
          });
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.isSending = false;
        this.wasSent = true;
        // show message is send
        this.contact.disable();
        this.contact.patchValue({ name: '', message: '' });
        this.snackBar.open('Message sent.', null, {
          duration: 3000,
        });
      });
  }
}
