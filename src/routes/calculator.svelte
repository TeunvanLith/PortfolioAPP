<script>
import { onMount } from 'svelte';
import Tasks from '../routes/stores/TaskStore';
import Users from '../routes/stores/UserStore';

let root;

onMount(() => {
const input = root.querySelector("div.input")
const output = root.querySelector("div.output")
const operandDisplay = root.querySelector("div.operandDisplay")
const del = root.querySelector("div.delete")
const allclear = root.querySelector("div.ac")
const equals = root.querySelector("div.equals")
const numbers = root.querySelectorAll("div.number")
const operands = root.querySelectorAll("div.operand")

const handleInput = (num) => {
    
    num.addEventListener('click', () => {
      let current = input.innerHTML;
    
      if (num.innerHTML == '.' && current.includes('.')) {
       }
      else {
      input.innerHTML = `${current}${num.innerHTML}`;
       }
    });             
};

numbers.forEach(handleInput);

const checkMillion = () => {
      let total = parseInt(output.innerHTML);
      console.log(total)
      if (total > 1000000 ) {
            Tasks.update(task => {
                let copyTasks = [...task];
                let changeTask = copyTasks.find((task) => task.id == "002");
                changeTask.completed = "&#9745;";
                addXP(200);
                return copyTasks;

            })

          }
    };

    const addXP = (xp) => {
        Users.update(users => {
                let copyUsers = [...users];
                let changeUser = copyUsers.find((user) => user.voornaam == "Inge");
                changeUser.xp = changeUser.xp + xp;
               
                return copyUsers;

            })
    }

allclear.addEventListener('click', () => {
   input.innerHTML = '';
   output.innerHTML = '';
   operandDisplay.innerHTML = '';
});

del.addEventListener('click', () => {
    const sliceInput = input.innerHTML;
    const sliced = sliceInput.slice(0, -1)
    input.innerHTML = sliced;
})

const handleOperand = (opr) => {
    opr.addEventListener('click', () => {
    operandDisplay.innerHTML = `${opr.innerHTML}`;
    
    if (input.innerHTML == '') {
       
    }
   else { 
    output.innerHTML = input.innerHTML;
    input.innerHTML = '';
   }
  })
};

operands.forEach(handleOperand);

const halfClear = () => {
    input.innerHTML = '';
    operandDisplay.innerHTML = '';
}

equals.addEventListener('click', () => {
  let number1 = parseFloat(output.innerHTML);
  let number2 = parseFloat(input.innerHTML);
  let sumOutput = 0;
  
  if (operandDisplay.innerHTML == '/' ) {
      sumOutput = number1 / number2;
      halfClear();
      output.innerHTML = sumOutput;
  } 
  else if (operandDisplay.innerHTML == '*' ) {
      sumOutput = number1 * number2;
      halfClear();
      output.innerHTML = sumOutput;
  } 
  else if (operandDisplay.innerHTML == '-' ) {
      sumOutput = number1 - number2;
      halfClear();
      output.innerHTML = sumOutput;
  } 
  else if (operandDisplay.innerHTML == '+' ) {
      sumOutput = number1 + number2;
      halfClear();
      output.innerHTML = sumOutput;
  } else {
      sumOutput = number2;
      halfClear();
      output.innerHTML = sumOutput;
  }
  checkMillion();
});
  });


</script>

<div>
<h1>Calculator</h1><br />

<div class="container" bind:this={root}>
    <div class="tlrr output"></div>
    <div class="operandDisplay"></div>
    <div class="input blok3"></div>
    <div class="ac blok2 buttons">AC</div>
    <div class="delete blok2 buttons">&#8592;</div>
    <div class="operand buttons">*</div>
    <div class="operand buttons">/</div>
    <div class="operand buttons">-</div>
    <div class="operand buttons">+</div>
    <div class="number buttons">1</div>
    <div class="number buttons">2</div>
    <div class="number buttons">3</div>
    <div class="number buttons">4</div>
    <div class="number buttons">5</div>
    <div class="number buttons">6</div>
    <div class="number buttons">7</div>
    <div class="number buttons">8</div>
    <div class="blr number buttons">9</div>
    <div class="number buttons">0</div>
    <div class="number buttons">.</div>
    <div class="brr equals buttons">=</div>
</div>
</div>
<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 300px;
    margin: 20px auto;
    color: white;
    text-align: center;
    grid-gap: 2px;
    border: 1px solid #D3D3D3;
    font-family: arial, sans-serif;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
  }

  .operandDisplay {
    font-size: 24px;
    font-weight: 800;
  }
  .container div {
    line-height: 50px;
  }

  .blok2{
    background-color: #333;
    grid-column: span 2;
  }

  .blok3{
    background-color: #333;
    grid-column: span 3;
  }

  .output {
    grid-column: 1/5;
    background-color: rgba(51,51,51,0.7);
    height: 50px;
  }

  .input,
  .operandDisplay {
    background-color: rgba(51,51,51,0.7);
    text-align: center;
    height: 50px;
  }

  .buttons {
    color: black;
    background-color: #fff;
  }

  .buttons:hover {
    background-color: #666;
  }

  .ac {
    background-color: #11753c;
    cursor: pointer;
  }

  .number {
    background-color: #E5E5E5;
    cursor: pointer;
  }

  .equals {
    background-color: #11753c;
    cursor: pointer;
  }

  .operand {
    background-color: #C3C3C3;
    cursor: pointer;
  }

  .delete {
    background-color: #C3C3C3;
    cursor: pointer;
  }

  .tlrr {
    border-radius: 10px 10px 0 0;
  }

  .blr {
    border-radius: 0 0 0 10px;
  }
  .brr {
    border-radius: 0 0 10px;
  }
</style>