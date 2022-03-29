import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (!this.tokenStorageService.isAccessTokenPresent()) {
      this.router.navigate(['/user/login']);
    }
    return this.tokenStorageService.isAccessTokenPresent();
  }
}
