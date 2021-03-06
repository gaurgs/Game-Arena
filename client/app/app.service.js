"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var PlatformService = (function () {
    function PlatformService(_http) {
        this._http = _http;
    }
    ;
    PlatformService.prototype.getPlatforms = function (page) {
        this.searchUrl = '/getPlatformsData?' + 'page=' + page;
        return this._http.get(this.searchUrl)
            .map(function (res) { return res.json(); });
    };
    ;
    PlatformService.prototype.searchByName = function (queryString) {
        this.searchUrl = '/getPlatformsData?' + 'category=' + queryString;
        return this._http.get(this.searchUrl)
            .map(function (res) { return res.json(); });
    };
    PlatformService.prototype.searchByRating = function (rating) {
        this.searchUrl = "/searchByRating?" + 'rating=' + rating;
        return this._http.get(this.searchUrl)
            .map(function (res) { return res.json(); });
    };
    PlatformService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlatformService);
    return PlatformService;
}());
exports.PlatformService = PlatformService;
//# sourceMappingURL=app.service.js.map