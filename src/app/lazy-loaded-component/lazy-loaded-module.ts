import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LazyLoadedComponent} from './lazy-loaded-component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser, TranslateService} from '@ngx-translate/core';
import {CustomLoader} from '../custom-loader';
import {CustomTranslateCompiler} from '../custom-translate-compiler';
import {CustomTranslateParser} from '../custom-translate-parser';
import {MODULE_NAME, SHARED_MODULE_NAMES} from '../injection-tokens';

const routes: Routes = [
  {
    path: '',
    component: LazyLoadedComponent
  }
];

@NgModule({
  declarations: [LazyLoadedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader
      },
      extend: true,
      compiler: { provide: TranslateCompiler, useClass: CustomTranslateCompiler},
      parser: { provide: TranslateParser, useClass: CustomTranslateParser }
    })
  ],
  providers: [
    { provide: MODULE_NAME, useValue: 'LAZY_MODULE' },
    { provide: SHARED_MODULE_NAMES, useValue: []},
  ],
  exports: [RouterModule]
})
export class LazyLoadedModule {

  constructor(private translateService: TranslateService) {

  }
}
