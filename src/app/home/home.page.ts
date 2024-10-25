import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  postForm: FormGroup;
  loggedInUser: any = [];
  loadPost: boolean = false;
  selectedPostImage: string = '';

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService
  ) {
    this.postForm = new FormGroup({

      postImage: new FormControl('', Validators.required),

      title: new FormControl('', [Validators.required,
      Validators.maxLength(20),
      Validators.pattern(/^[A-Z][a-zA-Z -]*$/),
      ]),

      content: new FormControl('', [Validators.required,
      Validators.maxLength(50),
      ])

    });
  }

  ionViewWillEnter() {
    this.resetForm();
    this.loadLoggedInUser();
  }

  resetForm() {
    this.postForm.reset();
    this.selectedPostImage = '';
  }

  uploadPostImage(evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedPostImage = e.target?.result as string;
        this.postForm.patchValue({
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

  async loadLoggedInUser() {
    this.loggedInUser = await this.StorageService.get('login');
    if (this.loggedInUser) {
      this.CommonService.presentToast('Login user found.');
      console.log('Login Data:', this.loggedInUser);
    } else {
      this.CommonService.presentToast('No logged-in user found.');
      console.log('No logged-in user.');
    }
  }

  async createPost() {
    if (this.postForm.valid && this.loggedInUser) {
      this.loadPost = true;

      let allPosts = await this.StorageService.get('allpost') || [];
      if (allPosts) {

        var existingPostIds: number[] = [];
        if (allPosts.length > 0) {
          allPosts.forEach((post: any) => {
            existingPostIds.push(post.postId);
          });
        }

        let newPostId;
        do {
          newPostId = Math.floor(Math.random() * 100) + 1;
        } while (existingPostIds.includes(newPostId));

        if (newPostId) {
          const newPost = {
            postImage: this.selectedPostImage,
            postId: newPostId,
            title: this.postForm.value.title,
            content: this.postForm.value.content,
            email: this.loggedInUser.email,
            createdAt: new Date().toISOString()  
          };

          this.CommonService.presentToast('Id Generated');
          console.log('Generated Id:', newPostId);


          allPosts.unshift(newPost);

          await this.StorageService.set('allpost', allPosts);
          this.CommonService.presentToast('Post created successfully.');
          console.log('Created Post Data:', allPosts);
          this.resetForm();
          this.selectedPostImage = '';
          this.loadPost = false;
          this.Navigation.navigateWithRoute('/allposts');
        } else {
          this.CommonService.presentToast('Id Not Generated');
          console.log('Error in Generating Id');
        }

      }
      else {
        this.loadPost = false;
        this.CommonService.presentToast('Post not in storage.');
        console.log('No post in storage.');
      }

    }
    else {
      this.loadPost = false;
      this.CommonService.presentToast('Form Invalid.');
      console.log('Invalid Form Data.');
    }

  }

  gotoAllPosts() {
    this.Navigation.navigateWithRoute('/allposts');
  }

}
