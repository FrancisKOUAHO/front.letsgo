import { FunctionComponent } from 'react';
import UpComingCardProps from '../../types/UpComingCardProps';
import Button from './Button';

const UpComingCard: FunctionComponent<UpComingCardProps> = ({
	title,
	label,
	coverImage,
	secondLabel,
	description,
}) => {
	return (
		<div className="c-upcomingcard o-wrapper" style={{ backgroundImage: `url("${coverImage}")` }}>
      <div className='relative'>
        <div className='c-upcomingcard__content'>
          <h1>{title}</h1>
          <p className='mt-6'>{description}</p>
        </div>
        <div className="mt-8 flex gap-4 flex-wrap">
          {/*<Button
            isActive={true}
            color='white'
            minHeight={60}
            onClick={() => console.log('click')}
          >
            {label}
          </Button>
          <Button 
            isActive={false}
            color="white"
            minHeight={60}
            onClick={() => console.log('click')}
          >
            {secondLabel}
          </Button>*/}
        </div>
			</div>
		</div>
	);
};

export default UpComingCard;
