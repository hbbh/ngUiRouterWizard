 /***
    https://github.com/hbbh/ui-router-wizard

     A wizard based UI display directive that renders sibling routes.
     dependecies: LowDash, $state, $rootScope
     developed by: Tristan Blackwell

     usage: 
     
        1) Add element to your app like this: 
        
        <div ui-router-wizard></div>

        2) Configure your routes something like this:
        
        Adding a display attribute to each route to render inside the wizard bar, if you don't do this then the state name will be used.

        app.config(function ($stateProvider) {
        $stateProvider
            .state('parent', {
                url: '/parent',
                views: {
                    'main': {
                        controller: 'parentCtrl',
                        templateUrl: 'parent/parent.html'
                    }
                },
                display: 'Step 1'
            }).state('parent.step2', {
                url: '/step2',
                views: {
                    'sub': {
                        controller: 'step2Ctrl',
                        templateUrl: 'parent/step2.html'
                    }
                },
                display: 'Step 2'
            }).state('parent.step3', {
                url: '/step3',
                views: {
                    'sub': {
                        controller: 'step3Ctrl',
                        templateUrl: 'parent/step3.html'
                    }
                },
                display: 'Step 3'
            }).state('parent.step4', {
                url: '/step4',
                views: {
                    'sub': {
                        controller: 'step4Ctrl',
                        templateUrl: 'parent/step4.html'
                    }
                },
                display: 'Step 4'
            });
        });
       
    */
    angular.module('ui.router.wizard', ['ui.router'])
    .directive('uiRouterWizard', ['$state', '$rootScope', function ($state, $rootScope) {
        return {
            template: '<div id="ui-router-wizard"><ul><li ng-repeat="route in routes" ng-class="{active: route.active}"><span class="counter"><span class="glyphicon glyphicon-ok" ng-if="route.complete"></span><span ng-if="!route.complete">{{route.index}}</span></span> <span ng-class="{\'hidden-xs\' : !route.active }">{{route.display}}</span></li></ul></div>',
            link: function (scope, element) {

                var updateWizard = function () {
                    // get the current state name
                    var currentStateName = $state.current.name;
                    // get the parent part o fthe dot notation state name
                    var parent = currentStateName.split('.')[0];
                    // get all the states within the ui-router routes
                    var allStates = $state.get();
                    var index = 0;
                    // only return the routes that we care about
                    var childstates = _.filter(allStates, function (state) {
                        if (state.name.lastIndexOf(parent, 0) === 0) {
                            state.index = ++index;

                            // if the state has previously been marked as active, then it must be complete.
                            if (state.active) {
                                state.complete = true;
                                state.active = false;
                            }
                            // mark the item as active
                            if (state.name === currentStateName) {
                                state.active = true;
                            }

                            if (!state.display) {
                                state.display = state.name;
                            }

                            return state;
                        }
                        return null;
                    });
                    scope.routes = childstates;
                }
                updateWizard();
                $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    if (toState !== fromState) {
                        updateWizard();
                    }
                });
            }
        };
    }]);
