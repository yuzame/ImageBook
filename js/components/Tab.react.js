var React = require('react');
var Actions = require('../actions/ImageBookActions');

var Tabs = React.createClass({
    render: function() {
        var tabs = Object.keys(this.props.imagesState).map(function(tab) {
                return <Tab tab={tab}
                            key={tab}
                            handleTab={this.props.handleTab}
                            state={this.props.tabState} />;
            }.bind(this));
        return (
            <div id="tab">
              {tabs}
            </div>
        );
    }

});

var Tab = React.createClass({
    render: function() {
        var tab = this.props.tab;
        var selected = (tab === this.props.state)? "selected":"";
        return <li key={tab}
                   name={tab}
                   className={selected}
                   onClick={this.onClick}>{tab}</li>;
    },

    onClick: function(e) {
        e.preventDefault();
        this.props.handleTab(this.props.tab, -1);
    }
});

module.exports = Tabs;
