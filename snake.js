$(document).ready(function() {
	grid = makeGrid();
	render();
	$('#pt-20-20').addClass('snake');

	snake = { 
		position: [20, 20],
		direction: 'r',
		size: 1
	};

	food = {
		position: "",
	};

	spawn_food();

	current_snake = [];
	current_snake.push(snake.position);

	$(document).keydown(function(event) {
		switch(event.which) {
			case 37:
				if (snake.direction == 'r' && snake.size != 1) { break; }
				snake.direction = 'l';
				break;	
			case 38:
				if (snake.direction == 'd' && snake.size != 1) { break; }
				snake.direction = 'u';
				break;
			case 39:
				if (snake.direction == 'l' && snake.size != 1) { break; }
				snake.direction = 'r';
				break;
			case 40:
				if (snake.direction == 'u' && snake.size != 1) { break; }
				snake.direction = 'd';
		}
	});


	turn = setInterval(function() {
		gameOver() ? clearInterval(turn) : move();
		if(snake.position[0] == food.position[0] && snake.position[1] == food.position[1]) {
			grid[food.position[0]][food.position[1]].toggleClass('food');
			snake.size += 1;
			spawn_food();
		}
	}, 100);


});

function gameOver() {
	if((snake.position[0] <= 0 && snake.direction == 'u') || (snake.position[1] <= 0 && snake.direction == 'l')
		 || (snake.position[0] >= 39 && snake.direction == 'd') || (snake.position[1] >= 39 && snake.direction == 'r')) {
		console.log("game over");
		return true;
	}
}

function move() {
	current_snake.slice(current_snake.length - snake.size, current_snake.length).forEach(
		function(position) {
			grid[position[0]][position[1]].removeClass('snake');
		}
	);

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
	current_snake.push(snake.position);
	
	current_snake.slice(current_snake.length - snake.size, current_snake.length).forEach(
		function(position) {
			grid[position[0]][position[1]].addClass('snake');
		}
	);
	
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

function render() {
	$('#grid').empty();
	for(var i = 0; i < grid.length; i++) {
		for(var j = 0; j < grid.length; j++) {
			$('#grid').append('<div id="pt-' + i + '-' + j + '"></div>');
			grid[i][j] = $('#pt-' + i + '-' + j + '');
		}
	}
} 

function spawn_food() {
	var x = randInt(0, 39);
	var y = randInt(0, 39);
	if(grid[x][y].className != 'snake') {
		food.position = [x, y];
		food.eaten = false;
		grid[x][y].toggleClass('food');
	}
	else {
		food_position();
	}
}


function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

