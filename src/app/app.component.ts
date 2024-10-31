import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordPromptComponent } from './password-prompt/password-prompt.component';
import { FireworksComponent } from './fireworks/fireworks.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PasswordPromptComponent, FireworksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  showFireworks = false;
  showBirthdayMessage = false;

  onPasswordGuessed() {
      this.showFireworks = true;
      this.showBirthdayMessage = true;

      setTimeout(() => {
          this.showBirthdayMessage = false;
      }, 5000);
  }
}
