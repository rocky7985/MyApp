import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.page.html',
  styleUrls: ['./update-category.page.scss'],
})
export class UpdateCategoryPage {

  updateCategory: FormGroup;
  categoryId: number = 0;
  loadCategory: boolean = false;
  updateData: boolean = false;
  storedCategory: any = [];
  selectedImage: string = '';

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService,
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute
  ) {

    this.activatedroute.queryParams.subscribe((params: any) => {
      this.categoryId = Number(params.categoryId);
      console.log('Received CategoryId:', this.categoryId);
    });

    this.updateCategory = new FormGroup({

      profileImage: new FormControl('', Validators.required),

      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z -]*$/),
      Validators.maxLength(20),
      ]),

      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z -]*$/),
      Validators.maxLength(20)
      ]),

      phone: new FormControl('', [Validators.required, Validators.pattern(/^(?!.*[eE+\-.])\d{10}$/),
      Validators.minLength(10),
      Validators.maxLength(10),
      ]),

      address: new FormControl('', [Validators.required,
      Validators.maxLength(30)
      ]),

      category: this.fb.array([]),
    });
  }

  ionViewWillEnter() {
    this.getstoredCategory();
  }

  uploadProfileImage(evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImage = e.target?.result as string;
        this.updateCategory.patchValue({
          profileImage: this.selectedImage,
        });
      }
      reader.readAsDataURL(file);
    }
    else {
      this.CommonService.presentToast('Error in uploading image.');
      console.log('Error in uploading image.');
    }
  }

  get categories() {
    return this.updateCategory.get('category') as FormArray;
  }

  addCategory(name: string = '') {
    if (this.categories.length < 5) {
      const categoryGroup = this.fb.group({
        name: new FormControl(name, [Validators.required, Validators.maxLength(10),
        Validators.pattern(/^[A-Z][a-zA-Z -]*$/)]),
      });
      this.categories.push(categoryGroup);
    }
  }

  removeCategory(i: number) {
    if (this.categories.length > 1) {
      this.categories.removeAt(i);
    }
  }

  async getstoredCategory() {
    const getCategory = await this.StorageService.get('category') || [];
    this.loadCategory = true;

    if (getCategory.length > 0) {
      this.storedCategory = getCategory.find((id: any) => id.categoryId == this.categoryId);

      if (this.storedCategory) {
        this.updateCategory.patchValue(this.storedCategory);
        this.selectedImage = this.storedCategory.profileImage || '';
        this.categories.clear();
        this.storedCategory.category.forEach((c: any) => {
          this.addCategory(c.name);
        });
        this.CommonService.presentToast('Category fetched successfully.');
        console.log('Category Data:', this.storedCategory);
      }
      else {
        this.CommonService.presentToast('Category not able to fetched.');
        console.log('Category not patched.');
      }

      this.loadCategory = false;
      console.log('Data retrieved successfully.');
    }
    else {
      this.loadCategory = false;
      this.CommonService.presentToast('Category not present in storage.');
      console.log('Category not found.', getCategory);
    }

  }

  async updateCategoryData() {
    this.updateData = true;

    if (this.updateCategory.valid) {
      const allCategories = await this.StorageService.get('category') || [];
      const updateCategoryIndex = allCategories.findIndex((category: any) => category.categoryId == this.categoryId);

      if (updateCategoryIndex > -1) {
        allCategories[updateCategoryIndex] = { ...allCategories[updateCategoryIndex], ...this.updateCategory.value };
        await this.StorageService.set('category', allCategories);
        this.CommonService.presentToast('Category Updated successfully.');
        console.log('Product Category.', this.updateCategory.value);
        this.Navigation.navigateWithRoute('/category-page');
      }
      else {
        this.CommonService.presentToast('Category not found for update.');
        console.log('Product Category not found on the index');
      }

      this.updateData = false;
    }
    else {
      this.CommonService.presentToast('Form is invalid. Please correct the errors.');
      console.log('Form Invalid.');
      this.updateData = false;
    }

  }

  gotoCategory() {
    this.Navigation.navigateWithRoute('/category-page');
  }

}
