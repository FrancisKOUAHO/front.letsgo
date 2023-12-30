import { LineWave } from 'react-loader-spinner'
import {FunctionComponent} from "react";

const LoadingSpinner: FunctionComponent = () => {
	return (
		<LineWave
      height='80'
      width='80'
      wrapperClass='c-loading-spinner'
      ariaLabel='Loading triangle spinner'
      visible={true}
    />
	);
};

export default LoadingSpinner;
