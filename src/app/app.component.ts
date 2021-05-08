import { Component } from '@angular/core';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'translation-demo';


  constructor(private translate: TranslateService,
              private router: Router,
              public store: TranslateStore) {
    translate.setDefaultLang('hr');
    this.useLanguage('hr');
  }
  useLanguage(language: string): void {
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    this.router.navigate(['/']);
  }
}
