$(document).ready(function() {
	var grid = makeGrid();
	render(grid);
	$('#pt-20-20').addClass('snake');

	var snake = { 
		position: [20, 20],
		direction: 'r',
	};


	var current_snake = [];
	current_snake.push(snake.position);

	$(document).keydown(function(event) {
		switch(event.which) {
			case 37:
				if(snake.direction != 'r') {
					snake.direction = 'l';
					break;
				}
				break;	
			case 38:
				if(snake.direction != 'd') {
					snake.direction = 'u';
					break;
				}
				break;
			case 39:
				if(snake.direction != 'l') {
					snake.direction = 'r';
					break;
				}
				break;
			case 40:
				if(snake.direction != 'u') {
					snake.direction = 'd';
				}
		}
	});


	turn = setInterval(function() {
		gameOver(snake);
		move(snake);
		current_snake.push(snake.position);	
	}, 100);


});

function gameOver(snake) {
	if(snake.position[0] < 0 || snake.position[1] < 0 || snake.position[0] > 39 || snake.position[1] > 39) {
		console.log("game over");
		clearInterval(turn);
	}
}

function move(snake) {
	$('#pt-' + snake.position[0] + '-' + snake.position[1] + '').removeClass('snake');
	switch(snake.direction) {
		case 'l':
			snake.position = [snake.position[0], (snake.position[1] - 1)];
			break;
		case 'u':
			snake.position = [(snake.position[0] - 1), snake.position[1]];
			break;
		case 'r':
			snake.position = [snake.position[0], (snake.position[1] + 1)];
			break;
		case 'd':
			snake.position = [(snake.position[0] + 1), snake.position[1]];
	}
	$('#pt-' + snake.position[0] + '-' + snake.position[1] + '').addClass('snake');
}


function makeGrid() {
	var grid = new Array(40);

	for(var i = 0; i < grid.length; i++) {
		grid[i] = new Array(40);
	}

	for(var i = 0; i < grid.length; i++) {
		for(var j = 0; j < grid.length; j++) {
			grid[i][j] = "";
		}
	}
	return grid;
}

function render(grid) {
	$('#grid').empty();
	for(var i = 0; i < grid.length; i++) {
		for(var j = 0; j < grid.length; j++) {
			$('#grid').append('<div id="pt-' + i + '-' + j + '"></div>');
		}
	}
} 


function randInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

