var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');



router.get('/', function(req, res) {
    getDataFromCSV(res);
});

async function getDataFromCSV(res){
    let fs = require('fs');
    let fs2 = require('fs');
    let listdata = [];
    let datedata = [];
    let pred = [];
    let expec = [];

    var contents = fs.readFileSync('/home/rafif/TA/myappal/routes/hasil3.csv', 'utf8');
    var datecontents = fs2.readFileSync('/home/rafif/TA/myappal/routes/gw.csv', 'utf8');

    let strcontent = contents.split("\r\n");
    strcontent.forEach(function(elmnt){
      if(elmnt != ""){
        let splitstr =  elmnt.split(',');
        // listdata.push({prediction: parseFloat(splitstr[0]), expectation: parseInt(splitstr[1])});
        pred.push(splitstr[0]);
        expec.push(splitstr[1]);
      }
    });
    var count = 0;
    let strdatecont = datecontents.split('\n');
      strdatecont.forEach(function(element){
      if(count <= 1){ 
        let splitdate = element.split(',');
        let splitparser = splitdate[0].split('""');
        let parsersplit = splitparser[0].slice(1, 9);
        let now = new Date(parsersplit);
        now.setDate(now.getDate()+1)
        if(parsersplit != "") {
          datedata.push(now.toDateString());
          }
      } else {
        let splitdate = element.split(',');
        let splitparser = splitdate[0].split('""');
        let parsersplit = splitparser[0].slice(1, 10);
        let now = new Date(parsersplit);
        now.setDate(now.getDate()+1)
        if(parsersplit != "") {
          datedata.push(now.toDateString());
          }
        }
        count++;
      }
    );     
    
    var predindex = 0;
    pred.forEach(function(element){
      listdata.push({date:datedata[(predindex+14)],prediction: element, expectation: expec[predindex]});
      predindex++;
    });

    res.json(listdata);
}

module.exports = router;
