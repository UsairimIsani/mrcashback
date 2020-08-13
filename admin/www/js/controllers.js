angular.module('starter.controllers', ['filereader', 'starter.services'])

.controller('AppCtrl', function($scope) {

})


.controller('AdminCtrl', function($scope, cityazureapiservice, $ionicSlideBoxDelegate) {
	var vm = this;
	vm.changes = false;
	var baseUrl = "https://city365.blob.core.windows.net/mrcashback/";
	$scope.$on('$ionicView.beforeEnter', function(e) {
		vm.bonuri = [];
		cityazureapiservice.getBonuri()
			.then(function(bonuri) {
				console.log("bonuri", bonuri);
				for (var bon in bonuri) {
					var url = baseUrl + bonuri[bon].filename;
					if (bonuri[bon].filename) {
						bonuri[bon].image_url = url;
						bonuri[bon].schimbat = false;
						vm.bonuri[vm.bonuri.length] = bonuri[bon];
					}
				}
				$ionicSlideBoxDelegate.update();

			})
	});

	$scope.slideVisible = function(index) {
		if (index < $ionicSlideBoxDelegate.currentIndex() - 1 ||
			index > $ionicSlideBoxDelegate.currentIndex() + 1) {
			return false;
		}

		return true;
	}


	vm.salveazaBon = function(bon) {
		bon.schimbat = false;
		var ceTrebe = {
			id: bon.id,
			number: bon.number,
			value: bon.value,
			store_name: bon.store_name
		}
		cityazureapiservice.updateBon(ceTrebe)
		.then(function(result){
			alert('ok!');
		})
		.catch(function(err){
			alert('ceva nu-i ok :(');
		})
	}

	vm.shitChanged = function(bon) {
		bon.schimbat = true;
	}

});