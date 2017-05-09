import { Component } from '@angular/core';
import {PlatformService} from './app.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [PlatformService]
})

export class AppComponent { }