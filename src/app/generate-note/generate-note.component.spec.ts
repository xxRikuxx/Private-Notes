import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateNoteComponent } from './generate-note.component';

describe('GenerateNoteComponent', () => {
  let component: GenerateNoteComponent;
  let fixture: ComponentFixture<GenerateNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
