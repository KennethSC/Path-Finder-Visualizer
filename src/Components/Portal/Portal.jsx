import React, { Component } from 'react'
import vid from '../../images/Tutorial.mp4';
import './Portal.css';

import {
  Icon,
  List,
  Button,
  Header,
  Segment,
  Divider,
  TransitionablePortal,
} from 'semantic-ui-react'

export default class Portal extends Component {
  state = { open: false }

  handleClick = () => this.setState((prevState) => ({ open: !prevState.open }))
  handleClose = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <div>
        <Button
          size="big"
          style={{marginLeft: '26.5em', width: "105px", height: "47.7px"}}
          content={open ? 'Close' : 'Help'}
          negative={open}
          positive={!open}
          onClick={this.handleClick}
        />

        <TransitionablePortal onClose={this.handleClose} open={open}>
          <Segment inverted={true} 
           style={{ backgroundColor: "#061830", marginLeft: '28.2em', height: '530px',
           position: 'fixed', top: '15%', zIndex: 1000, width: '675px' }}
           >
            <Header as='h1' textAlign='center'>Visualizer Tutorial</Header>
            <Divider>
            </Divider>
            <List inverted size='large'>
                <List.Item inverted as='a'>
                <Icon name='arrow right' />
                    <List.Content>
                        <List.Header>Choose an algorithm from the Algorithms dropdown menu.</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item inverted as='a'>
                <Icon name='arrow right' />
                    <List.Content>
                        <List.Header>Choose how fast you want to see the algorithm run from the Speed dropdown menu.</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item inverted as='a'>
                <Icon name='arrow right' />
                    <List.Content>
                        <List.Header>Click and drag anywhere on the grid to create walls or create a maze
                          with the Mazes dropdown menu for the algorithm to traverse.</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item inverted as='a'>
                <Icon name='arrow right' />
                    <List.Content>
                        <List.Header>Click on the 'Visualize' button to animate the algorithm and watch it find the 
                            shortest path from the start node to the target node.
                        </List.Header>
                    </List.Content>
                </List.Item>
            </List>
            <video className="vid" autoPlay loop > 
                <source src={vid} type='video/mp4' />
            </video>
          </Segment>
        </TransitionablePortal>
      </div>
    )  
  }
}
