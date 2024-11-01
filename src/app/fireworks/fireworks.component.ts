import { Component, AfterViewInit, HostListener } from '@angular/core';

interface Shell {
  x: number;
  y: number;
  xoff: number;
  yoff: number;
  size: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  xoff: number;
  yoff: number;
  size: number;
  color: string;
  lifespan: number;
}

@Component({
  selector: 'app-fireworks',
  template: `<canvas id="Canvas"></canvas>`,
  styleUrls: ['./fireworks.component.css'],
  standalone: true
})
export class FireworksComponent implements AfterViewInit {
  private c!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private cwidth!: number;
  private cheight!: number;
  private shells: Shell[] = [];
  private particles: Particle[] = [];
  private colors = [
    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
    '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', 
    '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
  ];

  ngAfterViewInit() {
    this.c = document.getElementById('Canvas') as HTMLCanvasElement;
    this.ctx = this.c.getContext('2d')!;
    this.reset();
    this.run();
  }

  @HostListener('window:resize', ['$event'])
  reset() {
    this.cwidth = window.innerWidth / 10;
    this.cheight = window.innerHeight / 10;
    this.c.width = this.cwidth;
    this.c.height = this.cheight;
  }

  private newShell() {
    const left = Math.random() > 0.5;
    const shell: Shell = {
      x: left ? 1 : 0,
      y: 1,
      xoff: (0.01 + Math.random() * 0.007) * (left ? 1 : -1),
      yoff: 0.01 + Math.random() * 0.007,
      size: Math.random() * 6 + 3,
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    };
    this.shells.push(shell);
  }

  private explodeShell(shell: Shell) {
    const particleCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 2 + 1;

      const particle: Particle = {
        x: shell.x * this.cwidth,
        y: shell.y * this.cheight,
        xoff: Math.cos(angle) * speed,
        yoff: Math.sin(angle) * speed,
        color: shell.color,
        size: Math.sqrt(shell.size),
        lifespan: 100 + Math.random() * 100
      };
      this.particles.push(particle);
    }
  }

  private lastRun = 0;

  run() {
    const dt = this.lastRun ? Math.min(50, (performance.now() - this.lastRun)) : 1;
    this.lastRun = performance.now();

    this.ctx.fillStyle = "rgba(0,0,0,0.25)";
    this.ctx.fillRect(0, 0, this.cwidth, this.cheight);

    if (this.shells.length < 10 && Math.random() > 0.96) {
      this.newShell();
    }

    for (let i = this.shells.length - 1; i >= 0; i--) {
      const shell = this.shells[i];

      this.ctx.beginPath();
      this.ctx.arc(shell.x * this.cwidth, shell.y * this.cheight, shell.size, 0, 2 * Math.PI);
      this.ctx.fillStyle = shell.color;
      this.ctx.fill();

      shell.x -= shell.xoff;
      shell.y -= shell.yoff;
      shell.yoff -= 0.02;  // Adds a gravity effect

      if (shell.yoff < -0.01) {
        this.explodeShell(shell);
        this.shells.splice(i, 1);
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();

      particle.x += particle.xoff;
      particle.y += particle.yoff;
      particle.yoff += 0.02;  // Gravity effect
      particle.size *= 0.98;  // Shrinks over time
      particle.lifespan -= dt;

      if (particle.lifespan <= 0 || particle.size <= 0) {
        this.particles.splice(i, 1);
      }
    }
    
    requestAnimationFrame(() => this.run());
  }
}
