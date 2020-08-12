import React, { Component } from "react";
import Portal from '../Portal/Portal'
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from "semantic-ui-react";


export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {AdjustSlow, AdjustAverage, AdjustFast, setDijkstra, settest, NoiseMap, RandomMaze, disabled} = this.props;

    return (
      <Menu size="huge" fixed="top" inverted={true} style={{ backgroundColor: "#061830" }}>
        <Container>
          <Menu.Item as="a" header>
          <Image size="mini" src={require("../../images/pathFinderLogo.png")} style={{ marginLeft: "-3em", marginRight: "1em" }}/>
            Path Finding Algorithm Visualizer
          </Menu.Item>
        
          <Dropdown item simple text="Algorithms">
            <Dropdown.Menu >
              <Dropdown.Item  onClick={() => setDijkstra()}>Dijkstra</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={() => settest()}>Coolio</Dropdown.Item>
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
          <Dropdown item simple text="Mazes">
          <Dropdown.Menu>
              <Dropdown.Item disabled={disabled} onClick={() => RandomMaze()}>Random Maze</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item disabled={disabled} onClick={() => NoiseMap()}>Noise Map</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item position="right"> 
            <Portal>
            </Portal>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}