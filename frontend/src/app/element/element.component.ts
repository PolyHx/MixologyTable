import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'element',
  templateUrl: './element.component.html'
})
export class ElementComponent implements OnInit {
  @Input("element") element;

  public width = "100%";

  ngOnInit() {
    this.width = this.updateWidth(window.screen.width);
  }

  public getBackgroundColor() {
    if (this.element === undefined) {
      return "white";
    }
    if (this.element.group === "Tequila") {
      return "#f4c842";
    } else if (this.element.group === "Vodka") {
      return "#f4f141";
    } else if (this.element.group === "Gin") {
      return "#4191f4";
    } else if (this.element.group === "Frozen") {
      return "#41f4b2";
    } else if (this.element.group === "Shooter") {
      return "#bc51ff";
    }
  }
  public updateWidth(windowSize: number) {
    if (windowSize < 800) {
      return "100%";
    }
    if (this.element === undefined) {
      return "9.090909090909%";
    }
    if (this.element.number < 43) {
      return "9.090909090909%";
    } else {
      return "11.11111111111%";
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = this.updateWidth(event.target.innerWidth);
  }
}
