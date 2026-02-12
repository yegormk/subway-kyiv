import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationInfo } from './station-info';

describe('StationInfo', () => {
  let component: StationInfo;
  let fixture: ComponentFixture<StationInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
