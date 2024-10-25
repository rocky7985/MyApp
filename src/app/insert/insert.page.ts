import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage {
  insertForm: FormGroup;
  selectedImage: any = [];
  maxImages: number = 5;

  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef<HTMLInputElement>;

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService
  ) {
    this.insertForm = new FormGroup({
      productName: new FormControl('', [Validators.required,
      Validators.maxLength(20),
      Validators.pattern(/^[A-Z][a-zA-Z -]*$/),
      ]),
      featured_image: new FormControl([], Validators.required),
      productPrice: new FormControl('', [Validators.required,
      Validators.min(1),
      Validators.maxLength(10),
      Validators.pattern(/^(?!.*[eE+\-.])[1-9][0-9]*$/)
      ]),

      productDescription: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      dimensions: new FormGroup({
        height: new FormControl('', [Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^(?!.*[eE+-])\d{1,5}(\.\d{1,2})?$/)
        ]),
        weight: new FormControl('', [Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^(?!.*[eE+-])\d{1,5}(\.\d{1,2})?$/)
        ]),
        depth: new FormControl('', [Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^(?!.*[eE+-])\d{1,5}(\.\d{1,2})?$/)
        ]),
      }),
    });
  }

  ionViewWillEnter() {
    this.resetForm();
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  resetForm() {
    this.insertForm.reset();
    this.selectedImage = [];
  }

  handleFileSelect(evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    if (files && files[0]) {
      if (this.selectedImage.length >= this.maxImages) {
        this.CommonService.presentToast('You can upload upto 5 images');
        return;
      }
      Array.from(files).forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (this.selectedImage.length < this.maxImages) {
            this.selectedImage.push(e.target?.result);
            this.insertForm.patchValue({
              featured_image: this.selectedImage,
            });
          }
          else {
            this.CommonService.presentToast('Error in pushing image.');
            console.log('Error in pushing image.');
          }
        }
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number) {
    this.selectedImage.splice(index, 1);
    this.insertForm.patchValue({
      featured_image: this.selectedImage,
    });
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  async addProduct() {
    if (this.insertForm.valid) {
      let data = await this.StorageService.get('products') || [];
      var existingIds: number[] = [];
      if (data.length > 0) {
        data.forEach((product: any) => {
          existingIds.push(product.productId);
        });
      }
      let newProductId = this.generateId(existingIds);
      this.insertForm.value.productId = newProductId;
      console.log('Generated Id:', newProductId);

      data.push(this.insertForm.value);
      await this.StorageService.set('products', data);
      console.log('Product Data:', data);
      this.insertForm.reset();
      this.selectedImage = [];
      this.CommonService.presentToast('Product Added successfuly.');
    }
    else {
      this.CommonService.presentToast('Form Invalid');
      console.log('Invalid form');
    }
  }

  generateId(existingId: number[]): number {
    let productId: number;
    let rangeStart = 0;
    let rangeEnd = 99;

    while (true) {
      productId = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;


      if (!existingId.includes(productId)) {
        return productId;
      }

      if (rangeStart == 0 && rangeEnd == 99 && existingId.length >= 99) {
        rangeStart = 100;
        rangeEnd = 999;
      }

      if (rangeStart == 100 && rangeEnd == 999 && existingId.length >= 1000) {
        rangeStart = 1000;
        rangeEnd = 9999;
      }
    }
  }

  gotoAllPosts() {
    this.Navigation.navigateWithRoute('/allposts');
  }

}