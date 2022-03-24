const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const fs = require("fs");
const e = require("express");
const soapRequest = require('easy-soap-request');
const { XMLParser} = require("fast-xml-parser");

const url = "http://www.dneonline.com/calculator.asmx?wsdl=null";
const sampleHeaders = {
  "Content-Type": "text/xml;charset=UTF-8",
  soapAction: "http://tempuri.org/Add",
};

function operation(method, a, b) {
  const xml = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:s="http://tempuri.org/">
    <soapenv:Header/>
    <soapenv:Body>
        <s:${method}>
            <s:intA>${a}</s:intA>
            <s:intB>${b}</s:intB>
        </s:${method}>
    </soapenv:Body>
</soapenv:Envelope>
`;

  return {
    action: `http://tempuri.org/${method}`,
    body: xml,
  };
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Content-Type", "application/json");
  next();
});

app.post("/calculate", async (req, res) => {

  const op = operation(req.body.method, Number.parseInt(req.body.intA), Number.parseInt(req.body.intB))

  const { response } = await soapRequest({
    url: url,
    headers: {...sampleHeaders, soapAction: op.action},
    xml: op.body,
    timeout: 30000,
  });

  const parser = new XMLParser();
  let jObj = parser.parse(response.body);

  res.json({
    
    result : jObj,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});