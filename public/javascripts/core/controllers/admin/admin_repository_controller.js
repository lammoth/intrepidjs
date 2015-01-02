/**
 * @file admin_repository_controller.js
 * @namespace Admin Controller
 * @desc This module shows and manages IntrepidJS modules, plugins and other elements
 */
 
angular.module('IntrepidJS')
    .controller('AdminRepositoryController',
        [
            '$scope',
            '$templateCache',
            '$window',
            'restService',
            'i18n',
            adminRepositoryController        
        ]
    );

function adminRepositoryController($scope, $templateCache, $window, restService, i18n) {
    $scope.packages = [];
    $scope.loading = false;

    $scope.searchPackage = function() {
        if ($scope.search.length > 3) {
            restService.get(
                {
                    search: $scope.search
                },
                '/api/v1/admin/repository/search',
                function(data, status, headers, config) {
                    if (data.success) {
                        $scope.packages = data.packages;
                    }
                },
                function(data, status, headers, config) {}
            );
        }
    }
}