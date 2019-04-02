export default class DoctorLookup {
    getDoctors() {
        return new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();
          let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=45&user_key=${process.env.exports.apiKey}`

          request.onload = function() {
            if (this.status === 200) {
              resolve(request.response);
            } else {
              reject(Error(request.statusText));
            }
          }

          request.open("GET", url, true);
          request.send();
        });
    }

    filterByCondition(doctors, condition) {
      let matchingDoctors = [];
      for (let i = 0 ; i < doctors.length ; i++) {
        let doctorSpecialty = doctors[i].specialties[0].description;
        let specialtyTerms = this.splitTerms(doctorSpecialty);
        let conditionTerms = this.splitTerms(condition);
        for (let j = 0 ; j < conditionTerms.length ; j++) {
          if (specialtyTerms.includes(conditionTerms[j])) {
            matchingDoctors.push(doctors[i]);
            break;
          }
        }
      }
      //console.log(`doctors matching condition: ${matchingDoctors.length}`);
      return matchingDoctors;
    }

   filterByName(doctors, name) {
      let matchingDoctors = [];
      for (let i = 0 ; i < doctors.length ; i++) {
        let doctorFirstName = doctors[i].profile.first_name;
        let doctorLastName = doctors[i].profile.last_name;
        let doctorNameTerms = this.splitTerms(`${doctorFirstName} ${doctorLastName}`);
        let nameTerms = this.splitTerms(name);
        for (let j = 0 ; j < nameTerms.length ; j++) {
          if (doctorNameTerms.includes(nameTerms[j])) {
            matchingDoctors.push(doctors[i]);
            break;
          }
        }

      }
      //console.log(`doctors matching Name: ${matchingDoctors.length}`);
      return matchingDoctors;
    }

    splitTerms(text) {
      let terms = [];
      let individualTerms = text.split(' ');
      for (let i = 0 ; i < individualTerms.length ; i++) {
        terms.push(individualTerms[i].toLowerCase());
      }
      return terms;
    }
  }
