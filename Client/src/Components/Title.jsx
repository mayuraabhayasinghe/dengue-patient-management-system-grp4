import React from "react";

const Title = ({ title }) => {
  return (
    <div>
      <h1 className="text-xl sm:text-3xl text-primary-2 text-center pt-2  md:pt-5 font-semibold">
        {title}
      </h1>
    </div>
  );
};

export default Title;
