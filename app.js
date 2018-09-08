const getData = () => {
    let req = new XMLHttpRequest();
    req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
    req.send();
    req.onload=()=>{
        json=JSON.parse(req.responseText);
        const dataset = json.data;
        const w = 1240;
        const h = 500;

        /* Padding between SVG canvas boundary and the plot */
        const padding = 40;

        /* Scale for x-axis  */
        let x_min = d3.min(dataset, (d) => new Date(d[0]));
        let x_max = d3.max(dataset, (d) => new Date(d[0]));
        // console.log('min', min, 'max', max);
        const xScale = d3.scaleTime()
                      .domain([x_min, x_max])
                      .range([padding, w - padding]);

        /* Scale for y-axis */
        let y_min = d3.min(dataset, (d) => d[1]);
        let y_max = d3.max(dataset, (d) => d[1]);
        const yScale = d3.scaleLinear()
                      .domain([0, y_max])
                      .range([h - padding, padding]);

        /* Add an SVG Canvas */
        const svg = d3.select(".container")
                   .append("svg")
                   .attr("class", "canvas");

        // Define the div for the tooltip
        var div = d3.select(".container")
                    .append("div")	
                    .attr("class", "tooltip")
                    .attr("id", "tooltip")
                    .style("opacity", 0);
        
        /* Add data points to SVG Canvas as bars */
        svg.selectAll("rect")
           .data(dataset)
           .enter()
           .append("rect")
           .attr("x", (d) => xScale(new Date(d[0])) - 4)
           .attr("y", (d) => yScale(d[1]))
           .attr("height", (d) => h - padding - yScale(d[1]))
           .attr("width", 4)
           .attr("fill", "#0EBFE9")
           .attr("class", "bar")
           .attr("data-date", (d) => (d[0]))
           .attr("data-gdp", (d) => (d[1]))
           .on("mouseover", (d) => {		
                div.transition()		
                   .duration(200)		
                   .style("opacity", .9);
                
                div.html(d[0] + "<br/>" + d[1])	
                   .style("left", (d3.event.pageX) + 10 + "px")		
                   .style("top", (d3.event.pageY - 28) + "px")
                   .attr("data-date", d[0]);
            })					
        .on("mouseout", function(d) {		
            div.transition()		
               .duration(500)		
               .style("opacity", 0);	
        });

        /* Added x and y axes to the left and bottom of the svg canvas */
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
        svg.append("g")
           .attr("id", "x-axis")
           .attr("transform", "translate(-5, " + (h - padding) + ")")
           .call(xAxis);

        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + 35 + ",0)")
            .call(yAxis);




    }


};