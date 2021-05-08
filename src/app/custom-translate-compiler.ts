import {Inject, Injectable} from '@angular/core';
import {TranslateCompiler, TranslateStore} from '@ngx-translate/core';
import {MODULE_NAME} from './injection-tokens';

@Injectable()
export class CustomTranslateCompiler extends TranslateCompiler {
    constructor(
    @Inject(MODULE_NAME) private prefix: string,
    private translateStore: TranslateStore
  ) {
   super();
  }

  public compileTranslations(translations: any, lang: string): {[p: number]: any}{

      return  translations ;
  }

  public compile(value: string, lang: string): string {
    return value;
  }
}
