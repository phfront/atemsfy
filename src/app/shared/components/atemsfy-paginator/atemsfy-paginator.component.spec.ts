import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtemsfyPaginatorComponent } from './atemsfy-paginator.component';

describe('AtemsfyPaginatorComponent', () => {
  let component: AtemsfyPaginatorComponent;
  let fixture: ComponentFixture<AtemsfyPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtemsfyPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtemsfyPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
