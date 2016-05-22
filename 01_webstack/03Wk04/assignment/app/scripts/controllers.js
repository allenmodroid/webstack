'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.showMenu = false;
    $scope.message = "Loading ...";

    // Return all dishes from db
    $scope.dishes = menuFactory.getDishes().query(
        function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
    });

    $scope.select = function(setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function(checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };
}])

.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };

    var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {

    $scope.sendFeedback = function() {

        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        } else {
            $scope.invalidChannelSelection = false;

            // Save to db
            feedbackFactory.sendFeedback().save($scope.feedback);
              
            // Housekeeping ========================================
            $scope.feedbackForm.$setPristine();
            $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "", tel:"", comments:""};
        }
    };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
    
    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
    .$promise.then(
        function(response){
            $scope.dish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );

}])

.controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

    // Set rating to 5 by default
    $scope.comment = { rating: 5, comment: "", author: "", date: "" };

    $scope.submitComment = function() {

        // Initiliaze date object
        $scope.comment.date = new Date().toISOString();

        // Add comment to dish object
        $scope.dish.comments.push($scope.comment);

        // Save to db
        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

        // Housekeeping ========================================
        $scope.commentForm.$setPristine();
        $scope.comment = { rating: 5, comment: "", author: "", date: "" };
    };
}])

// implement the IndexController and About Controller here
.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

    $scope.showLeader = false;
    $scope.message = "Loading ...";

    // Return all leaders from db
    $scope.leaders = corporateFactory.getLeader().query(
        function(response) {
                $scope.leaders = response;
                $scope.showLeader = true;
            },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
    });

}])

.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

    $scope.showDish = false;
    $scope.showPromo = false;
    $scope.showLeader = false;
    $scope.message = "Loading ...";
  
    // Return dish from db
    $scope.homedish = menuFactory.getDishes().get({id:0})
    .$promise.then(
        function(response){
            $scope.homedish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );
   
    // Return promotion from db
    $scope.homepromo = menuFactory.getPromotions().get({id:0})
    .$promise.then(
        function(response){
            $scope.homepromo = response;
            $scope.showPromo = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );

    // Return leader from db
    $scope.homeleader = corporateFactory.getLeader().get({id:3})
    .$promise.then(
        function(response){
            $scope.homeleader = response;
            $scope.showLeader = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );

}])

;
