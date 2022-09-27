import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideImagesComponent } from './side-images.component';

describe('SideImagesComponent', () => {
  let component: SideImagesComponent;
  let fixture: ComponentFixture<SideImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
