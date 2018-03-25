$(document).ready(function(){
     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD-6sl_xflv09U6p-vhZFA3vPJHXKextYU",
    authDomain: "api-homework.firebaseapp.com",
    databaseURL: "https://api-homework.firebaseio.com",
    projectId: "api-homework",
    storageBucket: "",
    messagingSenderId: "1051710796553"
  };
    firebase.initializeApp(config);
 
   var database = firebase.database();
 
   $("#submit").on('click', function(){
     event.preventDefault()
     var trainName = $("#trainName").val().trim();
     var destination = $("#destination").val().trim();
     var first = $("#first").val().trim();
     var frequency = $("#frequency").val().trim();
     console.log(trainName);
     console.log(destination);
     console.log(first);
     console.log(frequency);
     
     
 
     database.ref().push({
       trainName: trainName,
       destination: destination,
       first: first,
       frequency: frequency
     });

    $("#trainName").val("");
    $("#destination").val("");
    $("#first").val("");
    $("#frequency").val("");

   })


   database.ref().on("child_added",function(childSnapshot){
     var trainName = childSnapshot.val().trainName;
     var dest = childSnapshot.val().destination;
     var first = childSnapshot.val().first;
     var frequency = childSnapshot.val().frequency;
     
     
     var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
     console.log(firstTimeConverted);
    
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
     
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);
     
     var tRemainder = diffTime % frequency;
     console.log(tRemainder);
     
     var tMinutesTillTrain = frequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     var next = moment(nextTrain).format("hh:mm");

     $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" +
     frequency + "</td><td>" + next + "</td><td>" + tMinutesTillTrain + "</td><tr>");
   })
 })