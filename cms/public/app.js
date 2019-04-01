/*************************************************
* Title: GitHub - dlenhart/st-node-express-angular-demo: A simple CRUD app in Node.js/Express/MySQL/Angular
* Author: Lenhart, D
* Date: 2016
* Code version: Not Specified 
* Availability: https://github.com/dlenhart/st-node-express-angular-demo
*************************************************/

/* PERFORMANCE MONITOR */

/*************************************************
* Title: javascript - How to calculate the page load time for angular JS application( single page application) - Stack Overflow.
* Author: user3632710
* Date: 2016
* Code version: Not Specified 
* Availability: https://stackoverflow.com/questions/36979907/how-to-calculate-the-page-load-time-for-angular-js-application-single-page-appl
*************************************************/
angular.module('timerCTRL', []).run(function($window, $rootScope) { $rootScope.someData = Date.now() / 1000 - $window.timerStart; });

/* SETUP */

var userCTRL = angular.module('userCTRL', []);
var fieldCTRL = angular.module('fieldCTRL', []);
var pageCTRL = angular.module('pageCTRL', []);
var loginCTRL = angular.module('loginCTRL', []);
var frontendCTRL = angular.module('frontendCTRL', []);
var uploadCTRL = angular.module('uploadCTRL', ['ngFileUpload']);
var app = angular.module('app', ['userCTRL', 'fieldCTRL', 'pageCTRL', 'loginCTRL', 'uploadCTRL', 'ngSanitize', 'frontendCTRL', 'timerCTRL']);

/* SYS FILTERS */

/*************************************************
* Title: AngularJS Trusted Resource Filter • GitHub source code
* Author: Buchea, J
* Date: 2015
* Code version: Not Specified 
* Availability: https://gist.github.com/joshbuchea/5aa780b818a97d713247
*************************************************/ 
app.filter("trustUrl", ['$sce', function ($sce) {
    return function (resource) { return $sce.trustAsResourceUrl("../uploads/" + resource); };
}]);

/*************************************************
* Title: Plunker - AngularJS 1.2.x, date ordinal filter source code
* Author: iamgururaj
* Date: 2014
* Code version: Not Specified 
* Availability: http://next.plnkr.co/edit/HiyQ9uvxQL3FRoj7hKB8?p=preview&utm_source=legacy&utm_medium=worker&utm_campaign=next&preview
*************************************************/ 
app.filter('dateSuffix', function($filter) {
  var suffixes = ["th", "st", "nd", "rd"];
  return function(input) {
    var dtfilter = $filter('date')(input, 'yyyy MMMM dd');
    var day = parseInt(dtfilter.slice(-2));
    var relevantDigits = (day < 30) ? day % 20 : day % 30;
    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return "<h2 class='semi-large semi-bold lh-30 uk-margin-remove'>\
                <span class='large'>" + $filter('date')(input, 'd') + suffix + "</span> " + $filter('date')(input, 'MMMM') + " " + $filter('date')(input, 'yyyy') + "</h2>";
  };
});

/* FRONTEND FILTERS */

/*************************************************
* Title: angularjs - Why is ng-bind-html not displaying anything? - Stack Overflow source code
* Author: sylwester
* Date: 2015
* Code version: Not Specified 
* Availability: https://stackoverflow.com/questions/27880658/why-is-ng-bind-html-not-displaying-anything
*************************************************/
app.filter('getHTML', ['$sce', function ($sce) {
    return function(field) {
        if (field.type == 'Integer') { return $sce.trustAsHtml('<p>' + field.value + '</p>'); }
        else if (field.type == 'Text') { return $sce.trustAsHtml('<p>' + field.value + '</p>'); }
        else if (field.type == 'Textarea') { return $sce.trustAsHtml(field.value); }
        else if (field.type == 'Date') { return $sce.trustAsHtml('<p>' + field.value + '</p>'); }
        else if (field.type == 'Image') { return $sce.trustAsHtml('<img src="../uploads/' + field.value + '" alt="">'); }
        else if (field.type == 'Audio') { 
            return $sce.trustAsHtml('<audio controls><source src="../uploads/' + field.value + '" type="audio/mpeg"></audio>'); }
        else if (field.type == 'Video') { 
            return $sce.trustAsHtml('<video width="320" height="240" controls><source src="../uploads/' + field.value + '" type="video/mp4"></video>'); }
        else { return 'Unknown Type'; }
    }
}]);
/*************************************************
* Title: AngularJS Custom Filter to Camel Case words. • GitHub source code
* Author: umidjons
* Date: 2013
* Code version: Not Specified 
* Availability: https://gist.github.com/umidjons/6668763
*************************************************/
app.filter( 'camelCase', function () {
    var camelCaseFilter = function ( input ) {
        var words = input.split( ' ' );
        for ( var i = 0, len = words.length; i < len; i++ )
        words[i] = words[i].charAt( 0 ).toUpperCase() + words[i].slice( 1 );
        return words.join( ' ' );
    };
    return camelCaseFilter;
});

