import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FireworksComponent } from '../fireworks/fireworks.component';

@Component({
  selector: 'app-password-prompt',
  standalone: true,
  templateUrl: './password-prompt.component.html',
  styleUrls: ['./password-prompt.component.css'],
  imports: [FormsModule, CommonModule, FireworksComponent]
})
export class PasswordPromptComponent {
  password = '';
  showFireworks = false;
  fireworksVisible = false;

  constraints = [
    { text: 'Password must be 25 characters long.', satisfied: false, color: '', visible: false },
    { text: 'Password must contain uppercase letters.', satisfied: false, color: '', visible: false },
    { text: 'Password should mention a title you’re working toward.', satisfied: false, color: '', visible: false },
    { text: 'Password should express excellence.', satisfied: false, color: '', visible: false },
    { text: 'Password should include a word that represents the tense of will.', satisfied: false, color: '', visible: false },
    { text: 'Password should begin with a definite article.', satisfied: false, color: '', visible: false },
    { text: 'Password must mention your age.', satisfied: false, color: '', visible: false },
    { text: 'Password must include today’s date', satisfied: false, color: '', visible: false },
    { text: 'Password must end with with the most doomed generation', satisfied: false, color: '', visible: false },
    { text: 'You have the right words! Try rearranging them and remove what’s not necessary.', satisfied: false, color: '', visible: false }
  ];

  private targetPassword = 'TheBestFutureDoctor251899';

  checkPassword() {


    if (this.password.length == 25) {
      this.constraints[0].satisfied = true;
      this.constraints[0].color = 'green';
      this.constraints[0].visible = true;
    } else {
      this.constraints[0].satisfied = false;
      this.constraints[0].visible = true;
      this.constraints[0].color = 'red';
    }

    if (this.constraints[0].satisfied) {
      if (/[A-Z]/.test(this.password)) {
        this.constraints[1].satisfied = true;
        this.constraints[1].color = 'green';
        this.constraints[1].visible = true;
      } else {
        this.constraints[1].satisfied = false;
        this.constraints[1].visible = true;
        this.constraints[1].color = 'red';
      }
    }

    if (this.constraints[1].satisfied) {
      if (this.password.includes('Doctor')) {
        this.constraints[2].satisfied = true;
        this.constraints[2].color = 'green';
        this.constraints[2].visible = true;
      } else {
        this.constraints[2].satisfied = false;
        this.constraints[2].visible = true;
        this.constraints[2].color = 'red';
      }
    }

    if (this.constraints[2].satisfied) {
      if (this.password.includes('Best')) {
        this.constraints[3].satisfied = true;
        this.constraints[3].color = 'green';
        this.constraints[3].visible = true;
      } else {
        this.constraints[3].satisfied = false;
        this.constraints[3].visible = true;
        this.constraints[3].color = 'red';
      }
    }

    if (this.constraints[3].satisfied) {
      if (this.password.includes('Future')) {
        this.constraints[4].satisfied = true;
        this.constraints[4].color = 'green';
        this.constraints[4].visible = true;
      } else {
        this.constraints[4].satisfied = false;
        this.constraints[4].visible = true;
        this.constraints[4].color = 'red';
      }
    }

    if (this.constraints[4].satisfied) {
      if (this.password.includes('The')) {
        this.constraints[5].satisfied = true;
        this.constraints[5].color = 'green';
        this.constraints[5].visible = true;
      } else {
        this.constraints[5].satisfied = false;
        this.constraints[5].visible = true;
        this.constraints[5].color = 'red';
      }
    }

    if (this.constraints[5].satisfied) {
      if (this.password.includes('25')) {
        this.constraints[6].satisfied = true;
        this.constraints[6].color = 'green';
        this.constraints[6].visible = true;
      } else {
        this.constraints[6].satisfied = false;
        this.constraints[6].visible = true;
        this.constraints[6].color = 'red';
      }
    }

    if (this.constraints[6].satisfied) {
      if (this.password.includes('18')) {
        this.constraints[7].satisfied = true;
        this.constraints[7].color = 'green';
        this.constraints[7].visible = true;
      } else {
        this.constraints[7].satisfied = false;
        this.constraints[7].visible = true;
        this.constraints[7].color = 'red';
      }
    }

    if (this.constraints[7].satisfied) {
      if (this.password.includes('99')) {
        this.constraints[8].satisfied = true;
        this.constraints[8].color = 'green';
        this.constraints[8].visible = true;
      } else {
        this.constraints[8].satisfied = false;
        this.constraints[8].visible = true;
        this.constraints[8].color = 'red';
      }
    }

    if (this.constraints[8].satisfied) {
      if (this.password === this.targetPassword) {
        this.showFireworks = true;
        setTimeout(() => {
          this.fireworksVisible = true;
        }, 100);
      } else {
        this.constraints[9].visible = true;
        this.constraints[9].color = 'red';
      }
    }
  }

  launchFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks';

    for (let i = 0; i < 10; i++) { // Create multiple fireworks
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.left = Math.random() * 100 + 'vw';
      firework.style.animationDelay = Math.random() * 2 + 's';
      firework.style.animation = 'launch 1s forwards, explode 1s forwards';
      fireworksContainer.appendChild(firework);
    }

    document.body.appendChild(fireworksContainer);
    setTimeout(() => {
      fireworksContainer.remove();
    }, 2000);
  }
}
