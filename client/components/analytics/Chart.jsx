var React = require('react');
var Reflux = require('Reflux')
var AnalyticsStore = require('../../stores/AnalyticsStore');
var Actions = require('../../actions');
var d3 = require('d3');


var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var Rect = React.createClass({
    mixins: [SetIntervalMixin], 
    getDefaultProps: function() {
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    },
    
    getInitialState: function() {
      return {
        milliseconds: 0,
        height: 0
      };
    },
    
    shouldComponentUpdate: function(nextProps) {
      return this.props.height !== this.state.height;
    },
    
    componentWillMount: function() {
      console.log('will mount');
    },
    
    componentWillReceiveProps: function(nextProps) {
      this.setState({milliseconds: 0, height: this.props.height});
    },
    
    componentDidMount: function() {
      this.setInterval(this.tick, 10);
    },
    
    tick: function(start) {
      this.setState({milliseconds: this.state.milliseconds + 10});
    },
    
    render: function() {
      var easyeasy = d3.ease('back-out');
      var height = this.state.height + (this.props.height - this.state.height) * easyeasy(Math.min(1, this.state.milliseconds/1000));
      var y = this.props.height - height + this.props.y;
        return (
          <rect className="bar"
                height={height} 
                y={y} 
                width={this.props.width}
                x={this.props.x}
          >
          </rect>
        );
    },
});

var Bar = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    }
  },

  shouldComponentUpdate: function(nextProps) {
      return this.props.data !== nextProps.data;
  },

  render: function() {
    var props = this.props;
    var data = props.data.map(function(d) {
      return d.y;
    });

    var yScale = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);

    var bars = data.map(function(point, i) {
      var height = yScale(point),
          y = props.height - height,
          width = xScale.rangeBand(),
          x = xScale(i);

      return (
        <Rect height={height} 
              width={width} 
              x={x} 
              y={y} 
              key={i} />
      )
    });

    return (
          <g>{bars}</g>
    );
  }
});    

var Chart = React.createClass({
    render: function() {
        return (
            <svg width={this.props.width} 
                 height={this.props.height} >
              {this.props.children}
            </svg>
        )
    }
});

var Axis = React.createClass({
  render: function() {
    return <g></g>
  }
});

    
    
var App = React.createClass({
  mixins: [Reflux.connect(AnalyticsStore, 'analytics')],
  getDefaultProps: function() {
      return {
        width: 500,
        height: 500
      }
  },
  
  getInitialState: function() {
    return {
      data: [
        {x:'20', y:1},
        {x:'40', y:2},
        {x:'60', y:3},
        {x:'80', y:4},
        {x:'100', y:5}
      ]
    }
  },
  
  render: function() {
      return (
        <div>
          <Chart width={this.props.width} 
                 height={this.props.height}>
            <Bar data={this.props.data} 
                        width={this.props.width} 
                        height={this.props.height} />
          </Chart>
        </div>
      );
  }
});
            
module.exports = App;
