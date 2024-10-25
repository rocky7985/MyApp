import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.page.html',
  styleUrls: ['./category-page.page.scss'],
})
export class CategoryPagePage {

  allCategories: any = [];
  loadCategories: boolean = false;
  searchCategory: string = '';
  originalCategories: any = [];

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService,
  ) { }

  ionViewWillEnter() {
    this.viewCategories();
  }

  async viewCategories() {
    const category = await this.StorageService.get('category') || [];
    this.loadCategories = true;
    if (category.length > 0) {
      this.allCategories = category;
      this.originalCategories = [...this.allCategories];
      if (this.allCategories) {
        this.loadCategories = false;
        this.CommonService.presentToast('Categories Fetched succesfully.');
        console.log('All Categories:', this.allCategories);
      }
      else {
        this.CommonService.presentToast('Categories not fetched succesfully.');
        console.log('Categories not assigned to array.');
      }
    }
    else {
      this.loadCategories = false;
      this.CommonService.presentToast('Error to load categories.');
      console.log('Problem occurred to load categories');
    }
  }

  async deleteCategory(categoryId: any) {
    this.loadCategories = true;
    const category = await this.StorageService.get('category') || [];
    const index = category.findIndex((cat: any) => cat.categoryId == categoryId);
    if (index > -1) {
      category.splice(index, 1);
      await this.StorageService.set('category', category);
      this.allCategories = category;
      this.CommonService.presentToast('Category deleted successfully.');
      console.log('Category deleted:', categoryId);
    }
    else {
      this.CommonService.presentToast('Category not found.');
      console.log('Category not found for deletion:', categoryId);
    }
    this.loadCategories = false;
  }

  deleteAlert(id: number) {

    this.CommonService.presentAlert(
      'Delete Category',
      'Are you sure want to delete the category?',
      [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Delete',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteCategory(id);
          }
        },
      ],
      'custom-alert',
    );

  }

  async search() {

    if (this.searchCategory.trim() == '') {
      this.resetCategories();
    } else {
      this.allCategories = this.originalCategories.filter((cat: any) => {
        return (
          (cat.firstName && cat.firstName.toLowerCase().includes(this.searchCategory.toLowerCase())) ||
          (cat.lastName && cat.lastName.toLowerCase().includes(this.searchCategory.toLowerCase())) ||
          (cat.phone && cat.phone.toLowerCase().includes(this.searchCategory.toLowerCase())) ||
          (cat.address && cat.address.toLowerCase().includes(this.searchCategory.toLowerCase())) ||
          (cat.category && cat.category.some((c: any) => c.name.toLowerCase().includes(this.searchCategory.toLowerCase())))
        );
      });
      console.log('Filtered Categories:', this.allCategories);
    }

  }

  resetCategories() {
    this.allCategories = [...this.originalCategories];
  }


  updateCategory(categoryId: any) {
    this.Navigation.goToNavigateForword('/update-category', { categoryId });
    console.log('Id:', categoryId);
  }

  gotoAllPosts() {
    this.Navigation.navigateWithRoute('/allposts');
  }

}
