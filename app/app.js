var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ui.bootstrap','angularUtils.directives.dirPagination']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .when('/insCompany', {
                title: 'Installation Company',
                templateUrl: 'partials/installationCompany/index.html',
                controller: 'insCompanyCtrl',
                role: '0'
            })
            .when('/laborPrice/index/:id', {
                title: 'Installation Company',
                templateUrl: 'partials/laborPrice/index.html',
                controller: 'laborPriceCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }])
  .config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('/partials/dirPagination.tpl.html');
});
//    .run(function ($rootScope, $location, Data) {
//        $rootScope.$on("$routeChangeStart", function (event, next, current) {
//            $rootScope.authenticated = false;
//            Data.get('session').then(function (results) {
//                if (results.uid) {
//                    $rootScope.authenticated = true;
//                    $rootScope.uid = results.uid;
//                    $rootScope.name = results.name;
//                    $rootScope.email = results.email;
//                } else {
//                    var nextUrl = next.$$route.originalPath;
//                    if (nextUrl == '/signup' || nextUrl == '/login') {
//
//                    } else {
//                        $location.path("/login");
//                    }
//                }
//            });
//        });
//    });