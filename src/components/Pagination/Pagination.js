import './Pagination.css';
import classNames from 'classnames';

export const Pagination = ({ vimeoVideoIds, openedVideoIndex, setOpenedVideoIndex }) => {
  return (
    <div className="Pagination">
      {vimeoVideoIds.map((_, index) => (
        <div
          key={index}
          className={classNames('point', {
            'active-point': index === openedVideoIndex, 
          })}
          onClick={() => setOpenedVideoIndex(index)}
        />
        ))}
    </div>
  );
};
