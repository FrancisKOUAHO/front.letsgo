import { FunctionComponent } from 'react';
import DownloadAppCardProps from '../../types/DownloadAppCardProps';
import Button from './Button';

const DownloadAppCard: FunctionComponent<DownloadAppCardProps> = ({
                                                                    title,
                                                                    description,
                                                                    backgroundColor,
                                                                    label,
                                                                    secondLabel,
                                                                    src,
                                                                  }) => {
  return (
    <div
      className="c-downloadappcard o-wrapper"
      style={{ background: `${backgroundColor}` }}
    >
      <div className="c-downloadappcard__content">
        <h1>{title}</h1>
        <p className="mt-6">{description}</p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <Button
            color="white"
            isActive={false}
            onClick={() => window.open('')}
          >
            <i className="ri-google-play-fill" />
            {label}
          </Button>
          <Button
            color="white"
            isActive={false}
            onClick={() => window.open('https://apps.apple.com/fr/app/letsgo/id1626624162')}
          >
            <i className="ri-app-store-fill" />
            {secondLabel}
          </Button>
        </div>
      </div>
      <img
        className="c-downloadappcard__side-image"
        src={src}
        alt="Application Let's Go sur un smartphone"
      />
    </div>
  );
};

export default DownloadAppCard;
