import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoManagerComponent } from './video-manager.component';

describe('VideoManagerComponent', () => {
  let component: VideoManagerComponent;
  let fixture: ComponentFixture<VideoManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoManagerComponent]
    });
    fixture = TestBed.createComponent(VideoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
