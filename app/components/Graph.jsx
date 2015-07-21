const BaseComponent = require('./BaseComponent');
const Node = require('./Node');
const Edge = require('./Edge');
const Marty = require('marty');
const Draggable = require('react-draggable');
const _ = require('lodash');

class Graph extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    const sp = this._getSvgParams(this.props.graph);
    const offset = this.props.newCenter;
    const transform = offset ? `translate(${offset.x}, ${offset.y})` : null;
    const oldCenter = this.props.oldCenter ? (this.props.oldCenter.x + "," + this.props.oldCenter.y) : null;
    const newCenter = this.props.newCenter ? (this.props.newCenter.x + "," + this.props.newCenter.y) : null;
    console.log(oldCenter, newCenter);

    return (
      <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xlink="http://www.w3.org/1999/xlink" 
        className="Graph" 
        width='100%' 
        height='100%' 
        viewBox={sp.viewBox} 
        preserveAspectRatio="xMinYMin">
        <g id="zoom" transform={transform}>
          <defs dangerouslySetInnerHTML={ { __html: `<animateTransform xlink:href="#zoom" attributeName="transform" attributeType="XML" type="translate" from="${oldCenter}" to="${newCenter}" dur="2s" />` } } />
          <rect id="zoom-handle" x="-5000" y="-5000" width="10000" height="10000" fill="#fff" />
          { sp.edges }
          { sp.nodes }
          { sp.captions }
        </g>
        <defs dangerouslySetInnerHTML={ { __html: sp.markers } }/>
      </svg>
    );
  }

  _getSvgParams(graph) {
    return {
      edges: graph.edges.map(e => <Edge key={e.id} edge={e} />),
      nodes: graph.nodes.map(n => <Node key={n.id} node={n} />),
      markers: `<marker id="marker1" viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,-5L10,0L0,5" fill="#999"></path></marker><marker id="marker2" viewBox="-10 -5 10 10" refX="-8" refY="0" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,-5L-10,0L0,5" fill="#999"></path></marker><marker id="fadedmarker1" viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>`,
      viewBox: this._computeViewbox(this.props.shrinkFactor),
      captions: _.values(this.props.graph.display.captions || []).map(c => <text x={c.x} y={c.y}>{c.text}</text>)
    };
  }

  _computeViewbox(shrinkFactor = 1.2) {
    const rect = this.props.graph.computeViewbox();
    const w = rect.w * shrinkFactor;
    const h = rect.h * shrinkFactor;
    const x = rect.x + rect.w/2 - (w/2);
    const y = rect.y + rect.h/2 - (h/2);

    return `${x} ${y} ${w} ${h}`;
  }
}

module.exports = Marty.createContainer(Graph, {
  listenTo: ['deckStore'],
  fetch: {
    oldCenter() {
      const graphId = this.app.deckStore.getOldGraphId();

      if (!graphId) {
        return;
      }

      const graph = this.app.graphStore.getGraph(graphId);
      return graph.result.computeCenterOffset();
    },
    newCenter() {
      const graphId = this.app.deckStore.getCurrentGraphId();

      if (!graphId) {
        return;
      }

      const graph = this.app.graphStore.getGraph(graphId);
      return graph.result.computeCenterOffset();
    },
    shrinkFactor() {
      return this.app.deckStore.getShrinkFactor();
    }
  }
});