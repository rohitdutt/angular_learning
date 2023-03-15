import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }
  showAlert = false;
  alertMessage = "Logging you in";
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth){

  }

  async login(){
    this.showAlert = true;
    this.alertMessage = "Logging you in";
    this.alertColor = 'blue';
    this.inSubmission = true;
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      );
    } catch (error) {
      this.alertMessage = "Error";
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }
    this.alertMessage = "Logged in";
    this.alertColor = 'green';
  }
}
