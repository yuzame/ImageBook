var React = require('react');

var Header = React.createClass({
    
    render: function() {
        var modes = ["plain", "markdown", "html"].map(function(n) {
                return <Mode key={n}
                             name={n}
                             state={this.props.modeState}
                             handleMode={this.props.handleMode} />;
        }.bind(this));

        return (
            <header id="header">
                {modes}
            </header>
        );
    }

});

var Mode = React.createClass({

    render: function() {
        var name = this.props.name;
        var selected = (name === this.props.state)? "selected":"";
        return (
            <li className={selected}
                onClick={this.onClick}>{name}</li>
        );
    },

    onClick: function(e) {
        e.preventDefault();
        this.props.handleMode(this.props.name);
    }

});

module.exports = Header;
