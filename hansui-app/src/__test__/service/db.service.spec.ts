import { TestBed, inject } from '@angular/core/testing';

import { DbService } from '../../app/service/db.service';

describe('DbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbService]
    });
  });

  it('should be created', inject([DbService], (service: DbService) => {
    expect(service).toBeTruthy();
  }));
});
