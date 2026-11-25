import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltarCita]',
  standalone: true,
})
export class ResaltarCitaDirective implements OnChanges {
  @Input() appResaltarCita: string = ''; 
  @Input() estadoCita: string = '';      

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const hoy = new Date().toISOString().split('T')[0];

    if (this.appResaltarCita === hoy && this.estadoCita === 'Pendiente') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff8e1');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #ffc107');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'border-left');
    }
  }
}