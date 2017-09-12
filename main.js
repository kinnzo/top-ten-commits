'use strict';
$(window).load(function() {
	let status = $('#status');
	status.html('Running the Boa Query');
	let json = api.boa.run('top-ten-commits.boa');
	
	let count = 0;
	let labels = [];
	let dataset = [];
	status.html('Preparing Data');
	for(let index in json.out) {
		count++;
		let label =
			$('#table-output-body').append(`<tr><td> ${count} </td> <td> ${index} </td> <td> ${json.out[index]} </td> </tr>`)
			labels.push(index);
		dataset.push(json.out[index]);
	}
	status.html('Creating Chart');
	let chartData = {
			labels: labels,
			datasets: [{
				fillColor: '#ff8080',
				strokeColor: '#bf6060',
				data: dataset
			}]
	}
	status.html('Load Successful');
	$('#loading').hide();
	$('#content').show();
	let canvas = document.createElement('canvas');
	canvas.setAttribute('width', '400px');
	canvas.setAttribute('height', '300px');
	canvas.id = "chart-output";
	$('#content').prepend(canvas);

	let ctx = canvas.getContext('2d');
	new Chart(ctx).Bar(chartData, { 'responsive': true, });
});
