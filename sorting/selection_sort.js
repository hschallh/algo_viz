(function() {
    var margin = {
            top: 50,
            left: 50,
            right: 50,
            bottom: 50
        },
        height = 500 - margin.top - margin.bottom,
        width = 900 - margin.left - margin.right;

    var num_of_els = 100,
        el_height = height / 3,
        el_width = width / num_of_els;

    var unsorted = [...Array(num_of_els).keys()].sort(() => 0.5 - Math.random());

    var svg = d3.select("#selection_sort")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    sort(unsorted);

    function color(number) {
        console.log(number);
        return "hsl(" + (number / num_of_els * 360) + ", 75%, 65%)";
    }

    function update(unsorted_data, sorted_data, selected, smallest) {
        var unsorted_blocks = svg.selectAll('.unsorted_block')
            .data(unsorted_data, d => d)
            .attr('x', (d, i) => i * el_width)
            .attr('y', (d, i) => el_height / 2 + (i == selected ? -10 : i == smallest ? 10 : 0));

        unsorted_blocks.exit().remove();

        unsorted_blocks.enter().append('rect')
            .attr('class', 'unsorted_block')
            .attr('y', (d, i) => el_height / 2 + (i == selected ? -10 : i == smallest ? 10 : 0))
            .attr('x', (d, i) => i * el_width)
            .attr('width', el_width)
            .attr('height', el_height)
            .attr('fill', d => color(d));

        var sorted_blocks = svg.selectAll('.sorted_block')
            .data(sorted_data, d => d);

        sorted_blocks.exit().remove();

        sorted_blocks.enter().append('rect')
            .attr('class', 'sorted_block')
            .attr('y', el_height * 2)
            .attr('x', (d, i) => i * el_width)
            .attr('width', el_width)
            .attr('height', el_height)
            .attr('fill', d => color(d));
    }

    function sort(data) {
        var selected = 0,
            smallest = 0,
            sorted = [];

        var step = setInterval(() => {
            smallest = data[selected] < data[smallest] ? selected : smallest;
            selected++;
            if (selected == data.length) {
                sorted.push((data[smallest]));
                data.splice(smallest, 1);
                selected = 0;
                smallest = 0;
            }
            update(data, sorted, selected, smallest);
            if (data.length === 0) {
                clearInterval(step);
            }
        }, 20);
    }
})();