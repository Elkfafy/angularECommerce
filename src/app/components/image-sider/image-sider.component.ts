import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-sider',
  templateUrl: './image-sider.component.html',
  styleUrls: ['./image-sider.component.css']
})
export class ImageSiderComponent implements OnInit {
  @Input() images: any
  constructor() { }

  ngOnInit(): void {
  }

}
