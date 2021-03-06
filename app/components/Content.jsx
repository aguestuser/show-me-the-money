const React = require('react');
const Marty = require('marty');
const BaseComponent = require('./BaseComponent');
const GraphContainer = require('./GraphContainer');
const { Row, Col, Nav, NavItem } = require('react-bootstrap');
const InfoContainer = require('./InfoContainer');
const DeckTitle = require('./DeckTitle');
const DeckNavButtons = require('./DeckNavButtons');
const Welcome = require('./Welcome');
const EmptyContent = require('./EmptyContent');
const GraphInfoTitle = require('./GraphInfoTitle');

class Content extends BaseComponent {
  constructor(options){
    super(options);
    this.bindAll('_handleSelect');
  }

  render() {
    return (
      <div id="mainContainer">
        { { 
          empty: <EmptyContent />,
          home: <Welcome />, 
          deck: (
            <div id="deck">
              <div className="hidden-sm hidden-xs">
                <Row id="mainRow">
                  <Col id="graphCol" md={8}>
                    <DeckTitle />
                    <GraphContainer />
                  </Col>
                  <Col id="infoCol" md={4}>
                    <DeckNavButtons />
                    <InfoContainer />
                  </Col>
                </Row>
              </div>
              <div className="visible-sm visible-xs">
                <DeckTitle />
                <DeckNavButtons />
                <GraphInfoTitle />
                <Nav id="contentTabs" bsStyle='pills' activeKey={this.props.tab} onSelect={this._handleSelect}>
                  <NavItem eventKey={'graph'} title='Map'>Map</NavItem>
                  <NavItem eventKey={'info'} title='Info'>Info</NavItem>
                </Nav>
                { {
                  graph: <GraphContainer />,
                  info: <InfoContainer />
                }[this.props.tab] }
              </div>
            </div>
          )
        }[this.props.content] }
      </div>
    );
  }

  _handleSelect(tab) {
    this.app.contentActions.selectTab(tab);
  }
}

module.exports = Marty.createContainer(Content, {
  listenTo: ['contentStore'],
  fetch: {
    content() {
      return this.app.contentStore.getContent();
    },
    tab() {
      return this.app.contentStore.getTab();
    }
  }
});