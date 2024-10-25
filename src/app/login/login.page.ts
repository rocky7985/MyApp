import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  loadData: boolean = false;
  showPassword: boolean = false;

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,
      Validators.pattern(/^[a-z][a-z0-9._%+-]*@[a-z]+\.[a-z]+$/), Validators.maxLength(20)]),

      password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),

      rememberMe: new FormControl(false),

    });
  }

  ionViewWillEnter() {
    this.rememberMe();
  }

  async login() {
    if (this.loginForm.valid) {
      this.loadData = true;
      let data = await this.StorageService.get('signUp') || [];

      if (data && data.length > 0) {
        let enteredEmail = this.loginForm.value.email;
        let enteredPassword = this.loginForm.value.password;

        const user = data.find((u: any) =>
          u.email == enteredEmail &&
          u.password == enteredPassword);

        if (user) {
          await this.StorageService.set('login', user);

          if (this.loginForm.value.rememberMe) {
            await this.StorageService.set('remember', user);
          }
          else {
            await this.StorageService.remove('remember');
          }

          this.CommonService.presentToast('Signin Successfully.');
          console.log('Login Data:', this.loginForm.value);
          this.loginForm.reset();
          this.Navigation.navigateWithRoute('/allposts');
          this.loadData = false;
        }

        else {
          this.CommonService.presentToast('Data not matched from SignUp.');
          console.log('No data in Signup.');
        }
      }

      else {
        this.CommonService.presentToast('Data not get from Storage.');
        console.log('No data in storage.');
        this.loadData = false;
      }
    }

    else {
      this.CommonService.presentToast('Login Form Invalid.');
      console.log('Invalid Form Data.');
    }

  }

  async rememberMe() {
    const rememberUser = await this.StorageService.get('remember') || [];
    if (rememberUser) {
      this.loginForm.patchValue({
        email: rememberUser.email,
        password: rememberUser.password,
        rememberMe: true,
      });
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  goToSignup() {
    this.Navigation.navigateWithRoute('/signup');
  }


}