app.filter('replaceDash', function(){
    var replaceDashFilter = function(input) {
        var str = input.replace(/-/g," ");
        return str
    }
    return replaceDashFilter;
});

/* SYS CONTROLLERS */

loginCTRL.controller('loginCTRL', function ($scope, $http, $rootScope) {
    $scope.verdict = "";
    $scope.dt = new Date();
    $scope.authUser = function () { 
        if (!$scope.name || !$scope.password) {
            $scope.verdict = "<div class='uk-alert uk-margin-remove uk-alert-danger uk-animation-slide-bottom'>Please Complete The Form</div>"; 
        } 
        else {
           $http.post('api/auth/', { 'name' : $scope.name, 'password' : $scope.password })
            .success(function (data, status, headers, config) {
                if(data.user == 'Error Finding data'){
                    $scope.verdict = "<div class='uk-alert uk-margin-remove uk-alert-danger uk-animation-slide-bottom'>Incorrect Credentials</div>";
                } else {
                    $scope.user_type = data.user[0].type;
                    /*************************************************
                    * Title: javascript - string.Replace in AngularJs - Stack Overflow source code
                    * Author: Guffa
                    * Date: 2014
                    * Code version: Not Specified 
                    * Availability: https://stackoverflow.com/questions/25332511/string-replace-in-angularjs
                    *************************************************/ 
                    $scope.display_name = data.user[0].name.replace(/ /g, ", ");
                    $scope.verdict = "Valid User";
                }
            })
            .error(function (data, status, headers, config) { 
                console.log("User is not valid or does not exist"); 
                $scope.verdict = "<div class='uk-alert uk-margin-remove uk-alert-danger uk-animation-slide-bottom'>User is not valid or does not exist</div>";
            }); 
            
            $http.get("api/sys")
            .success(function (response) {
                $scope.conf_host = response.host;  
                $scope.conf_user = response.user;  
                $scope.conf_db = response.database;   
            }).error(function (data, status, headers, config) { });
            
            $scope.openData = function () { $scope.data = true; };
            $scope.closeData = function () { $scope.data = false; };
            $scope.openStructure = function () { $scope.structure = true; };
            $scope.closeStructure = function () { $scope.structure = false; };
            $scope.openAccounts = function () { $scope.accounts = true; };
            $scope.closeAccounts = function () { $scope.accounts = false; };
        }
    };
    $scope.signOut = function () { $scope.verdict = ""; };    
});

