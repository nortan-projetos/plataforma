import {
  Component,
  ChangeDetectorRef,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  NbLoginComponent,
  NbAuthService,
  NB_AUTH_OPTIONS,
} from '@nebular/auth';

import Cotter from 'cotter';
import { AuthService } from '../auth.service';
import { UserService } from '../../shared/services/user.service';
import { Config, VerifySuccess } from 'cotter/lib/binder';
import { take } from 'rxjs/operators';
import * as user_validation from '../../shared/user-validation.json';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent implements OnInit {
  @ViewChild('form_login', { read: ElementRef })
  iframeRef;
  validation = (user_validation as any).default;
  success = false;
  payload = null;
  payloadString = null;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    protected authService: AuthService,
    protected userService: UserService
  ) {
    super(service, options, cd, router);
    this.authService.submitted$.next(false);
  }

  ngOnInit(): void {
    const config = {
      ApiKeyID: process.env.COTTER_KEY,
      ContainerID: 'cotter-form-container-form_login',
    } as Config;

    const verifyEmail = async (payload) => {
      const registeredEmails = await this.userService
        .getUsers()
        .pipe(take(1))
        .toPromise();
      if (!registeredEmails.find((el) => el.email == payload.identifier)) {
        return 'Email não cadastrado!';
      }
      return null;
    };

    const cotter = new Cotter(config);
    cotter
      .withFormID('form_login')
      .signInWithLink(verifyEmail)
      .showEmailForm()
      .then((payload: VerifySuccess) => {
        this.success = true;
        this.payload = payload;
        this.payloadString = JSON.stringify(payload, null, 4);
        console.log(this.payload, this.payloadString);
      })
      .catch((err: any) => console.log(err));
  }

  login(): void {
    this.authService.submitted$.next(true);
    super.login();
  }
}
