import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.page.html',
  styleUrls: ['./update-post.page.scss'],
})
export class UpdatePostPage {

  updateForm: FormGroup;
  loadPost: boolean = false;
  updatePost: boolean = false;
  postId: number = 0;
  postData: any = [];
  selectedPostImage: string = '';
  loggedInUser: any = [];

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.postId = Number(params.postId);
      console.log('Received CategoryId:', this.postId);
    });

    this.updateForm = new FormGroup({
      postImage: new FormControl('', Validators.required),

      title: new FormControl('', [Validators.required,
      Validators.maxLength(20),
      Validators.pattern(/^[A-Z][a-zA-Z -]*$/),
      ]),

      content: new FormControl('', [Validators.required,
      Validators.maxLength(50),
      ]),

    });

  }

  ionViewWillEnter() {
    this.loadLoggedInUser();
  }

  async loadLoggedInUser() {
    this.loggedInUser = await this.StorageService.get('login');
    if (this.loggedInUser) {
      this.CommonService.presentToast('Login user found.');
      this.storedData();
      console.log('Login Data:', this.loggedInUser);
    } else {
      this.CommonService.presentToast('No logged-in user found.');
      console.log('No logged-in user.');
    }
  }

  uploadPostImage(evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedPostImage = e.target?.result as string;
        this.updateForm.patchValue({
          postImage: this.selectedPostImage,
        });
      }
      reader.readAsDataURL(file);
    }
    else {
      this.CommonService.presentToast('Error in uploading image.');
      console.log('Error in uploading image.');
    }
  }

  async storedData() {
    const post = await this.StorageService.get('allpost') || [];
    this.loadPost = true;

    if (post) {
      this.postData = post.find(
        (post: any) => post.postId == this.postId && post.email == this.loggedInUser.email
      );

      if (this.postData) {
        this.updateForm.patchValue(this.postData);
        this.selectedPostImage = this.postData.postImage || '';
        this.loadPost = false;
        this.CommonService.presentToast('Post Retrieved Successfully.');
        console.log('Stored Data:', this.postData);
      }
      else {
        this.loadPost = false;
        this.CommonService.presentToast('Post Not Retrieved.');
        console.log('No Data Retrieved.');
      }

    }
    else {
      this.loadPost = false;
      this.CommonService.presentToast('Post Not in Storage.');
      console.log('No Post in Storage.');
    }

  }

  async updatedPost() {
    if (this.updateForm.valid) {
      this.updatePost = true;

      const data = await this.StorageService.get('allpost') || [];
      if (data) {
        const index = data.findIndex(
          (post: any) => post.postId == this.postId && post.email == this.loggedInUser.email
        );

        if (index > -1) {
          data[index] = { ...data[index], ...this.updateForm.value };
          await this.StorageService.set('allpost', data);
          this.updatePost = false;
          this.CommonService.presentToast('Post updated successfully.');
          console.log('Updated Data:', data[index]);
          this.Navigation.navigateWithRoute('/allposts');
        }
        else {
          this.updatePost = false;
          this.CommonService.presentToast('Post not found for update.');
          console.log('Post ID not found.');
        }

      }
      else {
        this.updatePost = false;
        this.CommonService.presentToast('Post Not Found in Storage.');
        console.log('No Post in Storage.');
      }

    }
    else {
      this.updatePost = false;
      this.CommonService.presentToast('Update Form Invalid.');
      console.log('Invalid Form Data.');
    }

  }

  viewAllPosts() {
    this.Navigation.navigateWithRoute('/allposts');
  }

}
