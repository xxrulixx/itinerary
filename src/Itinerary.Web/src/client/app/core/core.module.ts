import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { SharedModule } from '../shared/shared.module';

import { AuthErrorHandler } from './auth/auth-error.handler';
import { AuthGuard } from './auth/auth.guard';
import { AuthHttpServiceFactory, AuthService } from './auth/auth.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    SharedModule.forRoot()
  ],
  entryComponents: [],
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    SharedModule,
    NavbarComponent,
    FooterComponent
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        // {
        //   provide: AuthHttp,
        //   useFactory: AuthHttpServiceFactory,
        //   deps: [HttpClient, Http, RequestOptions]
        // },
        // {
        //   provide: ErrorHandler,
        //   useClass: AuthErrorHandler
        // },
        AuthGuard,
        AuthService
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
