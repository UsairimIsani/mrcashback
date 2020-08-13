(function() {

    angular.module('starter.services', ['azure-mobile-service.module'])
        .factory('cityazureapiservice', ['Azureservice', cityazureapiservice]);

    function cityazureapiservice(Azureservice) {
        return {
            getActiveOffers: getActiveOffers,
            rateOffer: rateOffer,
            loginWithFacebook: loginWithFacebook,
            getLocations: getLocations,
            getLocationById: getLocationsById,
            getUser: getUser,
            getCode: getCode,
            getUserOffer: getUserOffer,
            getOfferById: getOfferById,
            confirmArrival: confirmArrival,
            logout: logout,
            getLongLivedToken: getLongLivedToken,
            getPoints: getPoints,
            removeUserOffer: removeUserOffer,
            postShared: postShared,
            getTimeToStay: getTimeToStay,
            completeOffer: completeOffer,
            loginWithFacebookWithoutToken: loginWithFacebookWithoutToken,
            getUploadToken: getUploadToken,
            insert1: insert1,
            getTotal: getTotal,
            signup: signupEmail,
            getBonuri: getBonuri,
            updateBon: updateBon,
            loginEmail: loginEmail
        };

        function signupEmail(member) {
            //LoaderService.showLoadingSpinner();
            return Azureservice.invokeApi("signup", {
                    method: "Post",
                    body: {
                        members: {
                            password: member.password,
                            email: member.email,
                            first_name: member.first_name,
                            last_name: member.last_name
                        }
                    }
                })
                .then(function(data) {
                    console.log("login response ", data);
                    var crntUser = {
                        userId: data.userId,
                        mobileServiceAuthenticationToken: data.token
                    };
                    Azureservice.setCurrentUser(crntUser)
                    return data;
                });

        }

                      function loginEmail(member) {
            //LoaderService.showLoadingSpinner();
            return Azureservice.invokeApi("login", {
                    method: "Post",
                    body: {
                        members: {
                            password: member.password,
                            email: member.email
                        }
                    }
                })
                .then(function(data) {
                    console.log("login response ", data);
                    var crntUser = {
                        userId: data.userId,
                        mobileServiceAuthenticationToken: data.token
                    };
                    Azureservice.setCurrentUser(crntUser)
                    return data;
                });

        }

        function getUploadToken(filename) {
            return Azureservice.invokeApi("getUploadToken", {
                    method: "Post",
                    body: {
                        location: "mrcashback",
                        filename: filename
                    }
                })
                .then(function(data) {
                    return data;
                });
        }

        function insert1(filename) {
            var userId = getUser();

            return Azureservice.insert('bon', {
                filename: filename,
                value: 0
            });
        }

        function getTotal() {
            return Azureservice.invokeApi("getTotal", {
                    method: "Get",
                    body: {}
                })
                .then(function(data) {
                    return data;
                }, onError);
        }

        function getBonuri() {

            var paramsq = {
                criteria: function(params) {
                    return this.value == 0;
                },
                params: ["a"]
            };

            return Azureservice.query("bon",paramsq)
                .then(function(data) {
                    return data;
                }, onError);
        }

        function updateBon(bon) {
            return Azureservice.update("bon", bon)
                .then(function(data) {
                    return data;
                }, onError);
        }

        function getActiveOffers() {
            // get the active offers from the server
            // returns an angular promise

            var curentTime = new Date();

            // the criteria for the offer to be active is that the startat < currentTime
            // and endat > currentTime 
            var paramsq = {
                criteria: function(params) {
                    return this.startat < params[0] && this.endat > params[0];
                },
                params: [curentTime]
            };

            // returns the angular promise!
            return Azureservice.query("Offer", paramsq)
                .then(function(data) {
                    // returns the data in the promise
                    return data;
                });
        }

        function rateOffer(offer_id, rate) {
            // set the rating for the offer_id with rate parameter
            // calls the "rate" api from the azure backend
            return Azureservice.invokeApi("rate", {
                    method: "Post",
                    body: {
                        offer_id: offer_id,
                        rating: rate
                    }
                })
                .then(function(data) {
                    return data;
                }, onError);
        }

        function getCode(offer_id) {
            // get the code for the current user and
            // reservers the offer for him
            return Azureservice.invokeApi("getcode", {
                    method: "Post",
                    body: {
                        offer_id: offer_id
                    }
                })
                .then(function(data) {
                    return data;
                });
        }

        function getUserOffer() {
            // get user offer from last hour     
            // if he has none, it returns an empty array
            return Azureservice.invokeApi("getuseroffer", {
                    method: "Post",
                    body: {}
                })
                .then(function(data) {
                    return data;
                }, onError);
        }

        function loginWithFacebook(token) {
            // login the user with a token for facebook
            return Azureservice.login("facebook", {
                "access_token": token
            });
        }

        function loginWithFacebookWithoutToken() {
            // login the user with a token for facebook
            return Azureservice.login("facebook");
        }

        function getLocations() {
            // gets the stores data from the backend
            return Azureservice.query("Location")
                .then(function(data) {
                    return data;
                }, onError);
        }

        function getLocationsById(id) {
            // gets the data for one store with the specific id
            return Azureservice.getById("Location", id)
                .then(function(data) {
                    return data;
                }, onError);
        }

        function getUser() {
            // returns the current user data that is stored in
            // azure serv. client
            // doesn't return a promise!
            return Azureservice.getCurrentUser();
        }

        function getOfferById(offerId) {
            // gets the data for one offer with the specific id
            return Azureservice.getById("Offer", offerId)
                .then(function(data) {
                    return data;
                }, onError);
        }

        function onError(error) {
            //in general, display user friendly error message
            console.log(error);
        }


        function confirmArrival() {
            return Azureservice.invokeApi("confirmarrival", {
                    method: "Post",
                    body: {}
                })
                .then(function(data) {
                    return data;
                }, onError);
        }

        function completeOffer() {
            return Azureservice.invokeApi("completeOffer", {
                    method: "Post",
                    body: {}
                })
                .then(function(data) {
                    return data;
                }, onError);
        }

        function logout() {
            Azureservice.logout();

        }

        function getLongLivedToken() {
            return Azureservice.invokeApi("getlongtoken", {
                    method: "Get",
                    body: {}
                })
                .then(function(data) {
                    return data;
                }, onError);
        }

        function getPoints() {
            return Azureservice.invokeApi("getpoints", {
                    method: "Get",
                    body: {}
                })
                .then(function(data) {
                    return data;
                }, onError);
        }

        function removeUserOffer() {
            getUserOffer().then(function(data) {
                Azureservice.del('TakenOffer', {
                    id: data.offer.id
                }).then(function(success) {
                    alert('offer removed');
                })
            })
        }

        function postShared() {
            return Azureservice.invokeApi("usershared", {
                    method: "Post",
                    body: {}
                })
                .then(function(data) {
                    return data;
                }, onError);
        }

        function getTimeToStay() {
            return Azureservice.invokeApi("waitingtime", {
                    method: "Get",
                    body: {}
                })
                .then(function(data) {
                    return data;
                });
        }
    }
})();