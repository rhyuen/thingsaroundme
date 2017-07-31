
const request = require("request");
const cheerio = require("cheerio");
const targetURL = "http://www.vancouverconventioncentre.com/events";
let currMonth = new Date().getMonth();

const options = {
    method: "GET",
    url: `${targetURL}/2017/${currMonth}`
};

let data_container = [];

request.get(options, (err, res, body) => {
    if(err){
        console.log(err);        
    }else{
        let $ = cheerio.load(body);
        let curr_item = {};             
        $(".event-ctn").each(function(i, el){
            if($(this).find($(".date .day")).length === 2){
                console.log("four chars");
            }else{
                console.log("not four chars.")
            }
            console.log($(this).find($(".date .day")).text());          
            //TODO: if .day length = 2, then add a divider.
            console.log($(this).find($(".title")).text().trim());
            console.log($(this).find($(".loc")).text().trim());
        });                  
    }
});

module.exports = (done) => {
    if(err){
        done(err);
    }else{
        done(null, []);
    }    
};