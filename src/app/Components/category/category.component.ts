import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/ViewModels/category';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  navigationSubscription;
  categories: Category[];
  constructor(private catsServices: CategoryService, private router: Router )  { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
   }
   initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.catsServices.GetAllCategories().subscribe(cats => { this.categories = cats; },
      error => {
        console.log(error);
      });
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.catsServices.GetAllCategories().subscribe(cats => {this.categories = cats; } ,
      error => {console.log(error);
      });
  }

}
