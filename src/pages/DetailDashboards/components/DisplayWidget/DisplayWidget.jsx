import React from 'react';
import Widget from './Widget';

const DisplayWidget = ({ widgetsListDisplay, handleDeleteWidget }) => {
  let countWidget = widgetsListDisplay ? widgetsListDisplay.length : 0;
  console.log(countWidget);
  const grid = (countWidget) => {
    switch (countWidget) {
      case 0: {
        return;
      }
      case 1:
        return 'sm:grid-cols-1';
      default:
        return 'sm:grid-cols-2';
    }
  };

  const height = (countWidget) => {
    switch (countWidget) {
      case 0:
        return 'h-0';
      case 1:
        return 'h-[50vh]';
      default:
        return 'h-[40vh]';
    }
  };

  return (
    <div className={`grid xs:grid-cols-1 ${grid(countWidget)} gap-3`}>
      {widgetsListDisplay.map((widget) => {
        return (
          <Widget
            key={widget._id}
            topicId={widget.topic}
            name={widget.name}
            onHandleDeleteWidget={() => {
              handleDeleteWidget(widget._id);
            }}
            deviceId={widget.device}
            type={widget.type}
            height={height(countWidget)}
          />
        );
      })}
    </div>
  );
};

export default DisplayWidget;
// grid xs:grid-cols-1 sm:grid-cols-2
// flex flex-shrink-0 flex-wrap gap-[4%]
