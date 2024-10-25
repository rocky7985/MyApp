import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.page.html',
  styleUrls: ['./add-product-category.page.scss'],
})
export class AddProductCategoryPage {

  categoryForm: FormGroup;
  selectedImage: string = '';

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService,
    private fb: FormBuilder
  ) {
    this.categoryForm = new FormGroup({
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

      category: this.fb.array([this.createCategory()])
    });
  }

  uploadProfileImage(evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImage = e.target?.result as string;
        this.categoryForm.patchValue({
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
    return this.categoryForm.get('category') as FormArray;
  }

  createCategory(): FormGroup {
    return this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[A-Z][a-zA-Z -]*$/)])
    });
  }

  addCategory() {
    if (this.categories.length < 5) {
      this.categories.push(this.createCategory());
    }
  }

  removeCategory(i: number) {
    if (this.categories.length > 1) {
      this.categories.removeAt(i);
    }
  }



  async addProduct() {
    if (this.categoryForm.valid) {
      let category = await this.StorageService.get('category') || [];

      var existingIds: number[] = [];
      if (category.length > 0) {
        category.forEach((category: any) => {
          existingIds.push(category.categoryId);
        });
      }
      let newCategoryId = Math.floor(Math.random() * 100) + 1;
      if (newCategoryId) {
        this.categoryForm.value.categoryId = newCategoryId;
        this.CommonService.presentToast('Id Generated');
        console.log('Generated Id:', newCategoryId);
      } else {
        this.CommonService.presentToast('Id Not Generated');
        console.log('Error in Generating Id');
      }

      if (category) {
        category.push(this.categoryForm.value);
        await this.StorageService.set('category', category);
        console.log('Product Category Data:', category);
        this.categoryForm.reset();
        this.selectedImage = '';
        this.CommonService.presentToast('Product Category Added successfuly.');
      }
      else {
        this.CommonService.presentToast('Error in getting category');
        console.log('Problem occurred in getting data.');
      }
    }
    else {
      this.CommonService.presentToast('Form Invalid');
      console.log('Invalid form');
    }
  }

  gotoAllPosts() {
    this.Navigation.navigateWithRoute('/allposts');
  }

}
