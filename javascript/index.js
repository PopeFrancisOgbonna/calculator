class Calculator{
  constructor(prevText, currentText){
    this.prevText = prevText;
    this.currentText = currentText;
    this.clear();
  }

  clear(){
    this.prevOperand = '';
    this.currentOperand = '';
    this.operator = undefined;
    this.operation =''
    this.updateDisplay()
  }
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  choseOperation(operator){
    if(this.currentOperand == '') return;
    if(this.currentOperand !=''){
      this.compute()
    }
    this.operation = operator;
    this.prevOperand = this.currentOperand;
    this.currentOperand =''
  }
  compute(){
    let computed;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(curr)) return;
    switch(this.operation){
      case '+':
        computed = prev + curr;
        break;
      case '-':
        computed = prev - curr;
        break;
      case '*':
        computed = prev * curr;
        break;
      case '÷':
        computed = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = computed;
    this.operation = undefined;
    this.prevOperand ='';
  }
  formatDisplay(number){
    const sNum = number.toString();
    const intDigits = parseFloat(sNum.split('.')[0]);
    const deciNum = sNum.split('.')[1];
    let displayValue 
    if(isNaN(intDigits)){
      displayValue = ''
    }else{
      displayValue = intDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if(deciNum != null){
      return `${intDigits}.${deciNum}`
    }else{
      return displayValue
    }
  }
  updateDisplay(){
    this.currentText.innerText = this.formatDisplay(this.currentOperand);
    if(this.operation != null){
      this.prevText.innerText = `${this.prevOperand} ${this.operation}`;
    }else{
      this.prevText.innerText =''
    }
  }
}

const btnNumber = document.querySelectorAll('[data-num]');
const btnClear = document.querySelector('[data-clear]');
const btnEquals = document.querySelector('[data-equals]');
const btnDelete = document.querySelector('[data-del]');
const operationBtn = document.querySelectorAll('[data-ops]');
const prevText = document.querySelector('[data-prevOps]');
const currentText = document.querySelector('[data-currentOps]');


const calculator = new Calculator(prevText, currentText);

btnNumber.forEach(button => {
  button.addEventListener('click', () =>{
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay()
  })
});

operationBtn.forEach(button => {
  button.addEventListener('click', () =>{
    calculator.choseOperation(button.innerText);
    calculator.updateDisplay()
  })
});

btnEquals.addEventListener('click', button =>{
  calculator.compute();
  calculator.updateDisplay();
});

btnClear.addEventListener('click', button =>{
  calculator.clear();
  calculator.updateDisplay();
});

btnDelete.addEventListener('click', () =>{
  calculator.delete();
  calculator.updateDisplay();
})