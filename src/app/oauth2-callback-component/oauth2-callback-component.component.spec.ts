import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuth2CallbackComponentComponent } from './oauth2-callback-component.component';

describe('OAuth2CallbackComponentComponent', () => {
  let component: OAuth2CallbackComponentComponent;
  let fixture: ComponentFixture<OAuth2CallbackComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OAuth2CallbackComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OAuth2CallbackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
