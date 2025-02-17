import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "24B, Near Kapoor's cafe, Sheryians Coding, School, Bhopal",
    "24C, Near Malhotra's cafe, Sheryians Coding, School, Bhopal",
    "20B, Near Singhania's cafe, Sheryians Coding, School, Bhopal",
    "18A, Near Sharma's cafe, Sheryians Coding, School, Bhopal",
  ];
  return (
    // this is just a sample data
    <div>
      {locations.map((location, ind) => {
        return (
          <div
            onClick={() => {
                props.setVehiclePanel(true)
                props.setOpenPanel(false)
            }}
            key={ind}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start">
            <h2 className="bg-[#eee] flex items-center justify-center h-8 w-16 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
