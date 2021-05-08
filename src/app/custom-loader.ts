import {TranslateLoader, TranslateService, TranslateStore} from '@ngx-translate/core';
import {combineLatest, forkJoin, Observable, of} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {MODULE_NAME, SHARED_MODULE_NAMES} from './injection-tokens';
import {delay, map, tap} from 'rxjs/operators';

const translations = [
  {language: 'en', module: 'APP_MODULE', key: 'demo.title', translation: 'hello app module'},
  {language: 'en', module: 'APP_MODULE', key: 'demo.text', translation: 'hello app module text'},
  {language: 'en', module: 'SHARED', key: 'dealer.greeting', translation: 'hello from shared dealer'},
  {language: 'en', module: 'LAZY_MODULE', key: 'lazyloaded.title', translation: 'Lazy title'},
  {language: 'en', module: 'LAZY_MODULE', key: 'lazyloaded.text', translation: 'Lazy text'},
  {language: 'hr', module: 'APP_MODULE', key: 'demo.title', translation: 'bok app module'},
  {language: 'hr', module: 'APP_MODULE', key: 'demo.text', translation: 'bok app module text'},
  {language: 'hr', module: 'SHARED', key: 'dealer.greeting', translation: 'bok from shared dealer'},
  {language: 'hr', module: 'LAZY_MODULE', key: 'lazyloaded.title', translation: 'Lazy naslov'},
  {language: 'hr', module: 'LAZY_MODULE', key: 'lazyloaded.text', translation: 'Lazy tekst'}
];

@Injectable()
export class CustomLoader implements TranslateLoader{

  constructor(
    @Inject(MODULE_NAME) private module: string,
    @Inject(SHARED_MODULE_NAMES) private sharedModules: string,
    private translateStore: TranslateStore,

  ) { }

  fetchTranslations(lang: string, module: string): Observable<any> {
    return of(translations.filter(t => t.language === lang && t.module === module));
  }

  private convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item.value,
      };
    }, initialValue);
  };

  getTranslation(lang: string): Observable<any> {
    const obs1 = this.fetchTranslations(lang, this.module).pipe(delay(1000));
    const obs2 = this.fetchTranslations(lang, 'SHARED');
    return combineLatest([obs1, obs2]).pipe(
        map(res => (res[0].concat(res[1]))),
        map(res => res.map(r1 => ({key: r1.module + ':' + r1.key, value: r1.translation}))),
        map(res => {
          return this.convertArrayToObject(res, 'key'); })
    );
  }


}
