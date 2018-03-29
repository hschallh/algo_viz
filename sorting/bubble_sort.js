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

    var svg = d3.select("#bubble_sort")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    sort(unsorted);

    function color(number) {
        return "hsl(" + (number / num_of_els * 360) + ", 75%, 65%)";
    }

    function update(unsorted_data, bubble) {
        var unsorted_blocks = svg.selectAll('.unsorted_block')
            .data(unsorted_data, d => d)
            .attr('x', (d, i) => i * el_width)
            .attr('y', (d, i) => (height - el_height) / 2 + (i == bubble || i == bubble + 1 ? -10 : 0));

        unsorted_blocks.exit().remove();

        unsorted_blocks.enter().append('rect')
            .attr('class', 'unsorted_block')
            .attr('y', (d, i) => height / 2 + (i == bubble || i == bubble + 1 ? -10 : 0))
            .attr('x', (d, i) => i * el_width)
            .attr('width', el_width)
            .attr('height', el_height)
            .attr('fill', d => color(d));
    }

    function sort(data) {
        var bubble = 0,
            count = data.length;

        var step = setInterval(() => {
            update(data, bubble);
            if (bubble < count - 1) {
                if (data[bubble] > data[bubble + 1]) {
                    var tmp = data[bubble];
                    data[bubble] = data[bubble + 1];
                    data[bubble + 1] = tmp;
                }
                bubble++;
            } else {
                count--;
                bubble = 0;
            }
            if (count === 0) {
                update(data, -9);
                clearInterval(step);
            }
        }, 20);
    }
})();