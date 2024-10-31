import { Component, AfterViewInit, HostListener } from '@angular/core';

interface Shell {
  x: number;
  y: number;
  xoff: number;
  yoff: number;
  size: number;
  color: string;
}

interface Pass {
  x: number;
  y: number;
  xoff: number;
  yoff: number;
  size: number;
  color: string;
}

@Component({
  selector: 'app-fireworks',
  template: `<canvas id="Canvas"></canvas>`,
  styleUrls: ['./fireworks.component.css'],
  standalone: true // Set this component as standalone
})
export class FireworksComponent implements AfterViewInit {
  private c!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private cwidth!: number;
  private cheight!: number;
  private shells: Shell[] = [];
  private pass: Pass[] = [];
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
    this.cwidth = window.innerWidth;
    this.cheight = window.innerHeight;
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
  
  private newPass(shell: Shell) {
    const pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);
  
    for (let i = 0; i < pasCount; i++) {
      const pas: Pass = { 
        x: shell.x * this.cwidth,
        y: shell.y * this.cheight,
        xoff: Math.random() * 10 * Math.sin((5 - Math.random() * 4) * (Math.PI / 2)),
        yoff: Math.random() * 10 * Math.sin(Math.random() * 4 * (Math.PI / 2)),
        color: shell.color,
        size: Math.sqrt(shell.size)
      };
  
      if (this.pass.length < 1000) {
        this.pass.push(pas);
      }
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

    for (let ix in this.shells) {
      const shell = this.shells[ix];

      this.ctx.beginPath();
      this.ctx.arc(shell.x * this.cwidth, shell.y * this.cheight, shell.size, 0, 2 * Math.PI);
      this.ctx.fillStyle = shell.color;
      this.ctx.fill();

      shell.x -= shell.xoff;
      shell.y -= shell.yoff;
      shell.xoff -= (shell.xoff * dt * 0.001);
      shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);

      if (shell.yoff < -0.005) {
        this.newPass(shell);
        this.shells.splice(Number(ix), 1);
      }
    }

    for (let ix in this.pass) {
      const pas = this.pass[ix];

      this.ctx.beginPath();
      this.ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
      this.ctx.fillStyle = pas.color;
      this.ctx.fill();

      pas.x -= pas.xoff;
      pas.y -= pas.yoff;
      pas.xoff -= (pas.xoff * dt * 0.001);
      pas.yoff -= ((pas.yoff + 5) * dt * 0.0005);
      pas.size -= (dt * 0.002 * Math.random());

      if (pas.y > this.cheight || pas.y < -50 || pas.size <= 0) {
        this.pass.splice(Number(ix), 1);
      }
    }
    
    requestAnimationFrame(() => this.run());
  }
}
