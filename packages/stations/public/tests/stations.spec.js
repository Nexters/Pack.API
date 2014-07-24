'use strict';

(function() {
  describe('MEAN controllers', function() {
        describe('StationsController', function() {
          var scope, ctrl, $mockBackend;

          beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $monckBackend = _$httpBackend_;
            $mockBackend.expectGET('stations/').
                respond([{name:'신세이비조 역'}, {name:'세이비조 역'}]);

            scope = $rootScope.$new();
            ctrl = $controller('StationsController', {$scope: scope});
          }));

          it('stations 모델 두개가 fetch 한 것과 동일해야 함', function() {
            expect(scope.stations).toEqualData([]);
            $mockBackend.flush();

            expect(scope.stations).toEqualData(
              [{name:'신세이비조 역'}, {name:'세이비조 역'}]);
          });
        });
  });
}());