import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth: AuthService, private emailTaken: EmailTaken){

  }

  isSubmission = false;

  name= new FormControl('', [Validators.required])
  email= new FormControl('',[Validators.required, Validators.email], [this.emailTaken.validate])
  age= new FormControl<number | null>(null)
  password= new FormControl('')
  confirm_password= new FormControl('')
  phoneNumber= new FormControl('')

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created';
  alertColor = 'blue';

  registerForm = new FormGroup({
    name:this.name,
    email:this.email,
    age:this.age,
    password:this.password,
    confirm_password:this.confirm_password,
    phoneNumber:this.phoneNumber,

  }, [RegisterValidators.match('password', 'confirm_password')]);

  async register(){
    this.showAlert = true;
    this.alertMsg = 'Please wait! your account is being created';
    this.alertColor = 'blue';
    this.isSubmission = true;
    
    try{
      await this.auth.createUser(this.registerForm.value as IUser);
    }catch(e){
      console.log(e);
      this.alertMsg = 'Error occured! Try again later';
      this.alertColor = 'red';
      this.isSubmission = false;
      return;
    }
    this.alertMsg = 'Account created.';
    this.alertColor = 'green';  
  }
}
