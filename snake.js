	var canvas = document.getElementById('game-area')
	var ctx = canvas.getContext('2d')
	var foodCanvas = document.getElementById('food-area')
	var ftx = foodCanvas.getContext('2d')
	var mazeCanvas = document.getElementById('maze-area')
	var mtx = mazeCanvas.getContext('2d')
	var power = document.getElementById('power-area')
	var ptx = power.getContext('2d')
	var currentScore = document.getElementById('current-score')
	var displayTable = document.getElementById('score-table')
	var gameSettings = document.getElementById('game-settings')
	var snakeBody = []
	var snakeBodyLength = 3
	var levelMazeName
	var gameAction
	var maze = []
	var moveDirection = "right"
	var nextDirection = "right"
	var snakeSpeed = 1
	var powerUPx
	var powerUPy
	var consumedFood = 0
	var temporarySpeedSnake
	var temporarySpeedFunction
	var levelRatio
	var countingDown
	var stopTimeout
	var initialPosition = {
		x: 220,
		y: 220,
	}
	var food = {
		x: 0,
		y: 0,
	}
	var powerUp = {
		x: 0,
		y: 0,
	}
	var oneElementSize = {
		x : 20,
		y: 20
	}
	var score = 0
	var tableScore = []
	
	var mazeFirst = [
		{x:0, y:0}, {x:0, y:20}, {x:0, y:40}, {x:0, y:60}, {x:20, y:0}, {x:40, y:0}, {x:60, y:0},
		{x:0, y:380}, {x:0, y:400}, {x:0, y:420}, {x:0, y:440}, {x:20, y:440}, {x:40, y:440}, {x:60, y:440},
		{x:60, y:440}, {x:380, y:0}, {x:400, y:0}, {x:420, y:0}, {x:440, y:0}, {x:440, y:0}, {x:440, y:20},
		{x:440, y:40}, {x:440, y:60}, {x:380, y:440}, {x:400, y:440}, {x:420, y:440}, {x:440, y:440},
		{x:440, y:440}, {x:440, y:420}, {x:440, y:400}, {x:440, y:380},
	]
	var mazeSecond = [
		{x:0, y:0},{x:0, y:20},{x:0, y:40},{x:0, y:60},{x:0, y:80},{x:0, y:100},{x:0, y:120},
		{x:0, y:140},{x:0, y:160},{x:0, y:180},{x:0, y:200},{x:0, y:220},{x:0, y:240}, {x:0, y:260},
		{x:0, y:280},{x:0, y:300},{x:0, y:320},{x:0, y:340},{x:0, y:360},{x:0, y:380}, {x:0, y:400},
		{x:0, y:420},{x:0, y:440},{x:440, y:0},{x:440, y:20},{x:440, y:40},{x:440, y:60},{x:440, y:80},
		{x:440, y:100},{x:440, y:120},{x:440, y:140},{x:440, y:160},{x:440, y:180},{x:440, y:200},
		{x:440, y:220},{x:440, y:240},{x:440, y:260},{x:440, y:280},{x:440, y:300},{x:440, y:320},
		{x:440, y:340},{x:440, y:360},{x:440, y:380},{x:440, y:400},{x:440, y:420},{x:440, y:440},
		{x:160, y:320},{x:180, y:320},{x:200, y:320},{x:220, y:320},{x:240, y:320},{x:260, y:320},
		{x:280, y:320},{x:300, y:320},{x:320, y:320},{x:160, y:120},{x:180, y:120},{x:200, y:120},
		{x:220, y:120},{x:240, y:120},{x:260, y:120},{x:280, y:120},{x:300, y:120},{x:320, y:120},
	]	
	var mazeThird = [...mazeSecond, {x:160, y:0},{x:180, y:0},{x:200, y:0},{x:220, y:0},{x:240, y:0},{x:260, y:0},{x:280, y:0},{x:300, y:0},{x:320, y:0},
		{x:160, y:440},{x:180, y:440},{x:200, y:440}, {x:220, y:440},{x:240, y:440},{x:260, y:440},{x:280, y:440},{x:300, y:440},{x:320, y:440},		
	]
	var mazeFourth =[...mazeThird, {x:80, y: 60}, {x:100, y: 60}, {x:120, y: 60}, {x:140, y:60}, {x:80, y: 80}, {x:80, y: 100}, {x: 80, y:120},
		{x: 340, y: 60}, {x: 360, y: 60}, {x: 380, y: 60}, {x: 380, y: 80}, {x: 380, y: 80},{x: 380, y: 100},{x: 380, y: 120},
		{x: 80, y:320}, {x: 80, y: 340},{x: 80, y: 360},{x: 80, y: 380}, {x:100, y:380}, {x:120, y:380}, {x:140, y:380},
		{x: 380, y: 320}, {x: 380, y: 340}, {x: 380, y: 360}, {x: 380, y: 380}, {x: 360, y: 380}, {x: 340, y: 380},
	]
	
	var mazeFifth = [...mazeFourth, {x: 80, y: 200}, {x: 80, y:220}, {x: 80, y: 240}, {x: 380, y:200}, {x: 380, y: 220}, {x: 380, y: 240},
		{x: 60, y:0}, {x:80, y:0}, {x:100, y:0}, {x: 60, y:440}, {x:80, y:440}, {x:100, y:440}, {x: 380, y:0}, {x:400, y:0},
		{x: 380, y:440}, {x:400, y:440}, {x:200, y: 180}, {x: 220, y: 180}, {x:240, y:180}, {x:260, y:180}, {x:280, y:180},
		{x:200, y: 260}, {x: 220, y: 260}, {x:240, y:260}, {x:260, y:260}, {x:280, y:260}
	];
		
	
	function prepareMaze() {
		switch(levelMazeName) {
			case 'mazeFirst' :
				maze = [...mazeFirst];
				break;
			case 'mazeSecond' :
				maze = [...mazeSecond];
				break;
			case 'mazeThird' :
				maze = [...mazeThird]
				break;
			case 'mazeFourth' :
				maze = [...mazeFourth];
				break;
			case 'mazeFifth':
				maze = [...mazeFifth]
				break;
			default:
				break;
		}
		
	}
	
	
	function drawSingleElement(x,y, context) {
		context.fillRect(x,y, oneElementSize.x, oneElementSize.y);	
	}
	function prepareSnakeBody() {
		for(var i = snakeBodyLength-1; i >= 0; i--) {
			snakeBody.push({
				x: i * oneElementSize.x+initialPosition.x, 
				y:initialPosition.y});
		}
	}
	function drawSnake(snakeBody) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'orange';
		for(i = 0; i < snakeBody.length; i++) {
			drawSingleElement(snakeBody[i].x, snakeBody[i].y, ctx);
		}
	}
	function drawFirstMaze() {
		for(i = 0; i < maze.length; i++) {
			drawSingleElement(maze[i].x, maze[i].y, mtx);
		}
	}
	function createFood() {
		food.x = Math.ceil((parseInt(Math.random() * (canvas.width - oneElementSize.x) + 0))/20)*20;
		food.y = Math.ceil((parseInt(Math.random() * (canvas.width - oneElementSize.y) + 0))/20)*20;

		for(var i =0; i<snakeBody.length; i++) {
			if(checkCollision(snakeBody[i].x, snakeBody[i].y, food.x, food.y)) {				
				createFood();
			};
		}		
		for(var i = 0; i<maze.length; i++) {
			if(checkCollision(maze[i].x, maze[i].y, food.x, food.y)) {
				createFood();	
			}
		}
	}
	function createPowerUp() {
		powerUp.x = Math.ceil((parseInt(Math.random() * (canvas.width - oneElementSize.x) + 0))/20)*20;
		powerUp.y = Math.ceil((parseInt(Math.random() * (canvas.width - oneElementSize.y) + 0))/20)*20;
		
		for(var i =0; i<snakeBody.length; i++) {
			if(checkCollision(snakeBody[i].x, snakeBody[i].y, powerUp.x, powerUp.y)) {				
				createPowerUp()
			};
		}
		for(var i = 0; i<maze.length; i++) {
			if(checkCollision(maze[i].x, maze[i].y, powerUp.x, powerUp.y)) {
				createPowerUp();				
			}
		}
		if(powerUp.x == food.x && powerUp.y == food.y) {
			createPowerUp();
		}
	}
	function drawPowerUp(){
		ptx.fillStyle = 'green';
		drawSingleElement(powerUp.x, powerUp.y, ptx);
	}
	function drawFood() {
		ftx.fillStyle = 'red';
		drawSingleElement(food.x,food.y, ftx);
	}
	function moveSnake() {
		var snakeHeadX = snakeBody[0].x;
		var snakeHeadY = snakeBody[0].y
		moveDirection = nextDirection;
		if(moveDirection == 'right') {
			snakeHeadX+=oneElementSize.x;
		}
		else if(moveDirection == 'left') {
			snakeHeadX-=oneElementSize.x;
		}
		else if(moveDirection == 'up') {
			snakeHeadY-=oneElementSize.y;
		}
		else if(moveDirection == 'down') {
			snakeHeadY+=oneElementSize.y;
		}

		if(snakeHeadX >  canvas.width - oneElementSize.x) {
			snakeHeadX = 0;
		} else if (snakeHeadX == -oneElementSize.x) {
			snakeHeadX = canvas.width - oneElementSize.x;
		} else if (snakeHeadY == - oneElementSize.y) {
			snakeHeadY = canvas.height - oneElementSize.y;
		} else if (snakeHeadY > canvas.height - oneElementSize.y) {
			snakeHeadY = 0;
		}
		
		var lastBodyElement = snakeBody.pop();
		lastBodyElement.x = snakeHeadX;
		lastBodyElement.y = snakeHeadY;
		snakeBody.unshift(lastBodyElement);
		return snakeBody;
	}
	function addNextBodyElement() {
		snakeHead = snakeBody[0];
		snakeBody[snakeBody.length] = {
			x: snakeHead.x,
			y: snakeHead.y
		}
	}
	function checkCollision(x1,y1, x2,y2) {
		if(x1==x2 && y1==y2) {
			return true;
		} else {
			return false;
		}
	}

	function calculateScore(snakeSpeed) {
		score = score + 1*snakeSpeed*levelRatio;
	}
	function changeDirectionHandler(keyCode) {		
		switch(keyCode) {
			case 37:
				nextDirection = 'left'
				break;
			case 39:
				nextDirection = 'right'
				break;
			case 38 :
				nextDirection = 'up'
				break;
			case 40  :
				nextDirection = 'down'
			default: 
				break;
		}
	}
	function gameOver() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ftx.clearRect(0, 0, canvas.width, canvas.height);
		mtx.clearRect(0, 0, canvas.width, canvas.height);
		ptx.clearRect(0, 0, canvas.width, canvas.height);
		consumedFood = 0;
		powerUp.x = '';
		powerUp.y = '';
		clearInterval(gameAction);
		clearInterval(temporarySpeedFunction);
		clearInterval(countingDown);
		temporarySpeedSnake = 0;
		tableScore.push(score);
		prepareScoreTable();
		drawScoreTable();
		gameSettings.style.display = "block";
		clearTimeout(stopTimeout);
	}
		
		function game() {
			window.addEventListener('keyup', function(e){
				if(moveDirection == 'right' && e.keyCode == 37  || moveDirection=='left' && e.keyCode == 39 || moveDirection=='up' && e.keyCode == 40 || moveDirection=='down' && e.keyCode == 38) {
					e.preventDefault();
				} else {
					changeDirectionHandler(e.keyCode);
				}
			});			
			var snakeHead = snakeBody[0];
			moveSnake();
			drawSnake(snakeBody);
			var snakeHead = snakeBody[0];
			for(var i = 1; i<snakeBody.length; i++) {
				if(snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y) {
					gameOver();
				}
			}
			for(var i = 1; i<maze.length; i++) {
				if(snakeBody[0].x == maze[i].x && snakeBody[0].y == maze[i].y) {
					gameOver();
				}
			}
			if(snakeBody[0].x == powerUp.x && snakeBody[0].y == powerUp.y) {
				powerUp.y = '';
				powerUp.x = '';
				var powerUpAction = Math.floor(Math.random() * (6 - 1 + 1) + 1);
				var powerUpAction = 3;
				ptx.clearRect(0, 0, canvas.width, canvas.height);				
				if(powerUpAction == '1') {
					for(var i = 0; i<powerUPx; i++){
						if(snakeBody.length > 1) {
							snakeBody.pop();
							drawSnake(snakeBody)
						}
					}
				} 
				else if (powerUpAction == '2') {
					for(var i=0; i<powerUPx; i++) {
						addNextBodyElement();
						drawSnake(snakeBody);
					}							
				} 
				else if(powerUpAction == '3'  || powerUpAction == '4') {
					if(powerUpAction == '3') {
						temporarySpeedSnake = 2*snakeSpeed;
					} else {
						temporarySpeedSnake = 0.5*snakeSpeed;
					}					
					clearInterval(gameAction);				
					temporarySpeedFunction = setInterval(game, 1/parseInt(temporarySpeedSnake)*1000);						
					stopTimeout = setTimeout(function(){
						clearInterval(temporarySpeedFunction);
						gameAction = setInterval(game, 1/parseInt(snakeSpeed)*1000);					
					},powerUPy*1000)
				} 
				else if (powerUpAction == '5') {
					score = score+powerUPx*score;
					displayCurrentScore()
				} 
				else if(powerUpAction == '6') {
					document.getElementsByClassName('walking-through')[0].style.visibility = "visible";
					var x = powerUPy;
					document.getElementById('counter').innerHTML = x;
					countingDown = setInterval(function(){						
						x-=1;
						document.getElementById('counter').innerHTML = x;
					}, 1000);
					var mazeClipboard = maze;
					maze = [];
					setTimeout(function(){
						maze = mazeClipboard;
						clearInterval(countingDown);
						document.getElementsByClassName('walking-through')[0].style.visibility = "hidden";
					},powerUPy*1000)
				}			
			}
			if(checkCollision(snakeBody[0].x,snakeBody[0].y, food.x, food.y)) {					
				addNextBodyElement();
				consumedFood+=1;
				if(consumedFood == 5) {
					createPowerUp();
					drawPowerUp();
					setTimeout(function(){
						consumedFood = 0;
						ptx.clearRect(0, 0, canvas.width, canvas.height);
					},5000)
				}
				calculateScore(snakeSpeed);
				displayCurrentScore();
				ftx.clearRect(0, 0, canvas.width, canvas.height);
				createFood();
				drawFood();				
			}	
				
		}		
		function displayCurrentScore() {
			currentScore.innerHTML = score;
		}
		
		function prepareScoreTable() {
			tableScore.sort(function(a,b){ return b-a})
			
			for(var i=0; i<tableScore.length; i++) 
				if(tableScore.length >5) {
					tableScore.pop();
				}
		}
		function drawScoreTable() {
			displayTable.innerHTML = "";
			for(var i = 0; i< tableScore.length; i++) {
				var str = "<tr><td>"+tableScore[i]+"</td></tr>"
				displayTable.insertAdjacentHTML('beforeend', str);
			}
		}
		var buttonStart = document.getElementById('start-game');
		buttonStart.addEventListener('click', function(){
			snakeBody = [];
			consumedFood = 0;
			score = 0;
			moveDirection = 'right'
			nextDirection = 'right';
			currentScore.innerHTML = "0";
			snakeSpeed = 0;
			snakeSpeed = document.getElementById('speed-value').value;
			powerUPx = parseInt(document.getElementById('powerUPx').value);
			powerUPy = parseInt(document.getElementById('powerUPy').value);
			var checkLevelRatio = document.getElementsByName('level');			
			for(var i = 0; i<checkLevelRatio.length; i++) {
				if(checkLevelRatio[i].checked) {
					levelRatio = parseInt(checkLevelRatio[i].dataset.ratio);
					levelMazeName = checkLevelRatio[i].dataset.name;
				}
			}
			prepareMaze();
			prepareSnakeBody();
			drawSnake(snakeBody);
			createFood();
			drawFood();				
			drawFirstMaze();
			moveSnake();
			gameSettings.style.display = "none";			
			gameAction = setInterval(game, 1/parseInt(snakeSpeed)*1000);
			canvas.focus();
		})
		
		
		
	
	
	
	
	
	
