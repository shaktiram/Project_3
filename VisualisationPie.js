var fs=require('fs');
var fetch = require('readline').createInterface({
input: fs.createReadStream('../csv/crime.csv')});
var data=[];
var obj={};
var head =[];
var c=0;
fetch.on('line', function (line)
{
  if(c == 0)
  {
     head =line.split(',');
     c++;
  }
  else
  {
    var aa = line.split(',');
    for (var j=0;j<head.length;j++)
      {
      	if(j==14)
      	{
          if(aa[17]=="2011")
      		obj[head[j]]=aa[j];
      	}
      }
    var jso=JSON.stringify(obj)+",";
    fs.appendFile('../json/VisualCrime.json',jso,function(err){
	  });
  }
});
