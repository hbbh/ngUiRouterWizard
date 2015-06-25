# ui-router-wizard
A simple wizard based visual progress bar for ui-router

Using a nested ui-router state map like that below.
```javascript
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
```
NOTE: Add a 'display' property to each state to render inside the wizard bar, if you don't do this then the state name will be used.

Add an element with the ui-router-wizard attribute:
```html
<div ui-router-wizard></div>
```
