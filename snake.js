$(document).ready(function() {
	var grid = new Array(40);

	for(var i = 0; i < grid.length; i++) {
		grid[i] = new Array(40);
	}

	for(var i = 0; i < grid.length; i++) {
		for(var j = 0; j < grid.length; j++) {
			grid[i][j] = "";
		}
	}

	render(grid);

});

function render(grid) {
	for(var i = 0; i < grid.length; i++) {
		for(var j = 0; j < grid.length; j++) {
			$("#grid").append('<div id="pt:'+ i + '-' + j +'"></div>');
		}
	}
} 

