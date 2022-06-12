import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './service/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kawa1stWebSerApp';

  isTokenPresent = false;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isTokenPresent = this.tokenStorageService.isAccessTokenPresent();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onLogoutClick() {
    this.tokenStorageService.deleteTokens();
    this.tokenStorageService.deleteUserId();
    this.router.navigate(['login']).then(
      () => window.location.reload()
    );
  }

}
