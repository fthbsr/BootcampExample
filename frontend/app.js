const intAForm = document.getElementById("intA");
const intBForm = document.getElementById("intB");
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const resultForm =document.getElementById("result");




addButton.onclick = function () {
  const intA = intAForm.value;
  const intB = intBForm.value;
  const formMethod = "Add"

  ResultLog(intA,intB,formMethod)

}

  
subtractButton.onclick = function () {
  const intA = intAForm.value;
  const intB = intBForm.value;
  const formMethod = "Subtract"

  ResultLog(intA,intB,formMethod)

}

divideButton.onclick = function () {
  const intA = intAForm.value;
  const intB = intBForm.value;
  const formMethod = "Divide"

  ResultLog(intA,intB,formMethod)

}

multiplyButton.onclick = function () {
  const intA = intAForm.value;
  const intB = intBForm.value;
  const formMethod = "Multiply"

  ResultLog(intA,intB,formMethod)

}
  

function ResultLog(intA,intB,formMethod){

  fetch(`http://localhost:3000/calculate/`, {
    method: "POST",
    body: JSON.stringify({
      
        "intA" : intA,
        "intB" : intB,
        "method" : formMethod,
    
    }),
    headers: {
        'content-type': 'application/json',
        'Accept': '*/*'
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
       console.log(res)
       const result = res["result"]["soap:Envelope"]["soap:Body"][`${formMethod}Response`][`${formMethod}Result`];
       console.log(result)
       resultForm.innerText =`Sonuc : ${result}`;
    })
    .catch((e) => {
      console.log("e", e);
    });
 }


