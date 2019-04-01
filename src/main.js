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
     condition = $('#condition').val();
     doctorName = $('#doctorName').val();

     showResults();
  });

  function filterByCondition(doctors, condition) {
    let matchingDoctors = [];
    for (let i = 0 ; i < doctors.length ; i++) {
      let doctorSpecialty = doctors[i].specialties.description;
      //if (doctorSpecialty.toLowerCase().contains(condition.toLowerCase())) {
        matchingDoctors.push(doctors[i]);
      //}
    }
    console.log(`doctors matching condition: ${matchingDoctors.length}`);
    return matchingDoctors;
  }

  function showResults() {
    let doctorLookup = new DoctorLookup();
    console.log("executing 'getDoctor' API method");
    let promise1 = doctorLookup.getDoctor(condition);

    promise1.then(function(response) {
      console.log("response received from 'getDoctor' API method");
      console.log("parse response");
      let body = JSON.parse(response);
      console.log("response parsed successfully:");
      let doctors = body.data;
      doctors = filterByCondition(doctors, condition);
      let html = '';

      for (let i = 0 ; i < doctors.length ; i++) {
        html += getDoctorDetailHtml(doctors[i]);
      }
      console.log(html);
      $('#matchingDoctors').html(html);

    });
  }

  function getDoctorDetailHtml(doctor) {
    let practice = doctor.practices[0];
    let html =
    `<div>
      <div> ${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}</div>
      <div>${practice.name}</div>
      <div>${practice.visit_address.street}<br/>
        ${practice.visit_address.city}, ${practice.visit_address.state} ${practice.visit_address.zip}
      </div>
        <div>Accepts new patients:${practice.accepts_new_patients}</div>

        <div>Website: <a href="${practice.website}">${practice.name}</a>
        </div>
    </div>`;
    // <p>${doctor.profile.dynamic_bio}</p>
    // <table>
    //     <tr>
    //
    //         <td><a href="${data.attribution_url}" target="_new">${data.attribution_url}</a></td>
    //     </tr>
    //     <tr>
    //         <th>Picture</th>
    //         <td><img src='${doctor.profile.image_url}'></img></td>
    //     </tr>
    //     <tr>
    //         <th>Specialties</th>
    //         <td>
    //         ${doctor.specialties}
    //         ${name}<br>
    //         ${doctor.specialties}
    //         </td>
    //     </tr>
    // </table>`;

    return html;
  }
});
