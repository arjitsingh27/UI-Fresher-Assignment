import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './MediaCard.css'



const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

class MediaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.data
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List style={getListStyle(snapshot.isDraggingOver)} className="list">

                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>

                    {(provided, snapshot) => (
                      <ListItem
                        ContainerComponent="li"
                        ContainerProps={{ ref: provided.innerRef }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )} className="listItem"
                      >
                        <ListItemIcon>
                          <img src={item.imageURL} alt={item.id} />
                          <h2>{item.uploadedBy}</h2>
                          <div>{item.title}</div>
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Fab color="secondary" aria-label="edit">
                            <EditIcon />
                          </Fab>
                          <Fab color="primary" aria-label="add">
                            <DeleteIcon onClick={()=>this.props.deleteHandle(item.id)}/>
                          </Fab>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}

                  </Draggable>

                ))}
                {provided.placeholder}
              </List>


            </RootRef>
          )}

        </Droppable>
      </DragDropContext>
    );
  }
}

export default MediaCard