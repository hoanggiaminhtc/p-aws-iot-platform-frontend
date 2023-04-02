/* eslint-disable prettier/prettier */
import React from 'react';
import ButtonWidget from '~/components/ButtonWidget';
import Widget from './Widget';

const DisplayWidget = ({ widgetsListDisplay, handleDeleteWidget }) => {
  let countWidget = widgetsListDisplay ? widgetsListDisplay.length : 0;

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
    <div className="flex w-full flex-wrap gap-2">
      {widgetsListDisplay.map((widget, index) => {
        return widget.type === 'button' ? (
          <div className="max-w-[10%]" key={widget._id}>
            <ButtonWidget
              deviceId={widget.device_id}
              widgetId={widget._id}
              onHandleDeleteWidget={() => {
                localStorage.removeItem('stateButton' + widget._id);
                handleDeleteWidget(widget._id);
              }}
            />
          </div>
        ) : (
          <div
            className={`w-full ${
              widgetsListDisplay.length - 1 === index && index % 2 === 0
                ? 'lg:w-[98.5%]'
                : 'lg:w-[49%]'
            }`}
            key={widget._id}
          >
            <Widget
              name={widget.name}
              onHandleDeleteWidget={() => {
                handleDeleteWidget(widget._id);
              }}
              deviceId={widget.device_id}
              widgetId={widget._id}
              type={widget.type}
              height={height(countWidget)}
              unit={widget.unit ? widget.unit : false}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayWidget;
// grid xs:grid-cols-1 sm:grid-cols-2
// flex flex-shrink-0 flex-wrap gap-[4%]
// `grid xs:grid-cols-1 ${grid(
//   countWidget,
// )} gap-3 bg-white dark:bg-[#242526]`
