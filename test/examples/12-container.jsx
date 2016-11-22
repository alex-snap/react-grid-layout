'use strict';
var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var _ = require('lodash');
var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout);


var NestedLayout = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    onLayoutChange: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      className: "layout",
      items: 20,
      rowHeight: 30,
      cols: 12,
      verticalCompact: false
    };
  },

  getInitialState() {
    var layout = this.generateLayout();
    return {
      layout: layout
    };
  },

  generateDOM() {
    return _.map(this.state.layout, function(item, i) {
      return (
        <div key={i}>
          <span className="text">
            {item.static && <span>Static</span>}
            {item.container && <span>container</span>}
            {i}
          </span>
        </div>
      );
    });
  },

  generateLayout() {
    var p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      var y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
      return {
        x: i * 2 % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        container: Math.random() < 0.5
      };
    });
  },

  onLayoutChange: function(layout) {
    this.props.onLayoutChange(layout);
  },

  onDropIntoContainer: function (layout, elementClone, element, container, e, f) {

  },

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        onDragStop={this.onDragStop}
        onDropIntoContainer={this.onDropIntoContainer}
          {...this.props}>
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
});

module.exports = NestedLayout;

if (require.main === module) {
  require('../test-hook.jsx')(module.exports);
}
