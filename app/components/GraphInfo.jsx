const React = require('react');
const Marty = require('marty');
const BaseComponent = require('./BaseComponent');

class GraphInfo extends BaseComponent {
  constructor() {
    super();
  }

  render(){
    return (
      <div className="mapInfo">
        <div className="title hidden-sm hidden-xs">
          <h2>{this.props.info.title}</h2>
        </div>
        <div className="text"
             dangerouslySetInnerHTML=
             { { __html: this.props.info.description } }
        />
      </div>
    );
  }
}

module.exports = GraphInfo;
