import React, { useState } from 'react';
import { DragIcon } from '../components/icons';
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';
let myArr = [
  {
    studenName: 'Jack',
    studenClass: 6,
    studenSection: 'a',
  },
  {
    studenName: 'Tom',
    studenClass: 6,
    studenSection: 'a',
  },
  {
    studenName: 'Mahid',
    studenClass: 6,
    studenSection: 'a',
  },
  {
    studenName: 'Joy',
    studenClass: 6,
    studenSection: 'a',
  },
  {
    studenName: 'Sahan',
    studenClass: 6,
    studenSection: 'a',
  },
];

const ListItem = ({ item, index, students }) => {
  return (
    <React.Fragment>
      <Draggable draggableId={item.studenName + index.toString()} index={index}>
        {(provided, snapshot) => {
          const style = {
            ...provided.draggableProps.style,
            left: 'auto !important',
            top: 'auto !important',
          };
          const lastListItem = students.length - 1 == index;
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              style={style}
            >
              <div
                style={{
                  paddingBottom: lastListItem ? '0' : '16px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  {...provided.dragHandleProps}
                  style={{
                    width: '40px',
                    height: '45px',
                    background: 'dodgerblue',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    fontSize: '24px',
                  }}
                >
                  <DragIcon />
                </span>
                <div
                  style={{
                    padding: '12px',
                    background: 'white',
                    margin: '0',
                    flexGrow: '1',
                    boxShadow: '0 4px 12px 0 rgb(0 0 0/15%)',
                  }}
                >
                  <h4
                    style={{
                      margin: '0',
                    }}
                  >
                    {item.studenName}
                  </h4>
                </div>
              </div>
            </div>
          );
        }}
      </Draggable>
    </React.Fragment>
  );
};

const List = ({students}) => {
  return (
    <>
      {students.map((item, index) => (
        <ListItem item={item} key={index} index={index} students={students} />
      ))}
    </>
  );
};


export default function Home() {
  const [students, setStudents] = useState(myArr);
  resetServerContext();
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };
    setStudents(
      reorder(students, result.source.index, result.destination.index)
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>React Beautiful DND</h1>
      <div className="main-container">
        <div
          style={{
            margin: '24px',
            padding: '16px',
            border: '2px solid rgb(0 0 0/10%)',
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-1" type="PERSON">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? 'lightblue'
                      : 'white',
                  }}
                  {...provided.droppableProps}
                >
                  <List students={students}/>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
