
function main() {
    genProblems();
}

function genProblems() {
    var currProblems = document.getElementById("problems");
    var problem_type, num_digits, num_values;
    var prompt, problem, answer;

    if(document.getElementById("addition-prob").checked) {
        problem_type = "addition";
    }else if(document.getElementById("subtraction-prob").checked) {
        problem_type = "subtraction";
    }else if(document.getElementById("multiplication-prob").checked) {
        problem_type = "multiplication";
    }else if(document.getElementById("division-prob").checked) {
        problem_type = "division";
    }

    if(document.getElementById("1dig").checked) {
        num_digits = 1;
    }else if(document.getElementById("2dig").checked) {
        num_digits = 2;
    }else if(document.getElementById("3dig").checked) {
        num_digits = 3;
    }

    if(document.getElementById("2num").checked) {
        num_values = 2;
    }else if(document.getElementById("3num").checked) {
        num_values = 3;
    }else if(document.getElementById("4num").checked) {
        num_values = 4;
    }

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

    currProblems.innerHTML = "";

    var answerBox = document.createElement("input");
    answerBox.setAttribute("type", "text");
    answerBox.setAttribute("id", "answer-box");

    var prevButton = document.createElement("input");
    prevButton.setAttribute("type", "button");
    prevButton.setAttribute("id", "prev-button");
    prevButton.setAttribute("value", "<");

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

function getRandomDigits(num_digits) {
    var min = Math.pow(10, num_digits - 1)
    var max = Math.pow(10, num_digits) - 1
    return Math.floor(Math.random() * (max - min) + min);
}

function create_addition_problem(num_values, num_digits) {
	// create num_values random numbers with num_digits
	var values = [];
	var prompt = "";
	for (var i = 0; i < num_values; i++){
        var val = getRandomDigits(num_digits);
		prompt = prompt + " + " + val;
		values.push(val);
    }
    
	prompt = prompt.substring(3);
    var sum = values.reduce((a, b) => a + b, 0);
	return [prompt, sum];
}

function create_subtraction_problem(num_values, num_digits) {
    var values = [];
    var difference;
    var val;
    var prompt = "";

    do {
        values[0] = getRandomDigits(num_digits);
    } while(values[0] < 4);
    prompt += values[0];

    for (var i = 1; i < num_values; i++) {
        do {
            val = getRandomDigits(num_digits);
        } while(val > values[i - 1]);
        prompt = prompt + " - " + val;
		values.push(val);
    }
    
    difference = values[0];
    for(var j = 1; j < values.length; j++) {
        difference -= values[i];
    }

    console.log(values, prompt);
    return [prompt, difference];
}

function create_multiplication_problem(num_values, num_digits){
    var values = [];
    var prompt = "";
    var answer = 1;
	for (var i = 0; i < num_values; i++){
        var val = getRandomDigits(num_digits);
		prompt = prompt + " x " + val;
		values.push(val);
    }
    prompt = prompt.substring(3);

    for (var j = 0; j < values.length; j++){
        answer *= values[j];
    }

    return [prompt, answer];
}

function num_digs(number) {
    return number.toString().length;
}

function create_division_problem(num_digits){
	var values = [getRandomDigits(num_digits), getRandomDigits(num_digits)];
    console.log([(values[0]*values[1]) +  " ÷ " + values[0], values[1]])
    return [(values[0]*values[1]) +  " ÷ " + values[0], values[1]];
}

function check_answer(userAnswer, rightAnswer){
    if (userAnswer == rightAnswer) {
        //document.getElementById("answer-box").className = "correct";
        document.getElementById("answer-box").style.color = "green";
        document.getElementById("answer-box").style.borderColor = "green";
        document.getElementById("problems").className = "correct";
        
        setTimeout(function () {
            document.getElementById("answer-box").style.color = "black";
            document.getElementById("answer-box").style.borderColor = "black";
            document.getElementById("problems").className = "";
            genProblems();
        }, 500);
       
    } else {
        let problemBox = document.getElementById("current-problems");
        problemBox.className = "shake";

        document.getElementById("answer-box").value = "";

        setTimeout(function () {
            problemBox.className = "";
        }, 500);
    }
}