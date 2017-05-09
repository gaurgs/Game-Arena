import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {PlatformService} from '../../app.service';

@Component({
  moduleId: module.id,
  selector: 'jumbotron',
  templateUrl: 'jumbotron.component.html'
})

export class JumbotronComponent { 

	platformCategories:any[];
	items: any[];
	pages: string;
	page: string;
	count: string;
	queryString: string;

    constructor(private _platformService:PlatformService){

    };


    searchByName() {
		this._platformService.searchByName(this.queryString).subscribe(res => {
    		this.platformCategories = res.categories;
    		this.pages = res.pages;
    		this.items = res.items;
    		this.page = res.page;
    		this.count = this.page;
            console.log(res.categories);
        });
    };

    getPlatformCategory(page) {
    	this._platformService.getPlatforms(page).subscribe(res => {
    		this.platformCategories = res.categories;
    		this.pages = res.pages;
    		this.items = res.items;
    		this.page = res.page;
    		this.count = this.page;
            console.log(res.categories);
        });
    };

  	ngOnInit(){
	    this.getPlatformCategory(0);
	};
}