import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app-routing.module';
import {CustomLoader} from './custom-loader';
import {CustomTranslateCompiler} from './custom-translate-compiler';
import {CustomTranslateParser} from './custom-translate-parser';
import {MODULE_NAME, SHARED_MODULE_NAMES} from './injection-tokens';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        /*useFactory: HttpLoaderFactory,
        deps: [HttpClient]
         */
        useClass: CustomLoader
      },
      extend: true,
      compiler: { provide: TranslateCompiler, useClass: CustomTranslateCompiler },
      parser: { provide: TranslateParser, useClass: CustomTranslateParser }
    }),
    AppRoutingModule
  ],
  providers: [
    { provide: MODULE_NAME, useValue: 'APP_MODULE'},
    { provide: SHARED_MODULE_NAMES, useValue: ['SHARED_MODULE']},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


  constructor() {
    console.log('AppModule loaded');
  }
}
