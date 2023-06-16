$( ".reg1" ).on( "click", function() {
   $("#regEx").text("(bab)*(b+a)(bab+aba)(a+b)*(aa+bb)*(b+a+bb)(a+b)*(aa+bb)");
} );

$( ".reg2" ).on( "click", function() {
   $("#regEx").text("(1+0)*(11+00)(00+11)*(1+0+11)(1+0+11)*(101+111)(101+111)*(1+0*+11)(1+0*+11)*");

} );

$(".dfa" ).on( "click", function() {
   $("#Dfa").text("DFA");
} );

$(".pda" ).on( "click", function() {
   $("#Dfa").text("PDA");
} );  

$(".cfg" ).on( "click", function() {
   $("#Dfa").text("CFG");
} );

$("#calcExecute" ).on( "click", function() {
event.preventDefault();
var regChosen = $("#regEx").text();
var dfaChosen = $("#Dfa").text();
$(".regexChosen").text(regChosen);
$(".automataChosen").text(dfaChosen);

   if($("#regEx").text()  === '(bab)*(b+a)(bab+aba)(a+b)*(aa+bb)*(b+a+bb)(a+b)*(aa+bb)' && $("#Dfa").text() === "DFA")
   {
      window.location.replace("letters.html");
   }
   else if($("#regEx").text()  === '(1+0)*(11+00)(00+11)*(1+0+11)(1+0+11)*(101+111)(101+111)*(1+0*+11)(1+0*+11)*' && $("#Dfa").text() === "DFA")
   {
      window.location.replace("numbers.html");
   }
   return false;
} );

//Validation: If the string is not valid or valid
$("#calcExecuteInput").on( "click", function() {

var inputString = $("#inpBox").val(); 
var selectedDFA = $("#regEx").text();
var isValid = false;
if (selectedDFA === "(bab)*(b+a)(bab+aba)(a+b)*(aa+bb)*(b+a+bb)(a+b)*(aa+bb)") {
   isValid = /^((bab)*(b|a)(bab|aba)(a|b)*(aa|bb)*(b|a|bb)(a|b)*(aa|bb))$/.test(inputString); } 
else if (selectedDFA ===  "(1+0)*(11+00)(00+11)*(1+0+11)(1+0+11)*(101+111)(101+111)*(1+0*+11)(1+0*+11)*") {
   isValid =/^((1|0)*(11|00)(00|11)*(1|0|11)(1|0|11)*(101|111)(101|111)*(1|0*|11)(1|0*|11)*)*$/.test(inputString);
}
if (isValid) {
$("#calcValidate").text("VALID");
$("#calcValidate").css('background-color', 'green');
}
else {
   $("#calcValidate").text("INVALID");
   $("#calcValidate").css('background-color', 'red');
}
}); 
//Animation
   const letters = new DFA(
      ["a", "b"],
      ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8','q9','q10','q11','q12','q13','q14'],
      "q0",
      ["q13","q14"],
      {
         "q0.a":"q1", "q0.b":"q2", //start/circ1
         "q1.a":"q3", "q1.b":"q4", //circ2
         "q2.a":"q5", "q2.b":"q4", // circ3
         "q3.b":"q6", // circ4
         "q4.a":"q7", // circ5
         "q5.b":"q8", // 6
         "q6.a":"q9",  // 7 
         "q7.b":"q9",  // 8
         "q8.a":"q9",  // 9
         "q9.a":"q10", "q9.b":"q10", // 10
         "q10.a":"q11", "q10.b":"q12", // 11
         "q11.a":"q13", "q11.b":"q12", //12
         "q12.a":"q11", "q12.b":"q14", // 13
         "q13.a":"q13", "q13.b":"q12", //14
         "q14.a":"q11", "q14.b":"q14", //15
      } 
   )
   
   $("#strSimulate").on( "click", async function() {
         
         var userInput = $("#inpBox").val(); 
         var result = letters.execute(userInput);  //validating
         for (let index = 0; index < letters.path.length; index++) {
         const graph1 = letters.path[index];
         let current_state = document.getElementById(graph1)
         if (letters.path.length-1 === index){
            if (!result){
               current_state.classList.add("invalid_state")
               await sleep(1000)
               current_state.classList.remove("invalid_state")
               await sleep(500)
            } else {
               current_state.classList.add("valid_state")
               await sleep(1000)
               current_state.classList.remove("valid_state")
               await sleep(500)
            }} else {
               current_state.classList.add("valid_state")
               await sleep(1000)
               current_state.classList.remove("valid_state")
               await sleep(500)
            }
         }
      
      function sleep(ms) {
         return new Promise(resolve => setTimeout(resolve, ms));
      }
});