userCTRL.controller('userCTRL', function ($scope, $http) {
    
    $scope.createmodal = $scope.updatemodal = false;
    $scope.modaltitle = "";

    $scope.showCreateForm = function () {
        $scope.clearForm();
        $scope.createmodal = true;
        $scope.updatemodal = false;
        $scope.modaltitle = "Create New User";
    };

    $scope.clearForm = function () { 
        $scope.id = $scope.name = $scope.password = $scope.type = $scope.modaltitle = "";
        $scope.createmodal = $scope.updatemodal = false;
    };
    
    $scope.getAll = function () { 
        $http.get("api/list")
        .success(function (response) { 
            $scope.users = response.error === 2 ? "There are currently no users available!" : response.users; 
            var types = $scope.types  = {};
            /*************************************************
            * Title: What is the best way to loop a JSON array in AngularJS or JavaScript? - Quora
            * Author: Kumar, A
            * Date: 2017
            * Code version: Not Specified 
            * Availability: https://www.quora.com/What-is-the-best-way-to-loop-a-JSON-array-in-AngularJS-or-JavaScript
            *************************************************/ 
            angular.forEach($scope.users, function(itm){
                if(!types[itm.type]){
                    types[itm.type] = {name:itm.type, value:true, count:1, items:[itm] };
                    return;
                }
                types[itm.type].count++;
                types[itm.type].items.push(itm);
            });
        }).error(function (data, status, headers, config) { console.log("Error: Data Unretrievable"); });
    };

    $scope.readOne = function (id) { 
        $scope.clearForm();
        $scope.createmodal = false;
        $scope.updatemodal = true;
        $scope.modaltitle = "Edit User";
        $http.get('api/list/' + id) 
        .success(function (data, status, headers, config) {
            $scope.id = data.user[0].id;
            $scope.name = data.user[0].name;
            $scope.password = data.user[0].password;
            $scope.type = data.user[0].type;
        }).error(function (data, status, headers, config) { console.log("Error: Data Unretrievable"); });
    };
    
    $scope.createUser = function () { 
        $http.post('/api/insert', { 'name' : $scope.name, 'password' : $scope.password, 'type' : $scope.type })
        .success(function (data, status, headers, config) {       
            $scope.clearForm();    
            $scope.getAll(); 
        }).error(function (data, status, headers, config) { console.log("Error: Data Unretrievable"); });
    };
	
    $scope.updateUser = function () { 
        $http.put('/api/update', { 'id' : $scope.id, 'name' : $scope.name, 'password' : $scope.password, 'type' : $scope.type })
        .success(function (data, status, headers, config) {
            $scope.clearForm(); 
            $scope.getAll(); 
        }).error(function (data, status, headers, config) { console.log("Error: Data Unretrievable"); });
    };
    
    $scope.cancelForm = function () {
        if($scope.createmodal == true) { $scope.createmodal = false; }
        else if($scope.updatemodal == true) { $scope.updatemodal = false; }
    };

    $scope.deleteUser = function (id) { 
        $http.post('/api/delete', { 'id' : id })
        .success(function (data, status, headers, config) { $scope.getAll(); })
        .error(function (data, status, headers, config) { $scope.getAll(); });
    };
});

