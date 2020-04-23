import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

function userNameValidator(control : FormControl):{[s:string]:boolean}{
  if( !control.value.match(/^[\u4e00-\u9fa5]{0,}$/)){
    return { invalidUser:true };
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm: FormGroup;

  userName: AbstractControl;

  password: AbstractControl;
  
  name$: Observable<string>;

  constructor(private fb: FormBuilder){
    this.myForm = this.fb.group(
      {
        'userName' : ['', Validators.compose([Validators.required,Validators.maxLength(6),userNameValidator])],
        'password' : ['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(8)])]
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val =>{
      console.log(val);
    });
  }

  onSubmit(value: any){
    console.log(value);
  }
}
