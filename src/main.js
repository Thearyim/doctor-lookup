import 'bootstrap';
import './styles.css';
import $ from 'jquery';
import DoctorLookup from "./doctor.js"
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  let condition = "";
  let doctorName = "";

  $('#searchForm').click(function(event) {
    event.preventDefault();
    condition = $('#condition').val();
    doctorName = $('#doctorName').val();

    showResults();
});

  function showResults() {
    let doctorLookup = new DoctorLookup();
    let promise1 = doctorLookup.getDoctor(condition);
    let promise2 = doctorLookup.getDoctor(doctorName);

    promise1.then(function(response) {
      let body = JSON.parse(response);
      doctorByCondition = body.main.profile.specialties;
    });

    promise2.then(function(response) {
      let body = JSON.parse(response);
      doctorByName = body.main.profile;
    });

    Promise.all([promise1, promise2]).then(function() {
      $("#doctorByCondition").text(`Here is the list of doctors with specialty to treat your condition` + doctorByCondition);
      $("#doctorByName").text("Here is the list of doctors with name you are searching" + doctorByName);
      });
  }
});
