var fs=require('fs');
var writeStream = fs.createWriteStream("../json/VisualAssault.json");
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('../csv/crime.csv')
  });
var headerarray = [];
var contentarray = [];
var JSONarray = [];
var assault_true = [];
var assault_false = [];
for(var v=2001;v<=2016;v++)
{
  assault_true[v]=0;
  assault_false[v]=0;
}
var count=0;
var i = 0;
var j=0;
lineReader.on('line', function (line) {
  if(i === 0)
  {
    headerarray = line.split(",");
    i++;
  }
  else
  {
    var currentLineData =line.split(",");
    for(var year=2001;year<=2016;year++)
      {
        if(" "+currentLineData[17]==" "+year)
          {
      	    if(currentLineData[5]=="ASSAULT" && currentLineData[8]=="true" )
            {
            assault_true[year]++;
            }
            else
            {
            assault_false[year]++;
            }
          }
      }
  }
});
lineReader.on('close',function()
{
  for(var k=2001;k<=2016;k++)
  {
  	var JSONobject_assault={};
    JSONobject_assault["year"]=k;
    JSONobject_assault["True"]=assault_true[k];
    JSONobject_assault["False"]=assault_false[k];
    JSONarray.push(JSONobject_assault);
    }
  writeStream.write(JSON.stringify(JSONarray));
});
