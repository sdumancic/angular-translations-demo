import { Component, OnInit } from '@angular/core';
import {TranslateService, TranslateStore} from '@ngx-translate/core';

@Component({
  selector: 'app-lazy-loaded-component',
  templateUrl: './lazy-loaded-component.html',
  styleUrls: ['./lazy-loaded-component.scss']
})
export class LazyLoadedComponent implements OnInit {

  constructor(public store: TranslateStore, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.translateService.getTranslation(this.translateService.getDefaultLang());
  }

}
