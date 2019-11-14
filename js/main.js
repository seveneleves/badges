window.onload = function() {

  var badges = document.querySelector('.badge-container');
  var url = [];

  for (var i = 0; i < badges.children.length; i++) {
    url.push(badges.children[i].id)
  }

  function makeRequests() {

    url.forEach(function(e) {

      var requestURL = 'https://ahen4life.github.io/certificates/' + e + '.json';
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'text';
      request.send();

      request.onload = function() {
        var certificateText = request.response;
        var certificate = JSON.parse(certificateText);

        if (certificate.validity == false) {
          document.getElementById(e).classList.add('badge-deactivated');
          // document.getElementById(e).style.pointerEvents = 'none';
          // document.getElementById(e).classList.add('not-selectable');
        }

      }

    });

  }

  makeRequests();

}

function modal(e) {

  document.getElementById('modalBox').style.display = 'block';

  document.getElementById('main-content').style.filter = 'blur(4px)';

  document.getElementById('badge-icon').src = 'img/' + e.id + '.png';

  var requestURL = 'https://ahen4life.github.io/certificates/' + e.id + '.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'text';
  request.send();

  request.onload = function() {
    var certificateText = request.response
    var certificate = JSON.parse(certificateText);
    displayData(certificate);
  }

  function displayData(e) {

    document.getElementById('certificate-name').textContent = e.name;
    document.getElementById('certificate-category').textContent = e.category;
    document.getElementById('certificate-description').textContent = e.description;
    document.getElementById('certificate-year').textContent = e.year;
    document.getElementById('certificate-manager').textContent = e.manager;
    document.getElementById('certificate-uo').textContent = e.unit;

    for (var i = 0; i < e.skills.length; i++) {
      document.getElementById('certificate-skill-type-' + i).textContent = e.skills[i].type;
      document.getElementById('certificate-skill-comment-' + i).textContent = e.skills[i].comment;

    }

    document.getElementById('certificate-link').href = requestURL;

    if (e.validity == false) {

      document.getElementById('checkmark').src = 'img/checkmark_false.png';
      document.getElementById('badge-icon').classList.add('badge-deactivated');

    } else {

        document.getElementById('checkmark').src = 'img/checkmark_true.png';

      }

  }

}

document.getElementById('close').addEventListener('click', function(e) {
  document.getElementById('modalBox').style.display = 'none';
  document.getElementById('main-content').style.filter = 'none';
  document.getElementById('badge-icon').classList.remove('badge-deactivated');
})
