import { TestBed } from '@angular/core/testing';

import { MosaicService } from './mosaic.service';

describe('MosaicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MosaicService = TestBed.get(MosaicService);
    expect(service).toBeTruthy();
  });
});
