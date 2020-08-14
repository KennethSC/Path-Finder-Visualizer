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
    const {AdjustSlow, AdjustAverage, AdjustFast, setDijkstra, setAStar, setBFS, setDFS, NoiseMap, RandomMaze} = this.props;

    return (
      <Menu size="huge" fixed="top" inverted={true} style={{ backgroundColor: "#061830" }}>
        <Container>
          <Menu.Item as="a" header>
          <Image size="mini" src={require("../../images/pathFinderLogo.png")} style={{ marginLeft: "-6em", marginRight: "1em" }}/>
            Path Finding Algorithm Visualizer
          </Menu.Item>
        
          <Dropdown item simple text="Algorithms">
            <Dropdown.Menu >
              <Dropdown.Item  onClick={() => setDijkstra()}>Dijkstra</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={() => setAStar()}>A*</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={() => setBFS()}>BFS</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={() => setDFS()}>DFS</Dropdown.Item>
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
              <Dropdown.Item onClick={() => RandomMaze()}>Random Maze</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={() => NoiseMap()}>Noise Map</Dropdown.Item>
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