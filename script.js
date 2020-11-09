/**
 * Generates the problem seen on the index page.
 */
function genProblems() {
    var currProblems = document.getElementById("problems");
    var problem_type, num_digits, num_values;
    var prompt, problem, answer;

    //Checks which operation is needed for the problem.
    if(document.getElementById("addition-prob").checked) {
        problem_type = "addition";
    }else if(document.getElementById("subtraction-prob").checked) {
        problem_type = "subtraction";
    }else if(document.getElementById("multiplication-prob").checked) {
        problem_type = "multiplication";
    }else if(document.getElementById("division-prob").checked) {
        problem_type = "division";
    }

    //Checks how many digits each term has in the problem.
    if(document.getElementById("1dig").checked) {
        num_digits = 1;
    }else if(document.getElementById("2dig").checked) {
        num_digits = 2;
    }else if(document.getElementById("3dig").checked) {
        num_digits = 3;
    }

    //Checks how many terms are in the problem.
    if(document.getElementById("2num").checked) {
        num_values = 2;
    }else if(document.getElementById("3num").checked) {
        num_values = 3;
    }else if(document.getElementById("4num").checked) {
        num_values = 4;
    }

    //Generates a problem according to the values recieved above.
    switch(problem_type) {
        case "addition":
            prompt = create_addition_problem(num_values, num_digits);
            problem = prompt[0];
            answer = prompt[1];
            break;
        case "subtraction":
            prompt = create_subtraction_problem(num_values, num_digits);
            problem = prompt[0];
            answer = prompt[1];
            break;
        case "multiplication":
            prompt = create_multiplication_problem(num_values, num_digits);
            problem = prompt[0];
            answer = prompt[1];
            break;
        case "division":
            prompt = create_division_problem(num_digits);
            problem = prompt[0];
            answer = prompt[1];
            break;
    }

    //Gets rid of the old problem
    currProblems.innerHTML = "";

    //Textbox for user to enter answer to problem.
    var answerBox = document.createElement("input");
    answerBox.setAttribute("type", "text");
    answerBox.setAttribute("id", "answer-box");

    //Previous button.
    var prevButton = document.createElement("input");
    prevButton.setAttribute("type", "button");
    prevButton.setAttribute("id", "prev-button");
    prevButton.setAttribute("value", "<");

    //Next button.
    var nextButton = document.createElement("input");
    nextButton.setAttribute("type", "button");
    nextButton.setAttribute("id", "next-button");
    nextButton.setAttribute("value", ">");

    currProblems.appendChild(prevButton);
    currProblems.appendChild(document.createTextNode(problem + " = "));
    currProblems.appendChild(answerBox);
    currProblems.appendChild(nextButton);

    generateListeners(answer);
}

/**
 * Generates listeners the next button and the answer box.
 * @param {Number} answer 
 */
function generateListeners(answer) {
    //Listener for next button.
    document.getElementById("next-button").addEventListener("click", genProblems);
    
    //Listener for answer box answers.
    let answerBox = document.getElementById("answer-box");
    answerBox.addEventListener("keypress", (event) =>{
        if (event.key === "Enter") {
            event.preventDefault();
           
            check_answer(answerBox.value, answer);
        }
    });
}

/**
 * Generates a random number with num_digits amount of digits.
 * @param {Number} num_digits 
 */
function getRandomDigits(num_digits) {
    var min = Math.pow(10, num_digits - 1)
    var max = Math.pow(10, num_digits) - 1
   
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Generates an addition problem according to the parameters given.
 * @param {Number} num_values 
 * @param {Number} num_digits 
 */
function create_addition_problem(num_values, num_digits) {
	// create num_values random numbers with num_digits
	var values = [];
    var prompt = "";
    
    //Generates random terms for the problem.
	for (var i = 0; i < num_values; i++){
        var val = getRandomDigits(num_digits);
		prompt = prompt + " + " + val;
		values.push(val);
    }

    //Gets rid of the inital " + " at the start of the string.
    prompt = prompt.substring(3);

    //Calculates answer to the problem.
    var sum = values.reduce((a, b) => a + b, 0);
	return [prompt, sum];
}

/**
 * Generates a subtraction problem according to the parameters given.
 * @param {Number} num_values 
 * @param {Number} num_digits 
 */
function create_subtraction_problem(num_values, num_digits) {
    var values = [];
    var difference;
    var val;
    var prompt = "";

    //Generates random terms for the problem.
    for (var i = 0; i < num_values; i++) {
        val = getRandomDigits(num_digits);
        prompt = prompt + " - " + val;
		values.push(val);
    }
    
     //Gets rid of the inital " - " at the start of the string.
     prompt = prompt.substring(3);

    //Calculates the answer to the problem
    difference = values[0];
    for(var i = 1; i < values.length; i++) {
        difference -= values[i];
    }

    return [prompt, difference];
}


/**
 * Generates a multiplicaation problem according to the parameters given.
 * @param {Number} num_values 
 * @param {Number} num_digits 
 */
function create_multiplication_problem(num_values, num_digits){
    var values = [];
    var prompt = "";
    var answer = 1;
    
    //Generates random terms for the problem.
	for (var i = 0; i < num_values; i++){
        var val = getRandomDigits(num_digits);
		prompt = prompt + " x " + val;
		values.push(val);
    }
    
    //Gets rid of the inital " x " at the start of the string.
    prompt = prompt.substring(3);

    //Calculates answer to the problem.
    for (var j = 0; j < values.length; j++){
        answer *= values[j];
    }

    return [prompt, answer];
}

/**
 * Calculates a division problem according to the parameters given.
 * @param {Number} num_digits 
 */
function create_division_problem(num_digits){
	var values = [getRandomDigits(num_digits), getRandomDigits(num_digits)];
  
    return [(values[0]*values[1]) +  " ÷ " + values[0], values[1]];
}

/**
 * Checks to see if the user has inputed the correct answer to the problem.
 * @param {Number} userAnswer 
 * @param {Number} rightAnswer 
 */
function check_answer(userAnswer, rightAnswer){
    //If the user is correct, lights up the problem green temporarily.
    if (userAnswer == rightAnswer) {
        //document.getElementById("answer-box").className = "correct";
        document.getElementById("answer-box").style.color = "green";
        document.getElementById("answer-box").style.borderColor = "green";
        document.getElementById("problems").className = "correct";
        
        //Reverts problem back to black and generaets a new problem.
        setTimeout(function () {
            document.getElementById("answer-box").style.color = "black";
            document.getElementById("answer-box").style.borderColor = "black";
            document.getElementById("problems").className = "";
            genProblems();
        }, 500);

    //Otherwise, the problem shakes, the user's answer is erased, and the user
    //may try again.
    } else {
        let problemBox = document.getElementById("current-problems");
        problemBox.className = "shake";

        document.getElementById("answer-box").value = "";

        setTimeout(function () {
            problemBox.className = "";
        }, 500);
    }
}