import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './interface/user';
import { TokenStorageService } from './service/token-storage.service';
import { UserService } from './service/user.service';

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
  }

  onClick() {
    this.tokenStorageService.deleteTokens();
    this.router.navigate(['login']).then(
      () => window.location.reload()
    );
  }

}
