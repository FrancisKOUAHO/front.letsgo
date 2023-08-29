import { NextPage } from 'next'
import { Triangle } from 'react-loader-spinner'

const LoadingSpinner: NextPage = () => {
	return (
		<Triangle
      height='80'
      width='80'
      wrapperClass='c-loading-spinner'
      ariaLabel='Loading triangle spinner'
      visible={true}
    />
	);
};

export default LoadingSpinner;
