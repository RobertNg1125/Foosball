import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LauncherPlayerComponent } from './launcher-player.component';

describe('LauncherPlayerComponent', () => {
  let component: LauncherPlayerComponent;
  let fixture: ComponentFixture<LauncherPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LauncherPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LauncherPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
