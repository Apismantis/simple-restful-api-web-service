var stumsapp = angular.module('myApp', []);

stumsapp.controller('StudentCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.students = [];
    $scope.student = {};
    var sId;

    // GET all students
    $http.get("/students")
        .then(function(response) {
            $scope.students = response.data;
        });

    // POST new student to server
    $scope.addNewStudent = function() {

        if ($scope.studentId == null || $scope.studentName == null || $scope.studentClass == null) {
            alert("Please fill out all field!");
            return;
        }

        var data = {
            id: $scope.studentId,
            name: $scope.studentName,
            class: $scope.studentClass
        };

        console.log(data);

        $http.post("http://localhost:8080/students", data)
            .then(function(response) {
                $scope.students = response.data;
            });
    };

    // binding student data to dialog
    $scope.bindingStudent = function($index) {
        sId = $index;
        $scope.student = JSON.parse(JSON.stringify($scope.students[sId]));
    };

    // PUT student to server
    $scope.updateStudent = function() {

        var data = $scope.student;

        $http.put("http://localhost:8080/students/" + sId, data)
            .then(function(response) {
                $scope.$apply(function() {
                    $scope.students = response.data;
                });
            });

        $('#EditDialog').modal("hide");
        location.reload();
    };

    // DELETE student
    $scope.deleteStudent = function($index) {

        var id = $index;
        console.log(id);

        $http.delete("http://localhost:8080/students/" + id)
            .then(function(response) {
                $scope.$apply(function() {
                    $scope.students = response.data;
                });
            });

        location.reload();
    };
}]);