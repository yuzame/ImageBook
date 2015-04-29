var React = require('react');
var Actions = require('../actions/ImageBookActions');

var TIME = 800;

var Footer = React.createClass({
    render: function() {
        return (
            <footer id="footer">
              <Save
                handleTab={this.props.handleTab}
                tab={this.props.tab}
                url={this.props.url} />
              <Delete 
                handleTab={this.props.handleTab}
                tab={this.props.tab}
                index={this.props.index}
                url={this.props.url} />
            </footer>
        );
    }
});

var Save = React.createClass({

    getInitialState: function() {
        return {tab: this.props.tab};
    },

    handleChange: function(e) {
        this.setState({tab: e.target.value});
    },

    componentWillReceiveProps: function(p) {
        this.setState(p);
    },

    render: function() {
        return (
              <form id='save-form'>
                <input 
                  id="input-tab"
                  type="text"
                  className="tab-name"
                  name="tab-name"
                  placeholder="tab name"
                  value={this.state.tab}
                  onChange={this.handleChange} />
                <input 
                  id="input-url"
                  type="text"
                  className="image-url"
                  name="image-url"
                  placeholder="image url" />
                <button id='save' onClick={this.onClick} className="save">
                  <span>★</span>
                </button>
              </form>
        );
    },

    handleInvalidInput: function(element, message) {
        element.style.color = '#C67F7B';
        element.value = message;
        setTimeout(function() {
            element.value = '';
            element.style.color = '';
        }, TIME);
    },

    onClick: function(e) {
        e.preventDefault();
        var tabElement = document.getElementById("input-tab");
        var urlElement = document.getElementById("input-url");
        var tab = tabElement.value;
        var url = urlElement.value;
        if (tab === '') {
            this.handleInvalidInput(tabElement, 'input tab name');
            return;
        }
        if (url === '') {
            this.handleInvalidInput(urlElement, 'input image url');
            return;
        }
        Actions.save(tab, url);
        this.props.handleTab(tab);
        
        urlElement.style.color = '#49918D';
        urlElement.value = 'saved';
        setTimeout(function() {
            urlElement.value = '';
            urlElement.style.color = '';
        }, TIME);
    }

});

var Delete = React.createClass({

    render: function() {
        return (
            <div>
              <button id='delete' onClick={this.onDeleteClick}><span>✗</span></button>
              <button id='delete-tab' onClick={this.onDeleteTabClick}><span>♨</span></button>
            </div>
        );
    },

    onDeleteClick: function() {
        this.props.handleTab(this.props.tab, this.props.index);
        Actions.deleteImage(this.props.tab, this.props.index);
    },

    onDeleteTabClick: function() {
        Actions.deleteTab(this.props.tab);
    }
});

module.exports = Footer;
