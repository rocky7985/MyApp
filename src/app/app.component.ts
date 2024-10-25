import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { StorageService } from './storage.service';
import { NavigationService } from './navigation.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public Navigation: NavigationService,
    public StorageService: StorageService

  ) { }

  gotoAddCategry() {
    this.Navigation.navigateWithRoute('/add-product-category');
  }

  gotoDateTime() {
    this.Navigation.navigateWithRoute('/datetime');
  }

  gotoAddProduct() {
    this.Navigation.navigateWithRoute('/insert');
  }

  gotoAddPost() {
    this.Navigation.navigateWithRoute('/home');
  }

  logout() {
    this.StorageService.remove('login');
    this.Navigation.navigateWithRoute('/login');
    console.log("Logout clicked");
  }

  navToShop() {
    this.Navigation.navigateWithRoute('/shoppage');
  }

  viewCategory() {
    this.Navigation.navigateWithRoute('/category-page');
  }

}
