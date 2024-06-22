/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FiltersUiComponent } from './FiltersUiComponent';

describe('FiltersUiComponent', () => {
  let component: FiltersUiComponent;
  let fixture: ComponentFixture<FiltersUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersUiComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
