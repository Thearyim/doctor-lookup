import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles.css';
import $ from 'jquery';
import DoctorLookup from "./doctor.js";


$(document).ready(function() {
  let condition;
  let doctorName;

  $('#searchForm').submit(function(event) {
    event.preventDefault();
    $('#matchingDoctors').html("");
     condition = $('#condition').val();
     doctorName = $('#doctorName').val();

     showResults();
  });

  function showResults() {
    let doctorLookup = new DoctorLookup();
    let promise1 = doctorLookup.getDoctors();

    promise1.then(function(response) {
      let body = JSON.parse(response);
      let doctors = body.data;
      if (condition != "") {
        doctors = doctorLookup.filterByCondition(doctors, condition);
      }
      if (doctorName != "") {
        doctors = doctorLookup.filterByName(doctors, doctorName);
      }

      let html = '';
      if (doctors.length == 0) {
        html = '<div>There are no doctors that match your search criteria.</div>';
      }
      else {
        for (let i = 0 ; i < doctors.length ; i++) {
          html += getDoctorDetailHtml(doctors[i]);
        }
      }

      $('#matchingDoctors').html(html);
    });
  }

  function getDoctorDetailHtml(doctor) {
    let practice = doctor.practices[0];
    let html =
    `<div>
      <div> ${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}</div>
      <div><img src='${doctor.profile.image_url}'></img></div>
      <div>${practice.name}</div>
      <div>${doctor.specialties[0].actor}</div>
      <div>${practice.visit_address.street}<br/>
        ${practice.visit_address.city}, ${practice.visit_address.state} ${practice.visit_address.zip}
      </div>
        <div>Accepts new patients:${practice.accepts_new_patients}</div>

        <div>Website: <a href="${practice.website}">${practice.name}</a>
        </div>
    </div>`;

    return html;
  }
});
