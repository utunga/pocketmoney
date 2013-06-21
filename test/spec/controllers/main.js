'use strict';

describe('Controller: MainCtrl', function () {

  // Utils
  // Apply "sanitizeRestangularOne" function to an array of items

  function sanitizeRestangularAll(items) {
    var all = _.map(items, function (item) {
      return sanitizeRestangularOne(item);
    });
    return sanitizeRestangularOne(all);
  }

  // Remove all Restangular/AngularJS added methods in order to use Jasmine toEqual between the retrieve resource and the model

  function sanitizeRestangularOne(item) {
    return _.omit(item, "route", "parentResource", "getList", "get", "post", "put", "remove", "head", "trace", "options", "patch",
      "$get", "$save", "$query", "$remove", "$delete", "$put", "$post", "$head", "$trace", "$options", "$patch",
      "$then", "$resolved", "restangularCollection", "customOperation", "customGET", "customPOST",
      "customPUT", "customDELETE", "customGETLIST", "$getList", "$resolved", "restangularCollection", "one", "all", "doGET", "doPOST",
      "doPUT", "doDELETE", "doGETLIST", "addRestangularMethod", "getRestangularUrl");
  }

 
  

  // Initialize the controller with a mock scope and mock return data
  // beforeEach(inject(function ($controller, $rootScope) {
  //   scope = $rootScope.$new();
  //   MainCtrl = $controller('MainCtrl', {
  //     $scope: scope
  //   });
  // }));

  var fakeAccounts = 
  [
    {
      name: "Baxter",
      id: "id_baxter"
    },
    {
      name: "Ezra",
      id: "id_ezra"
    },
    {
      name: "Noah",
      id: "id_noah"
    }
  ];

  var baxterData =
  [
    {
      accountId: "id_baxter",
      amt: 10,
      date: "",
      type: "auto",
      id: "baxter_1"
    },
    {
      accountId: "id_baxter",
      amt: 100,
      date: "",
      type: "init",
      id: "baxter_0"
    }
  ];

  var ezraData =
  [
    {
      accountId: "id_ezra",
      amt: -200,
      date: "",
      type: "auto",
      id: "ezra_1"
    },
    {
      accountId: "id_ezra",
      amt: 10,
      date: "",
      type: "init",
      id: "ezra_0"
    }
  ]

  var noahData =
  [
    {
      accountId: "id_noah",
      amt: -200,
      date: "",
      type: "auto",
      id: "noah_1"
    },
    {
      accountId: "id_noah",
      amt: 10,
      date: "",
      type: "init",
      id: "noah_0"
    }
  ]

  beforeEach(module('restangular'));
  // load the controller's module
  beforeEach(module('ang4App'));
  // testing controller
  
  var MainCtrl,
    scope,
    httpBackend,
    restangular;

  beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, _Restangular_) {
    httpBackend = _$httpBackend_;
    restangular = _Restangular_;
    scope = $rootScope.$new();
  
    httpBackend.expectGET('http://localhost:2403/accounts')
               .respond(fakeAccounts);

    httpBackend.expectGET('http://localhost:2403/entries?accountId=id_baxter')
               .respond(baxterData);  

    httpBackend.expectGET('http://localhost:2403/entries?accountId=id_ezra')
               .respond(ezraData);  

    httpBackend.expectGET('http://localhost:2403/entries?accountId=id_noah')
               .respond(noahData);  

    MainCtrl = $controller('MainCtrl', {
        $httpBackend: httpBackend,
        $scope: scope,
        Restangular: restangular
      });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should get the mock profile list via REST ', function () {
    var accounts = scope.accounts;
    var resolvedValue;
    accounts.then(function (result) {
      resolvedValue = result;
    });
    httpBackend.flush();
    expect(sanitizeRestangularAll(resolvedValue)[0].name).toEqual('Baxter');
    //console.log(resolvedValue);
    expect(resolvedValue.length).toBe(3);
  });




  // it('should attach a list of accounts to the scope', function () {
  //   expect(scope.accounts.length).toBe(3);
  // });
});
