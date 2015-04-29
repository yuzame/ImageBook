var React   = require('react');
var Actions = require('../actions/ImageBookActions');

var SIZE = 80;
var ERROR_IMAGE = "./img/ERROR.jpg";

var ImageItems = React.createClass({
    render: function() {
        var mode = this.props.state.mode;
        var tab  = this.props.state.tab;
        var indexState = this.props.state.index;
        var tabImages = this.props.state.images[tab] || [];
        var images = tabImages.map(function(url, i) {
            return <Image key={i+tab+url}
                          src={url}
                          mode={mode}
                          index={i}
                          tab={tab}
                          indexState={indexState}
                          handleImage={this.props.handleImage} />;
        }.bind(this));
        return (<div id='image-items'>{images}</div>);
    }
});

var Image = React.createClass({

    getInitialState: function() {
        return {loaded: false,
                wider:  false,
                src: this.props.src,
                tab: this.props.tab,
                index: this.props.index};
    },

    onLoad: function(e) {
        var img = e.target;
        var wider = (img.naturalWidth > img.naturalHeight)? true: false;
        this.setState({loaded: true, wider: wider});
    },

    onError: function() {
        this.getDOMNode().src = ERROR_IMAGE;
    },
    
    onClick: function() {
        Actions.copy(this.props.src, this.props.mode, this.props.tab);
        this.props.handleImage(this.props.index, this.props.src);        
    },

    render: function() {
        var selected = (this.props.index === this.props.indexState)? "selected":"";
        if (this.state.loaded) {
            if (this.state.wider) {
                return (<img src={this.state.src} width={SIZE}
                             className={selected}
                             onClick={this.onClick} />);
            } else {
                return (<img src={this.state.src} height={SIZE}
                             className={selected}
                             onClick={this.onClick} />);
            }
        } else {
            return (<img className={'unload'}
                         src={this.state.src} 
                         onLoad={this.onLoad}
                         onClick={this.onClick}
                         onError={this.onError} />);
        }        

    }

});

module.exports = ImageItems;
