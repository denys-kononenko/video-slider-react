import './App.css';
import '@splidejs/react-splide/css';
import Vimeo from '@u-wave/react-vimeo';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState } from 'react';
import { Modal, ModalClose } from '@mui/joy';
import { Loader } from './components/Loader';
import { Pagination } from './components/Pagination';

const vimeoVideoIds = [
  '824804225',
  '824804225',
  '824804225',
  '824804225',
  '824804225',
  '824804225',
  '824804225',
  '824804225',
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoDatas, setVideoDatas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedVideoIndex, setOpenedVideoIndex] = useState(null);

  const splideOptions = {
    perPage: 4,
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all(vimeoVideoIds.map(id => (
      fetch(`https://api.vimeo.com/videos/${id}?access_token=3fd17cf4eec4899a9a6b7b9fc1b56c1e`)
        .then(response => response.json())
    ))).then(datas => {
      setVideoDatas(datas);
    })
    .finally(() => setIsLoading(false))
  }, []);

  const handlePreviewClick = videoIndex => {
    setIsModalOpen(true);
    setOpenedVideoIndex(videoIndex);
  }

  return (
    <div className="App">
      {isLoading && <Loader />}

      {!isLoading && videoDatas.length > 0 && (
        <>
          <Splide options={splideOptions}>
            {videoDatas.map((data, index) => (
              <SplideSlide key={index}>
                <img
                  src={data?.pictures?.base_link}
                  alt={`Preview ${index + 1}`}
                  className="slide-image"
                  onClick={() => handlePreviewClick(index)}
                />
              </SplideSlide>
            ))}
          </Splide>

          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            sx={{ p: 5 }}
          >
            <>
              <ModalClose variant="soft" sx={{ m: 1 }} />

              <Vimeo
                key={openedVideoIndex}
                video={vimeoVideoIds[openedVideoIndex]}
                autoplay
                responsive
                className="vimeo-player"
              />

              <Pagination
                vimeoVideoIds={vimeoVideoIds}
                openedVideoIndex={openedVideoIndex}
                setOpenedVideoIndex={setOpenedVideoIndex}
              />
            </>
          </Modal>
        </>
      )}
    </div>
  );
}

export default App;
