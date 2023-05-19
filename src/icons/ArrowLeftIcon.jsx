import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ArrowLeftIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#001A72"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 12h16M4 12l6-6m-6 6 6 6"
    />
  </Svg>
);
export default ArrowLeftIcon;
