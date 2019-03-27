var link = document.querySelectorAll('a');
var surbrillance = document.createElement('span');
surbrillance.classList.add('surbrillance');

document.body.append(surbrillance);

function lien() {
	var coordo = this.getBoundingClientRect();
	var valeur = {
		width: coordo.width,
		height: coordo.height,
		top: coordo.top + window.scrollY,
		left: coordo.left + window.scrollX
	};
	surbrillance.style.width = `${valeur.width}px`;
	surbrillance.style.height = `${valeur.height}px`;
	surbrillance.style.padding = '5px 10px ';
	surbrillance.style.transform = `translate(${valeur.left - 10}px, ${valeur.top - 5}px)`;
}

link.forEach((a) => a.addEventListener('mouseenter', lien));
link.forEach((a) =>
	a.addEventListener('click', function() {
		alert("hehe c'est juste décoratif");
	})
);
getTodo();

/*
$(function () {
    $('#submit').click(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: 'donnes.php',
            dataType: 'json',
            data: {
                userID: userID
            },
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                $('#todo').html(JSON.stringify(response));
                $('#jour').html(JSON.stringify(response));
                alert("ok");
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});*/
var tableElement = document.getElementById('list');

$('#submit').click(function(event) {
	var todo = $('#todo').val();
	var jour = $('#jour').val();
	$.ajax({
		url: 'donnes.php',
		data: {
			todo: todo,
			jour: jour
		},
		success: function(data) {
			tableElement.innerHTML = '';
			getTodo();
		}
	});
});

function getTodo() {
	$.ajax({
		url: 'display_to_do.php',
		success: function(data) {
			data = JSON.parse(data);

			// création du header du tableau

			var trHeader = document.createElement('tr');
			var firstTh = document.createElement('th');
			firstTh.innerHTML = 'id';
			var secondTh = document.createElement('th');
			secondTh.innerHTML = 'task';
			var thirdTh = document.createElement('th');
			thirdTh.innerHTML = 'date';
			var fourthTh = document.createElement('th');
			fourthTh.innerHTML = 'action';

			trHeader.appendChild(firstTh);
			trHeader.appendChild(secondTh);
			trHeader.appendChild(thirdTh);
			trHeader.appendChild(fourthTh);
			tableElement.append(trHeader);

			for (var i = 0; i < data.length; i++) {
				var collumn = document.createElement('tr');
				var firsttd = document.createElement('td');
				firsttd.className += 'id';
				firsttd.innerHTML = data[i].id;
				var secondtd = document.createElement('td');
				secondtd.innerHTML = data[i].name;
				var thirdtd = document.createElement('td');
				thirdtd.innerHTML = data[i].date;
				var fourthtd = document.createElement('td');
				fourthtd.className += 'suppr';
				fourthtd.setAttribute('data-id', data[i].id);

				fourthtd.innerHTML = '<i class="fas fa-times "></i>';

				collumn.appendChild(firsttd);
				collumn.appendChild(secondtd);
				collumn.appendChild(thirdtd);
				collumn.appendChild(fourthtd);
				tableElement.append(collumn);
			}
			var suppr = document.getElementsByClassName('suppr');

			for (i = 0; i < suppr.length; i++) {
				suppr[i].addEventListener('click', function() {
					var id = $(this).data('id');
					$.ajax({
						url: 'donnes.php',
						data: {
							supprimer: id
						},
						success: function(data) {
							tableElement.innerHTML = '';
							getTodo();
						}
					});
				});
			}
		}
	});
}
