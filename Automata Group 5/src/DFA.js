class DFA {
  alphabet = []
  transitions = {}
  initial_state = "q0"
  path = []


  constructor(alphabet, states , initial_state, final_states, transitions) {
    this.states = states; // set of states
    this.alphabet = alphabet; // alphabet
    this.transitions = transitions; // transition function
    this.initial_state = initial_state; // start state
    this.final_states = final_states; // final states
    this.path = [];
  }
  execute(input) { // input = "ab"
    if (this.path.length > 0)
      this.path = [];
      
    let q = this.initial_state; // "q0"
    this.path.push(q);
    while (input != "" && this.states.includes(q)) {
      q = this.transitions[`${q}.${input[0]}`]; // "q0.a": "q1"
      this.path.push(q); 
      input = input.slice(1);
    }
    if (this.final_states.includes(q)) 
      return true;
    return false;
  }
}
