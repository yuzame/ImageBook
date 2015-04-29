var React = require('react');

var Header     = require('./Header.react');
var Tabs       = require('./Tab.react');
var ImageItems = require('./ImageItems.react');
var Footer     = require('./Footer.react');

var ImageStore = require('../stores/ImageStore');

var ImageBook = React.createClass({
    getInitialState: function() {
        return ImageStore.getInitialState();
    },

    componentDidMount: function() {
        ImageStore.addChangeListener(this.onBookChange);
    },

    handleMode: function(mode) {
        this.setState({mode: mode});
    },

    handleTab: function(tab, index) {
        this.setState({tab: tab, index: index});
    },

    handleImage: function(index, url) {
        this.setState({index: index, url: url});
    },

    onBookChange: function() {
        this.setState(ImageStore.getState());
    },

    render: function() {
  	    return (
            <div>
              <Header 
                handleMode={this.handleMode}
                modeState={this.state.mode} />
              <Tabs
                handleTab={this.handleTab}
                imagesState={this.state.images}
                tabState={this.state.tab} />
              <ImageItems                
                handleImage={this.handleImage}
                state={this.state} />
              <Footer
                handleTab={this.handleTab}
                tab={this.state.tab}
                index={this.state.index}
                url={this.state.url} />
            </div>
  	    );
    }
});

module.exports = ImageBook;
