import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.page.html',
  styleUrls: ['./single-post.page.scss'],
})
export class SinglePostPage {

  viewPost: any = [];
  loadPost: boolean = false;
  postId: number = 0;
  loggedInUser: any = [];

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.postId = Number(params.postId);
      console.log('ProductId:', this.postId);
    });
  }

  ionViewWillEnter() {
    this.loadLoggedInUser();
  }

  async loadLoggedInUser() {
    this.loggedInUser = await this.StorageService.get('login');
    if (this.loggedInUser) {
      this.viewSingle();
    } else {
      this.CommonService.presentToast('No logged-in user found.');
      console.log('No logged-in user.');
    }
  }

  async viewSingle() {
    this.loadPost = true;

    const allposts = await this.StorageService.get('allpost') || [];

    if (allposts) {
      this.viewPost = allposts.find(
        (post: any) => post.postId == this.postId && post.email == this.loggedInUser.email
      );

      if (this.viewPost) {
        this.CommonService.presentToast('Product details fetched successfully.');
        console.log('Post Data:', this.viewPost);
      }
      else {
        this.CommonService.presentToast('Post not found.');
        console.log('Post Data not found');
      }
      this.loadPost = false;

    }
    else {
      this.loadPost = false;
      this.CommonService.presentToast('Error getting Post details.');
      console.log('Error in getting Post Data.');
    }
    
  }

  backToAllPost() {
    this.Navigation.navigateWithRoute('/allposts');
  }


}
