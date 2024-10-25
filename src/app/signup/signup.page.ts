import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  signupForm: FormGroup;
  isSubmit: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService
  ) {
    this.signupForm = new FormGroup({

      name: new FormControl('', [Validators.required, Validators.maxLength(20),
      Validators.pattern(/^[A-Z][a-zA-Z -]*$/)]),

      email: new FormControl('', [Validators.required, Validators.email,
      Validators.pattern(/^[a-z][a-z0-9._%+-]*@[a-z]+\.[a-z]+$/), Validators.maxLength(20)]),

      phone: new FormControl('', [Validators.required, Validators.pattern(/^(?!.*[eE+\-.])\d{10}$/),
      Validators.minLength(10),
      Validators.maxLength(10),
      ]),

      address: new FormControl('', [Validators.required, Validators.maxLength(30)]),

      password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]),

      confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]),

    }, { validators: this.passwordMatchValidator.bind(this) });

  }

  passwordMatchValidator() {
    const passwordControl = this.signupForm?.get('password');
    const confirmPasswordControl = this.signupForm?.get('confirmPassword');
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password == confirmPassword ? null : { passwordNotMatch: true };
  }

  async signup() {
    if (this.signupForm.valid) {
      this.isSubmit = true;
      let data = await this.StorageService.get('signUp') || [];
      var existingUserIds: number[] = [];

      if (data.length > 0) {
        data.forEach((id: any) => {
          existingUserIds.push(id.userId);
        });
      }
      else {
        this.CommonService.presentToast('Data not in storage.');
        console.log('No data is present in storage.');
      }

      let newUserId = Math.floor(Math.random() * 100) + 1;

      if (newUserId) {
        this.signupForm.value.userId = newUserId;
        this.CommonService.presentToast('Id Generated');
        console.log('Generated Id:', newUserId);
      } else {
        this.CommonService.presentToast('Id Not Generated');
        console.log('Error in Generating Id');
      }

      if (data) {
        data.push(this.signupForm.value);
        await this.StorageService.set('signUp', data);
        console.log('Signup Data:', data);
        this.signupForm.reset();
        this.CommonService.presentToast('Signed Up successfuly.');
        this.isSubmit = false;
        this.Navigation.navigateWithRoute('/login');
      }
      else {
        this.isSubmit = false;
        this.CommonService.presentToast('Error in getting signup data');
        console.log('Problem occurred in getting signup data.');
      }

    }
    else {
      this.isSubmit = false;
      this.CommonService.presentToast('Form Invalid');
      console.log('Invalid form');
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


}

