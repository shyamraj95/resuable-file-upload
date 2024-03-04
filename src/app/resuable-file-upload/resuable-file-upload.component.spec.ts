import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResuableFileUploadComponent } from './resuable-file-upload.component';

describe('ResuableFileUploadComponent', () => {
  let component: ResuableFileUploadComponent;
  let fixture: ComponentFixture<ResuableFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResuableFileUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResuableFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
