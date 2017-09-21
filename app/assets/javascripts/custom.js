$(document).on('turbolinks:load', function() {  
	$('#manage_users_table').DataTable({
		responsive: true
	});	
	$('#more_maps_table').DataTable({
		responsive: true
	});	
	$('#vsd_table').DataTable({
		scrollX: true		
	});	
	$('#vgs_table').DataTable({
		scrollX: true		
	});	
	$('#graphColorPicker').minicolors({
		theme:'bootstrap'
	})
	//Slide button
	var clicked=false;
	$("#settingsBtn").on('click', function(){
	    if(clicked){
	        clicked=false;        
	        $( "#settings-section" ).animate({right:-400}, 500);
	        $(this).animate({right:0},500);
	    }else{	        
	        clicked=true;                
	        $( "#settings-section" ).animate({right: 0}, 500);    
	        $(this).animate({right:400},500);
	    }
	});
	$('.menu-item').on('click',function(){
		console.log('testing');
	})

	/* Create Tagify Data */
	var traitValues = $('#traitValues').val();
	var res = traitValues.replace("[", "");
	res = res.replace(']','');
	res = res.replace(/"/g, "");
	var traitsArray = res.split(',');	
	

	var traitgroupsValues = $('#traitgroupValues').val();
	res = traitgroupsValues.replace("[", "");
	res = res.replace("]", "");
	res = res.replace(/"/g, "");
	var traitsGroupArray = res.split(',');


	var tagsValues = $('#tagsValues').val();
	res = tagsValues.replace("[", "");
	res = res.replace("]", "");
	res = res.replace(/"/g, "");
	var tagsArray = res.split(',');	

	var statisticsArray = ["Minimum Score",'Maximum Score', 'Count 0-20', 'Count 21-40', 'Count 41-60', 'Count 61-80', 'Count 81-100', 'Mean'];
	//Tagify 
	var input2 = document.querySelector('#inGroups');
		
    var tagify2 = new Tagify(input2, {
        duplicates : true,        
        whitelist: traitsGroupArray
    });
	
	input2 = document.querySelector('#exGroups');
		
    tagify2 = new Tagify(input2, {
        duplicates : true,        
        whitelist: traitsGroupArray
    });
	
	input2 = document.querySelector('#inTraits');
		
    tagify2 = new Tagify(input2, {
        duplicates : true,        
        whitelist: traitsArray
    });

	input2 = document.querySelector('#exTraits');
		
    tagify2 = new Tagify(input2, {
        duplicates : true,        
        whitelist: traitsArray
    });

	input2 = document.querySelector('#exStats');
		
    tagify2 = new Tagify(input2, {
        duplicates : true,        
        whitelist: statisticsArray
    });

	input2 = document.querySelector('#inStats');
		
    tagify2 = new Tagify(input2, {
        duplicates : true,        
        whitelist: statisticsArray
    });
	input2 = document.querySelector('#inTags');
			
	    tagify2 = new Tagify(input2, {
	        duplicates : true,        
	        whitelist: tagsArray
	    });
	input2 = document.querySelector('#exTags');
			
	    tagify2 = new Tagify(input2, {
	        duplicates : true,        
	        whitelist: tagsArray
	    });
	/* Checkbox Buttons */
	
    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color');

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "off" : "on");            

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-primary active')
                    .addClass('btn-default');
            }
            else {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-primary active');
            }
        }

        // Initialization
        function init() {
            updateDisplay();
        }
        init();
    });
	$(".modal").on("hidden.bs.modal", function(){			
	    $('#trait-group-name-input').val('');
	    $('.button-checkbox input:checkbox').each(function(){$(this).prop('checked','false');})
	    $('.button-checkbox button').each(function(){$(this).removeClass('btn-primary active').addClass('btn-default');})
	});
	$('#ctg_modal').submit(function(e){
		e.preventDefault();
		var hs = '';
		$('.button-checkbox button.active').each(function(){			
			hs += $(this).text() + ',';
			$('#selected_traits').val(hs);

		});
		var self = this;
		self.submit();
	});

	var correlationMatrix = [
        [1, 0.3, 0, 0.8, 0, 0.2, 1, 0.5, 0, 0.75],
        [0.3, 1, 0.5, 0.2, 0.4, 0.3, 0.8, 0.1, 1, 0],
        [0, 0.5, 1, 0.4, 0, 0.9, 0, 0.2, 1, 0.3],
        [0.8, 0.2, 0.4, 1, 0.3, 0.4, 0.1, 1, 0.2, 0.9],
        [0, 0.4, 0, 0.3, 1, 0.1, 0.4, 0, 0.6, 0.7],
        [0.2, 0.3, 0.9, 0.4, 0.1, 1, 0, 0.1, 0.4, 0.1],
        [1, 0.8, 0, 0.1, 0.4, 0, 1, 0.5, 0, 1],
        [0.5, 0.1, 0.2, 1, 0.1, 0, 0.5, 1, 0, 0.4],
        [0, 1, 1, 0.2, 0.6, 0.4, 0, 0, 1, 0.6],
        [0.75, 0, 0.3, 0.9, 0.7, 0.1, 1, 0.4, 0.6, 1]
    ];

    var labels = ['Var 1', 'Var 2', 'Var 3', 'Var 4', 'Var 5', 'Var 6', 'Var 7', 'Var 8', 'Var 9', 'Var 10'];

    Matrix({
        container : '#container',
        data      : correlationMatrix,
        labels    : labels,
        start_color : '#ffffff',
        end_color : '#3498db'
    });

    function Matrix(options) {
	var margin = {top: 50, right: 50, bottom: 100, left: 100},
	    width = 350,
	    height = 350,
	    data = options.data,
	    container = options.container,
	    labelsData = options.labels,
	    startColor = options.start_color,
	    endColor = options.end_color;

	var widthLegend = 100;

	if(!data){
		throw new Error('Please pass data');
	}

	if(!Array.isArray(data) || !data.length || !Array.isArray(data[0])){
		throw new Error('It should be a 2-D array');
	}

    var maxValue = d3.max(data, function(layer) { return d3.max(layer, function(d) { return d; }); });
    var minValue = d3.min(data, function(layer) { return d3.min(layer, function(d) { return d; }); });

	var numrows = data.length;
	var numcols = data[0].length;

	var svg = d3.select(container).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var background = svg.append("rect")
	    .style("stroke", "black")
	    .style("stroke-width", "2px")
	    .attr("width", width)
	    .attr("height", height);

	var x = d3.scale.ordinal()
	    .domain(d3.range(numcols))
	    .rangeBands([0, width]);

	var y = d3.scale.ordinal()
	    .domain(d3.range(numrows))
	    .rangeBands([0, height]);

	var colorMap = d3.scale.linear()
	    .domain([minValue,maxValue])
	    .range([startColor, endColor]);

	var row = svg.selectAll(".row")
	    .data(data)
	  	.enter().append("g")
	    .attr("class", "row")
	    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

	var cell = row.selectAll(".cell")
	    .data(function(d) { return d; })
			.enter().append("g")
	    .attr("class", "cell")
	    .attr("transform", function(d, i) { return "translate(" + x(i) + ", 0)"; })	 
	    .on('mouseover',function(){
	    	d3.select(this).select('text').style('opacity',1);
	    }).on('mouseout',function(){
	    	d3.select(this).select('text').style('opacity',0);
	    });   

	cell.append('rect')
	    .attr("width", x.rangeBand())
	    .attr("height", y.rangeBand())
	    .style("stroke-width", 0);

    cell.append("text")
	    .attr("dy", ".32em")
	    .attr("x", x.rangeBand() / 2)
	    .attr("y", y.rangeBand() / 2)
	    .attr("text-anchor", "middle")
	    .style("fill", function(d, i) { return d >= maxValue/2 ? 'white' : 'black'; })
	    .text(function(d, i) { return d; })	    

	row.selectAll(".cell")
	    .data(function(d, i) { return data[i]; })
	    .style("fill", colorMap);

	var labels = svg.append('g')
		.attr('class', "labels");

	var columnLabels = labels.selectAll(".column-label")
	    .data(labelsData)
	    .enter().append("g")
	    .attr("class", "column-label")
	    .attr("transform", function(d, i) { return "translate(" + x(i) + "," + height + ")"; });

	columnLabels.append("line")
		.style("stroke", "black")
	    .style("stroke-width", "1px")
	    .attr("x1", x.rangeBand() / 2)
	    .attr("x2", x.rangeBand() / 2)
	    .attr("y1", 0)
	    .attr("y2", 5);

	columnLabels.append("text")
	    .attr("x", 0)
	    .attr("y", y.rangeBand() / 2)
	    .attr("dy", ".82em")
	    .attr("text-anchor", "end")
	    .attr("transform", "rotate(-60)")
	    .text(function(d, i) { return d; });

	var rowLabels = labels.selectAll(".row-label")
	    .data(labelsData)
	  .enter().append("g")
	    .attr("class", "row-label")
	    .attr("transform", function(d, i) { return "translate(" + 0 + "," + y(i) + ")"; });

	rowLabels.append("line")
		.style("stroke", "black")
	    .style("stroke-width", "1px")
	    .attr("x1", 0)
	    .attr("x2", -5)
	    .attr("y1", y.rangeBand() / 2)
	    .attr("y2", y.rangeBand() / 2);

	rowLabels.append("text")
	    .attr("x", -8)
	    .attr("y", y.rangeBand() / 2)
	    .attr("dy", ".32em")
	    .attr("text-anchor", "end")
	    .text(function(d, i) { return d; });

    var key = d3.select("#legend")
    .append("svg")
    .attr("width", widthLegend)
    .attr("height", height + margin.top + margin.bottom);

    var legend = key
    .append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "100%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

    legend
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", endColor)
    .attr("stop-opacity", 1);

    legend
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", startColor)
    .attr("stop-opacity", 1);

    key.append("rect")
    .attr("width", widthLegend/2-10)
    .attr("height", height)
    .style("fill", "url(#gradient)")
    .attr("transform", "translate(0," + margin.top + ")");

    var y = d3.scale.linear()
    .range([height, 0])
    .domain([minValue, maxValue]);

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("right");

    key.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(41," + margin.top + ")")
    .call(yAxis)
}
});

