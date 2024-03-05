import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationModalComponent } from './participation-modal.component';

describe('ParticipationModalComponent', () => {
  let component: ParticipationModalComponent;
  let fixture: ComponentFixture<ParticipationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
