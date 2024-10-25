import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.page.html',
  styleUrls: ['./view-single.page.scss'],
})
export class ViewSinglePage {

  viewProduct: any = [];
  loadProduct: boolean = false;
  productId: number = 0;

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private Navigation: NavigationService
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.productId = Number(params.productId);
      console.log('ProductId:', this.productId);
    });
  }

  ionViewWillEnter() {
    this.viewSingle();
  }

  async viewSingle() {
    this.loadProduct = true;

    const product = await this.StorageService.get('products') || [];

    if (product.length > 0) {
      this.viewProduct = product.find((id: any) =>
        id.productId == this.productId
      );

      if (this.viewProduct) {
        this.CommonService.presentToast('Product details fetched successfully.');
        console.log('Product Data:', this.viewProduct);
      }
      else {
        this.CommonService.presentToast('Product not found.');
        console.log('Product Data not found');
      }
      this.loadProduct = false;
    }
    else {
      this.loadProduct = false;
      this.CommonService.presentToast('Error getting product details.');
      console.log('Error in getting Product Data.');
    }
  }

  goToShop() {
    this.Navigation.navigateWithRoute('/shoppage');
  }

}
