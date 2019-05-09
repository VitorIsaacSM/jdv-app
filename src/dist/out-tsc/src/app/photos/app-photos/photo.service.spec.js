import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';
describe('PhotoService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(PhotoService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=photo.service.spec.js.map