var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');


router.get('/', function(req, res) {
    getData(res);
});

async function getData(res){

    var startTimestamp = 1554444000000;
    var endTimestamp = 1554469200000;
    var dateExperimentstart =  new Date (parseInt(startTimestamp));
    var dateExperimentend =  new Date (parseInt(endTimestamp));

    dateExperimentstart.setDate(dateExperimentstart.getDate() - 1);
    dateExperimentend.setDate(dateExperimentend.getDate() - 1);    
    
    var datestartTimeStamp = new Date(dateExperimentstart.getTime());
    var dateendTimeStamp = new Date(dateExperimentend.getTime());
    var listdataraw = [];
    listdataraw.date = [];                
    listdataraw.count = [];
    listdataraw.countfilteredData = [];

    for(var k = 0; k < 31;k++){

        datestartTimeStamp.setDate(datestartTimeStamp.getDate() + 1);
        dateendTimeStamp.setDate(dateendTimeStamp.getDate() + 1);
        // console.log(datestartTimeStamp.getTime());
        // console.log(dateendTimeStamp.getTime());
        var now = new Date (parseInt(datestartTimeStamp.getTime()));
        var url = "http://localhost/analysis/api/device/query?startTimestamp="+datestartTimeStamp.getTime()+"&endTimestamp="+dateendTimeStamp.getTime();
    
        //fetching data
        let response = await fetch(url);
        let dataraw = await response.json();
        var devices = dataraw;

        //processing data
                      var leghtdataraw = devices.length;
                      var vendorMap = new Object();
                      var vendorList = [];
                      var countfilteredData = 0;
      
                      var totalCount = 0;
                      var randomizedDevices = [];
                      var lastfivemin = [];
                      var lasthour = [];
                      var lastday = [];
                      var pieLabels = [];
                      var pieData = [];
                      var listranking = [];
      
      
                      var currentDate = new Date();
      
                      var lastFiveMinDate = new Date(currentDate.getTime() - 1000 * 60 * 5);
                      var lastFiveMinDevices = [];
      
                      var lastHourDate = new Date(currentDate.getTime() - 1000 * 60 * 60);
                      var lastHourDevices = [];
      
                      var lastDayDate = new Date(currentDate.getTime() - 1000 * 60 * 60 * 24);
                      var lastDayDevices = [];
      
                      devices.forEach(function (element) {
      
                          if(element.mac_address.match(/.(2|3|6|7|a|b|e|f).{10}/i)){
                              randomizedDevices.push(element);
                          }
                          //filtering data
                          if( (element.hasOwnProperty('vendor')) && (element.vendor !== undefined) && (element.vendor !== null) ){ //only consider for ranking if it has a vendor
                              var vendor = element.vendor;
                              if (vendor !== undefined) {
                                  totalCount++;
                                  if (vendorMap[vendor] === undefined) { //vendor not yet encountered --> add new entry to map
                                      vendorMap[vendor] = 1;
                                      vendorList.push(vendor);
                                  } else { //vendor already encountered --> increase count for that vendor
                                      vendorMap[vendor] = vendorMap[vendor] + 1;
                                  }
                              }
                              //filtering data
                              var elementDate = new Date(element.last_seen);
                              if (elementDate > lastFiveMinDate) {
                                  lastFiveMinDevices.push(element);
                              }
                              if (elementDate > lastHourDate) {
                                  lastHourDevices.push(element);
                              }
                              if (elementDate > lastDayDate) {
                                  lastDayDevices.push(element);
                              }
                          }
      
      
                      });
      
      
                      //assign data for lasthour, lastday, lastweek lists
                      lastfivemin = lastFiveMinDevices;
                      lasthour = lastHourDevices;
                      lastday = lastDayDevices;
      
      
                      var data = [];
      
                      var inverseVendorMap = new Object();
      
                      vendorList.forEach(function (element) {
                          inverseVendorMap[vendorMap[element]] = element;
                          data.push(vendorMap[element]);
                      });
      
                      //assign data for pie chart
                      pieLabels = vendorList;
                      pieData = data;
                      
                      pieData.forEach(function(element){
                          countfilteredData = countfilteredData + element;
                      });
      
                      //assign dataa listdataraw
                      var tpd= new Date (parseInt(now.getTime())); 
                      var strDate = tpd.getDate()+"-"+(tpd.getMonth()+1)+"-"+tpd.getFullYear();           
                    //   listdataraw.count.push(leghtdataraw);
                    //   listdataraw.countfilteredData.push(countfilteredData);
                      listdataraw.push({date: strDate, totaldata: leghtdataraw, filtereddata: countfilteredData });
                      // listdataraw.pieLabels = pieLabels;
                      //compute data for the ranking table
                      var sortArray = Object.keys(inverseVendorMap);
      
                      sortArray.reverse();
      
                      var ranking = [];
      
                      for (var i = 0; i < 15; i++) {
                          if (sortArray[i] !== undefined) {
                              var percent = Number(((sortArray[i] / totalCount) * 100).toFixed(1));
                              ranking.push({rank: i + 1, vendor: inverseVendorMap[sortArray[i]], count: sortArray[i], percentage: (percent + " %")});
                          }
                      }
      
                      listranking = ranking;
                      var isLoading = false;
      
    
    }

    // console.log(listdataraw);

    res.json(listdataraw);
}

module.exports = router;
