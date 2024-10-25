import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-shoppage',
  templateUrl: './shoppage.page.html',
  styleUrls: ['./shoppage.page.scss'],
})
export class ShoppagePage {

  itemDetails: any = [];
  loadProducts: boolean = false;

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService
  ) { }

  ionViewWillEnter() {
    this.viewProducts();
  }

  async viewProducts() {

    let data = await this.StorageService.get('products');
    this.loadProducts = true;
    if (data) {
      this.itemDetails = data;
      this.loadProducts = false;
      this.CommonService.presentToast('Products Fetched successfully.');
      console.log('All Products:', this.itemDetails);
    }
    else {
      this.loadProducts = false;
      this.CommonService.presentToast('Error getting products or none to display.');
      console.log('Error in getting all products');
    }
  }

  gotoAllPosts() {
    this.Navigation.navigateWithRoute('/allposts');
  }

  navToViewSingle(productId: any) {
    this.Navigation.goToNavigateForword('/view-single', { productId });
    console.log('Id:', productId);
  }

}
