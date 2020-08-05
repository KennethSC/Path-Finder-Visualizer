import React, { Component } from "react";
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Button,
} from "semantic-ui-react";


export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //hideFixedMenu = () => this.setState({ fixed: false });
 // showFixedMenu = () => this.setState({ fixed: true });

  render() {
    //const { fixed } = this.state;
    const { onVisiualizePressed, onClearPressed, AdjustSlow, AdjustAverage, AdjustFast, setDijkstra } = this.props;

    return (
      <Menu size="huge" fixed="top" inverted style={{ backgroundColor: "#061830" }}>
        <Container>
          <Menu.Item as="a" header>
          <Image size="mini" src={require("../../images/pathFinderLogo.png")} style={{ marginRight: "1em" }}/>
            Path Finding Algorithm Visualizer
          </Menu.Item>
        
          <Dropdown className="AlgoDropDown" item simple text="Algorithms">
            <Dropdown.Menu >
              <Dropdown.Item onClick={() => setDijkstra()}>Dijkstra</Dropdown.Item>
              <Dropdown.Divider/>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item simple text="Speed">
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => AdjustSlow()}>Slow</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={() => AdjustAverage()}>Average</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={() => AdjustFast()}>Fast</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item position="center"> 
            <Button  style={{ marginRight: 16 }} color="blue" onClick={() => onVisiualizePressed()}>
              Visualize
            </Button>
            <Button color="red" style={{ marginRight: 16 }} onClick={() => onClearPressed()}>
              Clear Grid
            </Button>
            <Button color="green" style={{ marginRight: 16 }} >
              Help
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}