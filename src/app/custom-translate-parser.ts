import {Inject, Injectable} from '@angular/core';
import {TranslateDefaultParser, TranslateStore} from '@ngx-translate/core';
import {MODULE_NAME} from './injection-tokens';

@Injectable()
export class CustomTranslateParser extends TranslateDefaultParser {
  constructor(
    @Inject(MODULE_NAME) private prefix: string,
    private translateStore: TranslateStore
  ) {
    super();
  }
  public getValue(target: any, key: string): any {
    const _key = `${this.prefix}:${key}`;
    const _sharedKey = `SHARED:${key}`;

    let result = super.getValue.apply(this, [ target, _key ]);
    if (!result) {
      result = super.getValue.apply(this, [ target, _sharedKey ]);
    }
    return result;
  }
}
