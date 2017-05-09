import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlatformService{
    private searchUrl: string;
    
    constructor(private _http:Http){
        
    };
    
    getPlatforms(page){
        this.searchUrl = '/getPlatformsData?' + 'page=' + page;
        return this._http.get(this.searchUrl)
            .map(res => res.json());
    };

    searchByName(queryString) {
    	this.searchUrl = '/getPlatformsData?' + 'category=' + queryString;
        return this._http.get(this.searchUrl)
            .map(res => res.json());
    }

    searchByRating(rating) {
    	this.searchUrl = "/searchByRating?" + 'rating='+rating;
    	return this._http.get(this.searchUrl)
            .map(res => res.json());
    }

}