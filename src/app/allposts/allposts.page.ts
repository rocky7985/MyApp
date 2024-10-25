import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-allposts',
  templateUrl: './allposts.page.html',
  styleUrls: ['./allposts.page.scss'],
})
export class AllpostsPage {

  allposts: any = [];
  loggedInUser: any = [];
  loadPosts: boolean = false;
  searchPost: string = '';
  originalPosts: any = [];

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService
  ) { }

  ionViewWillEnter() {
    this.loadLoggedInUser();
  }

  async loadLoggedInUser() {
    this.loggedInUser = await this.StorageService.get('login');
    if (this.loggedInUser) {
      this.viewAllPosts();
    } else {
      this.CommonService.presentToast('No logged-in user found.');
      console.log('No logged-in user.');
    }
  }

  async viewAllPosts() {
    let posts = await this.StorageService.get('allpost') || [];
    this.loadPosts = true;

    if (posts) {
      this.allposts = posts.filter((post: any) => post.email == this.loggedInUser.email).
        sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      ;
      this.originalPosts = [...this.allposts];

      if (this.allposts.length > 0) {
        this.loadPosts = false;
        this.CommonService.presentToast('Posts Fetched successfully.');
        console.log('All Posts:', this.allposts);
      }
      else {
        this.loadPosts = false;
        this.CommonService.presentToast('Posts Not Fetched successfully.');
        console.log('Error in Fetching All Posts.');
      }

    }
    else {
      this.loadPosts = false;
      this.CommonService.presentToast('Error getting posts or none to display.');
      console.log('Error in getting all posts');
    }
  }

  async deletePost(postId: any) {

    this.loadPosts = true;
    const removePost = await this.StorageService.get('allpost') || [];

    if (removePost) {
      const index = removePost.findIndex((id: any) => id.postId == postId && id.email == this.loggedInUser.email);

      if (index > -1) {
        removePost.splice(index, 1);
        await this.StorageService.set('allpost', removePost);
        this.allposts = removePost.filter((post: any) => post.email == this.loggedInUser.email);
        this.originalPosts = [...this.allposts];

        this.loadPosts = false;
        this.CommonService.presentToast('Post deleted successfully.');
        console.log('Post deleted successfully.');
      }
      else {
        this.loadPosts = false;
        this.CommonService.presentToast('Post Index not found.');
        console.log('Index not found.');
      }

    }
    else {
      this.loadPosts = false;
      this.CommonService.presentToast('Post not in storage for deletion.');
      console.log('No post in storage.');
    }

  }

  deleteAlert(id: any, event: Event) {
    event.stopPropagation();
    this.CommonService.presentAlert(
      'Delete Alert!',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },

        {
          text: 'Delete',
          cssClas: 'alert-button-confirm',
          handler: () => {
            this.deletePost(id);
          }
        },
      ],
      'custom-alert'
    );

  }

  async search() {

    if (this.searchPost.trim() == '') {
      this.resetPosts();
    } else {
      this.allposts = this.originalPosts.filter((post: any) => {
        return (
          (post.title && post.title.toLowerCase().includes(this.searchPost.toLowerCase()))
        );
      });
    }
    console.log('Filter Post:', this.allposts);

  }

  resetPosts() {
    this.allposts = [...this.originalPosts];
  }

  updatePost(postId: any, event: Event) {
    event.stopPropagation();
    this.Navigation.goToNavigateForword('/update-post', { postId });
  }

  viewSingle(postId: any) {
    this.Navigation.goToNavigateForword('/single-post', { postId });
    console.log('Id:', postId);
  }

  backToAddPost() {
    this.Navigation.navigateWithRoute('/home');
  }

  stopEvent(event: Event) {
    event.stopPropagation();
  }

}
