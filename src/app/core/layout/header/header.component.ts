import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { NgIf } from '@angular/common';
import { UserModel } from '../../../features/auth/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [NgIf],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: UserModel | undefined;

  constructor (private authService: AuthService) {}

  ngOnInit (): void {
    this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.user = user;
    });
  }
}
