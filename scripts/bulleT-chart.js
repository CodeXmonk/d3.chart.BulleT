// Chart design based on original implementation by Mike Bostock:
// http://bl.ocks.org/mbostock/4061961
d3.chart("BulleT", {
	initialize: function() {
    var chart = this;
		this.xScale = d3.scale.linear();
		this.base.classed("BulleT", true);
		this.titleGroup = this.base.append("g")
			.style("text-anchor", "end");
		this.title = this.titleGroup.append("text")
			.attr("class", "title"); 
		this.dimension = this.titleGroup.append("text")
			.attr("class", "subtitle")
			.attr("dy", "1.2em");
		this.subtitle = this.titleGroup.append("text")
			.attr("class", "subtitle s2")
			.attr("dy", "2.4em");

		this._margin = { top: 0, right: 0, bottom: 0, left: 0 };
		// Default configuration
		this.duration(0);
		this.markers(function(d) {
			return d.markers;
		});
		this.measures(function(d) {
			return d.measures;
		});
		this.width(380);
		this.height(30);
		this.tickFormat(this.xScale.tickFormat(d3.format(".0d")));
    this.reverse(false);
		this.orient("left"); // TODO top & bottom
		this.terjedelem(function(d) {
			return d.terjedelem;
		});
		this.ranges(function(d) {
			return d.ranges;
		});
		this.rangesLine(function(d) {
			return d.rangesLine;
		});

		this.layer("ranges", this.base.append("g").classed("ranges", true), {
			dataBind: function(data) {
      var data_ranges = new Array();
				// This layer operates on "ranges" data
				data_ranges[0] = data.ranges[0];
				data_ranges[1] = data.ranges[1];
				data_ranges[2] = data.ranges[3];
				data_ranges[3] = data.ranges[4];
        terjedelem = data.terjedelem;
        data_ranges.unshift(terjedelem[1]);
        
				return this.selectAll("rect.range").data(data_ranges);
			},
			insert: function() {
				  return this.append("rect");
			},
			events: {
				enter: function(d, i) {
          var terjedelem = chart.terjedelem;
            this.attr("class", function(d, i) { return "range s" + i; })
						  .attr("width", chart.xScale)
						  .attr("height", chart.height())
						  .attr("x", this.chart()._reverse ? chart.xScale :  terjedelem[0]);
				},
				"merge:transition": function() {
          var terjedelem = chart.terjedelem;
					this.duration(chart.duration())
						.attr("width", chart.xScale)
						.attr("x", chart._reverse ? chart.xScale :  terjedelem[0]);
				},
				exit: function() {
					this.remove();
				}
			}
		});
/******************************************************************************/
		this.layer("rangesLine", this.base.append("g").classed("rangesLine", true), {
			dataBind: function(data) {
				// This layer operates on "ranges" data
				data_rangesLine = data.rangesLine;
				
        return this.selectAll("line.range").data(data_rangesLine);
			},
			insert: function() {
				  return this.append("line");
			},
			events: {
				enter: function(d, i) {
            this.attr("class", function(d, i) { return "range line"; })
              .attr("x1", chart.xScale)
              .attr("x2", chart.xScale)
              .attr("y1", 0)
              .attr("y2", chart.height() );
				},
				"merge:transition": function() {
            this.attr("class", function(d, i) { return "range line"; })
              .attr("x1", chart.xScale)
              .attr("x2", chart.xScale)
              .attr("y1", 0)
              .attr("y2", chart.height() );
              
				},
				exit: function() {
					this.remove();
				}
			}
		});
/******************************************************************************/

		this.layer("measures", this.base.append("g").classed("measures", true), {
			dataBind: function(data) {
				data_measures = data.measures;
        var terjedelem = data.terjedelem;
        data_measures.unshift(terjedelem[1]);

				return this.selectAll("rect.measure").data(data_measures);
			},
			insert: function() {
				return this.append("rect");
			},
			events: {
				enter: function() {
					var hy = chart.height() / 2;
          var terjedelem = chart.terjedelem();
					this.attr("class", function(d, i) { return "measure s" + i; })
						.attr("width", chart.xScale)
						.attr("height", hy)
						.attr("x", terjedelem[0])
						.attr("y", hy/2);
				},
				"merge:transition": function() {
          var terjedelem = chart.terjedelem;
					this.duration(chart.duration())
						.attr("width", chart.xScale)
						.attr("x", terjedelem[0])
				}
			}
		});
/******************************************************************************/
		this.layer("markerSample", this.base.append("g").classed("markerSample", true), {
			dataBind: function(data) {
				data = data.markers;
				return this.selectAll("line.marker").data(data.slice(0,1));
			},
			insert: function() {
				return this.append("line");
			},
			events: {
				enter: function() {
					var height = chart.height();
            this.attr("class", "marker Sample")
						  .attr("x1", chart.xScale)
						  .attr("x2", chart.xScale)
						  .attr("y1", height / 4)
						  .attr("y2", height - (height / 4) );
				},
				"merge:transition": function() {
					var height = chart.height();
            this.duration(chart.duration())
						  .attr("x1", chart.xScale)
						  .attr("x2", chart.xScale)
						  .attr("y1", height / 4)
						  .attr("y2", height - (height / 4) );
				}
			}
		});
/******************************************************************************/
		this.layer("markerSubject", this.base.append("g").classed("markerSubject", true), {
			dataBind: function(data) {
				// This layer operates on "markers" data
				data = data.markers;
				  return this.selectAll("rect.marker").data(data.slice(1,2));
			},
			insert: function() {
				  return this.append("rect");
			},
			events: {
				enter: function() {
					var height = chart.height();
            this.attr("class", "marker Subject")
              .attr("width", 6)
              .attr("y", -(height/10))
              .attr("height",function(d) {return height+(height/5);})
              .attr("x", chart.xScale)
              .attr("transform", "translate(-3,0)");
				},
				"merge:transition": function() {
					var height = chart.height();
            this.duration(chart.duration())
              .attr("width", 6)
              .attr("y", -(height/10))
              .attr("height",function(d) {return height+(height/5);})
              .attr("x", chart.xScale)
              .attr("transform", "translate(-3,0)");
				}
			}
		});
/******************************************************************************/

		this.layer("ticks", this.base.append("g").classed("ticks", true), {
			dataBind: function() {
				var format = this.chart().tickFormat();
				return this.selectAll("g.tick").data(this.chart().xScale.ticks(8), function(d) {
					return this.textContent || format(d);
				});
			},
			insert: function() {
				var tick = this.append("g").attr("class", "tick");
				var height = chart.height();
				var format = chart.tickFormat();

				tick.append("line")
					.attr("y1", height)
					.attr("y2", height * 7 / 6);

				tick.append("text")
					.attr("text-anchor", "middle")
					.attr("dy", "1em")
					.attr("y", height * 7 / 6)
					.text(format);

				return tick;
			},
			events: {
				enter: function() {
					this.attr("transform", function(d) {
							return "translate(" + chart.xScale(d) + ",0)";
						})
						.style("opacity",1);
				},
				"merge:transition": function() {
					var height = chart.height();

					this.duration(chart.duration())
						.attr("transform", function(d) {
							return "translate(" + chart.xScale(d) + ",0)";
						})
						.style("opacity", 1);
					this.select("line")
						.attr("y1", height)
						.attr("y2", height * 7 / 6);
					this.select("text")
						.attr("y", height * 7 / 6);
				},
				"exit:transition": function() {
					this.duration(chart.duration())
						.attr("transform", function(d) {
							return "translate(" + chart.xScale(d) + ",0)";
						})
						.style("opacity", 1e-6)
						.remove();
				}
			}
		});

		d3.timer.flush();
	},

	transform: function(data) {
		// Copy data before sorting
		var newData = {
			title: data.title,
			dimension: data.dimension,
			randomizer: data.randomizer,
			terjedelem: data.terjedelem.slice(),
			ranges: data.ranges.slice().sort(d3.descending),
			rangesLine: data.rangesLine.slice(),
			measures: data.measures.slice().sort(d3.descending),
			markers: data.markers.slice()
		};
		this.xScale.domain([newData.terjedelem[0], newData.terjedelem[1]]);
		this.title.text(data.title);
		this.dimension.text(data.dimension+"[T]");
		this.subtitle.text(data.markers[1]);

		this.subtitle.attr("class",function(d) {
          switch (true)
          {
            case ( (data.markers[1] < 30) || (70 < data.markers[1]) ): 
              return "subtitle s04";
              break;
              break;
            case ( (30 <= data.markers[1]) && (data.markers[1] < 40) ):
              return "subtitle s13";
              break;
            case ( (40 <= data.markers[1]) && (data.markers[1] <= 60) ):
              return "subtitle s2";
              break;
            case ( (60 < data.markers[1]) && (data.markers[1] <= 70) ):
              return "subtitle s13";
              break;
          }
        }
      )
			.attr("dy",function(d) {
          switch (true)
          {
            case ( (data.markers[1] < 30) || (70 < data.markers[1]) ): 
              return "2em";
              break;
              break;
            default:
              return "2.4em";
              break;
          }
        }
      )// "2.4em");

		return newData;
	},

	// left, right, top, bottom
	reverse: function(x) {
		if (!arguments.length) return this._reverse;
		this._reverse = x;
		return this;
	},

	// left, right, top, bottom
	orient: function(x) {
		if (!arguments.length) return this._orient;
		this._orient = x;
		this._reverse = this._orient == "right" || this._orient == "bottom";
		return this;
	}, 

	// terjedelem (20,80)
	terjedelem: function(x) {
		if (!arguments.length) return this._terjedelem;
		this._terjedelem = x;
		return this;
	},

	// ranges (bad, satisfactory, good)
	ranges: function(x) {
		if (!arguments.length) return this._ranges;
		this._ranges = x;
		return this;
	}, 

	// ranges (bad, satisfactory, good)
	rangesLine: function(x) {
		if (!arguments.length) return this._ranges;
		this._ranges = x;
		return this;
	},

	// markers (previous, goal)
	markers: function(x) {
		if (!arguments.length) return this._markers;
		this._markers = x;
		return this;
	},

	// measures (actual, forecast)
	measures: function(x) {
		if (!arguments.length) return this._measures;
		this._measures = x;
		return this;
	},

	width: function(x) {
		var margin;
		if (!arguments.length) {
			return this._width;
		}
		margin = this.margin();
		x -= margin.left + margin.right
		this._width = x;    
		this.xScale.range(this._reverse ? [x, 0] : [0, x]);

		this.base.attr("width", x);

		return this;
	},

	height: function(x) {
		var margin;
		if (!arguments.length) {
			return this._height;
		}
		margin = this.margin();
		x -= margin.top + margin.bottom;
		this._height = x;

		this.base.attr("height", x);
		this.titleGroup.attr("transform", "translate(-16," + x / 3 + ")");

		return this;
	},

	margin: function(margin) {
		if (!margin) {
			return this._margin;
		}

		["top", "right", "bottom", "left"].forEach(function(dimension) {
			if (dimension in margin) {
				this._margin[dimension] = margin[dimension];
			}
		}, this);

		this.base.attr("transform", "translate(" + this._margin.left + "," +
			this._margin.top + ")")

		return this;
	},

	tickFormat: function(x) {
		if (!arguments.length) return this._tickFormat;
		this._tickFormat = x;
		return this;
	}, 

	duration: function(x) {
		if (!arguments.length) return this._duration;
		this._duration = x;
		return this;
	}
});
