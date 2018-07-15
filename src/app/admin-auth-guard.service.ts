import { CanActivate, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe
    (map(appUser => {
      if (appUser.isAdmin) {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    }));
  }
}
