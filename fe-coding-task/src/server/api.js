import axios from "axios";
import { chartData } from "../data/data";

export const getData = async (data1) =>{
    const allData = [chartData.map(el => el.label)]
    const postData = allData[0].slice(allData[0].indexOf(data1.start), allData[0].indexOf(data1.end)+1)

    const data= {
        query:[
            {
                code:"Boligtype",
                selection:{
                    filter:"item",
                    values:[data1.type]
                }
            },
            {
                code:"ContentsCode",
                selection:{
                    filter:"item",
                    values:[
                        "KvPris"
                    ]
                }
            },
            {
                code:"Tid",
                selection:{
                    filter:"item",
                    values:[...postData]
                }
            }
        ],
        response:{
            format:"json-stat2"
        }
    }

    return  axios.post(`https://data.ssb.no/api/v0/no/table/07241`, data )
        .then(function (response) {
            let chartData= []
            response.data.value.forEach((item, i) => {
                let a ={
                    name:postData[i],
                    pv:item
                }
                chartData.push(a)
            })
            return chartData
        })
        .catch(function (error) {
            console.log(error);
            return error

        });


}