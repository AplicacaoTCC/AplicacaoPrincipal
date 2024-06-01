import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInputComponent } from './video-input.component';

describe('VideoInputComponent', () => {
  let component: VideoInputComponent;
  let fixture: ComponentFixture<VideoInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoInputComponent]
    });
    fixture = TestBed.createComponent(VideoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
