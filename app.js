const getData = () => {
    let req = new XMLHttpRequest();
    req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
    req.send();
    req.onload=()=>{
        json=JSON.parse(req.responseText);
        const dataset = json.data;
        // console.log(dataset);
        
        const w = 1000;
        const h = 500;

        /* Padding between SVG canvas boundary and the plot */
        const padding = 30;

        /* Scale for x-axis  */
        let x_min = d3.min(dataset, (d) => d[0]);
        let x_max = d3.max(dataset, (d) => d[0]);
        // console.log('min', min, 'max', max);
        const xScale = d3.scale.linear()
                      .domain([x_min, x_max])
                      .range([padding, w - padding]);

        /* Scale for y-axis */
        let y_min = d3.min(dataset, (d) => d[1]);
        let y_max = d3.max(dataset, (d) => d[1]);
        const yScale = d3.scale.linear()
                      .domain([y_min, y_max])
                      .range([h - padding, padding]);

        /* Add an SVG Canvas */
        const svg = d3.select(".container")
                   .append("svg")
                   .attr("width", w)
                   .attr("height", h)
                   .attr("display", "block")
                   .attr("margin", "auto");

        /* Add data points to SVG Canvas as bars */
        svg.selectAll("rect")
           .data(dataset)
           .enter()
           .append("rect")
           .attr("x", (d) => xScale(d[0]))
           .attr("y", (d) => yScale(d[1]));




    }


};