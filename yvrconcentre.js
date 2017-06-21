
const request = require("request");
const cheerio = require("cheerio");
const targetURL = "http://www.vancouverconventioncentre.com/events";

const options = {
    method: "GET",
    url: targetURL
};

let data_container = [];

request.get(options, (err, res, body) => {
    if(err){
        console.log(err);        
    }else{
        let $ = cheerio.load(body);
        let curr_item = {};     
                    


        
        $(".event-ctn .date .day").each((i, el) => {
            console.log(el.children[0].data);
        });
        // $(".title").each((i, val) => {
        //     console.log(val.children[0].data);
        //     curr_item.event_name = val.children[0].data;
        // });
        // $(".date").each((i, val) => {               
        //     let dates = val.children.filter((item) => {
        //         return (item.name === "div");
        //     }).map((item) => {
        //         return item.children[0].data;
        //     });
        //     console.log(dates);
        //     curr_item.event_date = dates;
        // });
        // data_container.push(curr_item);
        // console.log(data_container);                          
    }
});