/*************************************************
* Title: File Upload with AngularJS and NodeJS | CipherTrick source code
* Author: Shaikh, R
* Date: 2015
* Code version: Not Specified 
* Availability: https://ciphertrick.com/2015/12/07/file-upload-with-angularjs-and-nodejs/
*************************************************/
uploadCTRL.controller('uploadCTRL',['Upload','$window','$scope','$rootScope', function(Upload,$window,$scope,$rootScope){
    var vm = this;
    vm.submit = function(){ if (vm.upload_form.file.$valid && vm.file) { vm.upload(vm.file); }}
    vm.upload = function (file) {
        Upload.upload({ url: 'http://localhost:8081/upload', data:{file:file} }).then(function (resp) { 
            resp.data.error_code === 0 ? console.log(resp.config.data.file.name + '" Uploaded') : console.log('Error Occured');    
            $rootScope.upFile = resp.config.data.file.name; 
        }, 
        function (resp) { console.log('Error status: ' + resp.status); }, 
        function (evt) { 
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
}]);

fieldCTRL.controller('fieldCTRL',['$scope','$http','$filter','$rootScope','$timeout', function ($scope,$http,$filter,$rootScope, $timeout) {  
    $scope.createmodal = $scope.updatemodal = false;
    
    $scope.showCreateForm = function () {
        $scope.clearForm(); 
        $scope.createmodal = true;
        $scope.updatemodal = false;
    };

    $scope.clearForm = function () { 
        $scope.id = $scope.field_name = $scope.field_type = $scope.field_value = "";
        $scope.createmodal = $scope.updatemodal = false;
    };
    
    $scope.getAll = function () { 
        $http.get("api/fieldlist")
        .success(function (response) { 
            response.error === 2 ? console.log("No Data") : $scope.fields = response.fields; 
            var field_types = $scope.field_types = {};
            angular.forEach($scope.fields, function(itm){
                if(!field_types[itm.field_type]){
                    field_types[itm.field_type] = {name:itm.field_type, value:true, count:1, items:[itm] };
                    return;
                }
                field_types[itm.field_type].count++;
                field_types[itm.field_type].items.push(itm);
            });
        }).error(function (data, status, headers, config) { console.log("Error fetching data (database connection?)"); });
    };

    $scope.readOne = function (id) { 
        $scope.clearForm();  
        $scope.createmodal = false;
        $scope.updatemodal = true;

        $http.get('api/fieldlist/' + id).success(function (data, status, headers, config) {
            $scope.id = data.field[0].id;
            $scope.field_name = data.field[0].field_name;
            $scope.field_type = data.field[0].field_type;
            if($scope.field_type == 'Integer') { $scope.field_value = parseInt(data.field[0].field_value); } 
            else if($scope.field_type == 'Date') { $scope.field_value = data.field[0].field_value; }
            else { $scope.field_value = data.field[0].field_value; }
        }).error(function (data, status, headers, config) { $scope.modalstatustext = "There was an error fetching data"; });
    };
    
    $scope.createField = function () { 
        if ($scope.field_type == 'Date') {
            $http.post('/api/fieldinsert', {
                'field_name' : $scope.field_name,
                'field_type' : $scope.field_type,
                /*************************************************
                * Title: AngularJS - convert dates in controller - Stack Overflow source code
                * Author: Miles, D
                * Date: 2013
                * Code version: Not Specified 
                * Availability: https://stackoverflow.com/questions/20131553/angularjs-convert-dates-in-controller
                *************************************************/
                'field_value' : $scope.field_value = $filter('date')($scope.field_value, "yyyy-MM-dd")
            })
            .success(function (data, status, headers, config) {       
                $scope.clearForm();            
                $scope.getAll(); 
            }).error(function (data, status, headers, config) { $scope.modalstatustext = "Unable to Update data!"; });
        } 
        else if ($scope.field_type == 'Image') {
            $timeout(function () {
                $http.post('/api/fieldinsert', {
                    'field_name' : $scope.field_name,
                    'field_type' : $scope.field_type,
                    /*************************************************
                    * Title: Angular Scopes source code
                    * Author: Not Specified
                    * Date: Not Specified
                    * Code version: Not Specified 
                    * Availability: https://www.w3schools.com/angular/angular_scopes.asp
                    *************************************************/
                    'field_value' : $rootScope.upFile
                }).success(function (data, status, headers, config) {    
                    $scope.clearForm();            
                    $scope.getAll(); 
                }).error(function (data, status, headers, config) { console.log("Unable to Update data!"); });
            }, 3000);       
        } 
        else if ($scope.field_type == 'Audio') {
            $timeout(function () {
                $http.post('/api/fieldinsert', {
                    'field_name' : $scope.field_name,
                    'field_type' : $scope.field_type,
                    'field_value' : $rootScope.upFile
                }).success(function (data, status, headers, config) {       
                    $scope.clearForm();            
                    $scope.getAll(); 
                }).error(function (data, status, headers, config) { console.log("Unable to Update data!"); });
            }, 3000);
        }
        else if ($scope.field_type == 'Video') {
            $timeout(function () {
                $http.post('/api/fieldinsert', {
                    'field_name' : $scope.field_name,
                    'field_type' : $scope.field_type,
                    'field_value' : $rootScope.upFile
                }).success(function (data, status, headers, config) {        
                    $scope.clearForm();            
                    $scope.getAll(); 
                }).error(function (data, status, headers, config) { console.log("Unable to Update data!"); });
            }, 3000);
                 
        }
        else {
            $http.post('/api/fieldinsert', {
                'field_name' : $scope.field_name,
                'field_type' : $scope.field_type,
                'field_value' : $scope.field_value
            }).success(function (data, status, headers, config) {       
                $scope.clearForm();            
                $scope.getAll(); 
            }).error(function (data, status, headers, config) { console.log("Unable to Update data!"); });
        }
    };
	
    $scope.updateField = function () { 
        if($scope.field_type == 'Date') { 
           $http.put('/api/fieldupdate', {
                'id' : $scope.id,
                'field_name' : $scope.field_name,
                'field_type' : $scope.field_type,
                'field_value' : $scope.field_value = $filter('date')($scope.field_value, "yyyy-MM-dd")
            }).success(function (data, status, headers, config) {
                $scope.clearForm(); 
                $scope.getAll(); 
            }).error(function (data, status, headers, config) { console.log("Unable to Update data!"); });
        }
        else if ($scope.field_type == 'Image') {
            $timeout(function () {
                $http.put('/api/fieldupdate', {
                    'id' : $scope.id,
                    'field_name' : $scope.field_name,
                    'field_type' : $scope.field_type,
                    'field_value' : $rootScope.upFile,
                    'old_value' : $scope.field_value
                }).success(function (data, status, headers, config) {     
                    $scope.clearForm();            
                    $scope.getAll(); 
                }).error(function (data, status, headers, config) { console.log("Unable to Update data!"); });
            }, 3000);
                 
        }
        else if ($scope.field_type == 'Audio') {
            $timeout(function () {
                $http.put('/api/fieldupdate', {
                    'id' : $scope.id,
                    'field_name' : $scope.field_name,
                    'field_type' : $scope.field_type,
                    'field_value' : $rootScope.upFile,
                    'old_value' : $scope.field_value
                }).success(function (data, status, headers, config) {      
                    $scope.clearForm();            
                    $scope.getAll(); 
                }).error(function (data, status, headers, config) { console.log("Unable to Update data!"); });
            }, 3000);       
        }
        else if ($scope.field_type == 'Video') {
            $timeout(function () {
                $http.put('/api/fieldupdate', {
                    'id' : $scope.id,
                    'field_name' : $scope.field_name,
                    'field_type' : $scope.field_type,
                    'field_value' : $rootScope.upFile,
                    'old_value' : $scope.field_value
                }).success(function (data, status, headers, config) {      
                    $scope.clearForm();            
                    $scope.getAll(); 
                }).error(function (data, status, headers, config) { console.log("Unable to Update data!"); });
            }, 3000);        
        }
        else {
            $http.put('/api/fieldupdate', {
                'id' : $scope.id,
                'field_name' : $scope.field_name,
                'field_type' : $scope.field_type,
                'field_value' : $scope.field_value
            }).success(function (data, status, headers, config) {
                $scope.clearForm(); 
                $scope.getAll(); 
            }).error(function (data, status, headers, config) { console.log("Unable to Update data!"); });
        }
    };

    $scope.deleteField = function (id, field_type, field_value) { 
        if (field_type == 'Image') {
            $http.post('/api/fielddelete', { 'id' : id, 'field_type' : field_type, 'field_value' : field_value })
            .success(function (data, status, headers, config) { $scope.getAll(); })
            .error(function (data, status, headers, config) { $scope.getAll(); });
        } 
        else if (field_type == 'Audio') {
            $http.post('/api/fielddelete', { 'id' : id, 'field_type' : field_type, 'field_value' : field_value })
            .success(function (data, status, headers, config) { $scope.getAll(); })
            .error(function (data, status, headers, config) { $scope.getAll(); });
        } 
        else if (field_type == 'Video') {
            $http.post('/api/fielddelete', { 'id' : id, 'field_type' : field_type, 'field_value' : field_value })
            .success(function (data, status, headers, config) { $scope.getAll(); })
            .error(function (data, status, headers, config) { $scope.getAll(); });
        } 
        else {
            $http.post('/api/fielddelete', { 'id' : id })
            .success(function (data, status, headers, config) { $scope.getAll(); })
            .error(function (data, status, headers, config) { $scope.getAll(); });
        }
    };
}]);

pageCTRL.controller('pageCTRL', function ($scope, $http) {
    
    $scope.createmodal = $scope.updatemodal = false;
    
    $scope.showCreateForm = function () {
        $scope.clearForm();
        $scope.createmodal = true;
        $scope.updatemodal = false;
    };

    $scope.clearForm = function () {
        $scope.id = $scope.page_name = $scope.page_file = $scope.file_content = "";
        $scope.createmodal = $scope.updatemodal = false;
    };
     
    $scope.getAll = function () { 
        $http.get("api/pagelist")
        .success(function (response) {
            if (response.error === 2) { $scope.statustext = "There are currently no pages available!"; } else {
                $scope.pages = response.pages;  
                $scope.statustext = "";
            }
        }).error(function (data, status, headers, config) { $scope.statustext = "Error fetching data (database connection?)"; });
    };

    $scope.readOne = function (id) { 
        $scope.clearForm();  
        $scope.createmodal = false;
        $scope.updatemodal = true;
        
        $http.get('api/pagelist/' + id) 
        .success(function (file_data, status, headers, config) { $scope.file_content = file_data.file_data.file; })
        .error(function (data, status, headers, config) { console.log("Error: File Unretrievable!"); });
        
        $http.get('api/pagelist/' + id) 
        .success(function (data, status, headers, config) { 
            $scope.id = data.data.page[0].id; 
            $scope.page_name = data.data.page[0].page_name;
            $scope.page_file = data.data.page[0].page_file;            
        }).error(function (data, status, headers, config) { console.log("Error: Data Unretrievable!"); });
    };
    
    $scope.createPage = function () { 
        $http.post('/api/pageinsert', { 'page_name' : $scope.page_name, 'page_file' : $scope.page_file })
        .success(function (data, status, headers, config) {        
            $scope.clearForm();                
            $scope.getAll(); 
        }).error(function (data, status, headers, config) { console.log("Error: Unable to create!"); });
    };
    
    $scope.updatePage = function () { 
        $http.put('/api/pageupdate', { 'id' : $scope.id, 'page_name' : $scope.page_name, 'page_file' : $scope.page_file, 'file_content' : $scope.file_content })
        .success(function (data, status, headers, config) { 
            $scope.clearForm();
            $scope.getAll(); 
        }).error(function (data, status, headers, config) { console.log("Error: Unable to update"); });
    };
    
    $scope.deletePage = function (id, page_name) {
        $http.post('/api/pagedelete', { 'id' : id, 'page_name' : page_name })
        .success(function (data, status, headers, config) { $scope.getAll(); })
        .error(function (data, status, headers, config) { $scope.getAll(); });
    };
});

/* FRONTEND CONTROLLER */

frontendCTRL.controller('frontendCTRL', function($scope, $http, $rootScope) {
    $scope.getAll = function () { 
        $http.get("api/fieldlist")
        .success(function (response) { 
            response.error === 2 ? console.log("No Data") : $scope.fields = response.fields; 
            angular.forEach($scope.fields, function (value, index) {
                /*************************************************
                * Title: How to add Dynamic Scope variables to a for loop in angularjs? source code
                * Author: Tang, Q
                * Date: 2015
                * Code version: Not Specified 
                * Availability: https://stackoverflow.com/questions/31795320/how-to-add-dynamic-scope-variables-to-a-for-loop-in-angularjs
                *************************************************/                
                $rootScope[$scope.fields[index].field_name] = { 
                    'value' : $scope.fields[index].field_value, 
                    'type' : $scope.fields[index].field_type
                };
            });
        }).error(function (data, status, headers, config) { console.log("Error fetching data (database connection?)"); });
        $http.get("api/pagelist")
        .success(function (response) {
            response.error === 2 ? console.log("No Data") : $scope.pages = response.pages; 
            angular.forEach($scope.pages, function (value, index) {
                $rootScope[$scope.pages[index].page_name.replace(/-/g,"_")] = { 
                    'name' : $scope.pages[index].page_name.replace(/-/g," "),
                    'noext' : $scope.pages[index].page_name.replace(/ /g,"-"),
                    'file' : $scope.pages[index].page_file
                };
            });
        }).error(function (data, status, headers, config) { $scope.statustext = "Error fetching data (database connection?)"; });
    };
});