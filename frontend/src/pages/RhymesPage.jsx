import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Play, Pause, SkipBack, SkipForward, Repeat, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { RHYMES } from '../data/languageData';
import { useProgress } from '../hooks/useProgress';

const RhymesPage = () => {
  const navigate = useNavigate();
  const { recordRhymeWatched } = useProgress();
  const [selectedRhyme, setSelectedRhyme] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);

  const handleRhymeSelect = useCallback((rhyme) => {
    setIsReady(false);
    setIsPlaying(false);
    setSelectedRhyme(rhyme);
    recordRhymeWatched(rhyme.id);
  }, [recordRhymeWatched]);

  const handleReady = useCallback(() => {
    setIsReady(true);
    setIsPlaying(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsPlaying(false);
    setTimeout(() => {
      setSelectedRhyme(null);
      setIsReady(false);
    }, 100);
  }, []);

  const handlePrevious = () => {
    if (!selectedRhyme) return;
    const currentIndex = RHYMES.findIndex(r => r.id === selectedRhyme.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : RHYMES.length - 1;
    handleRhymeSelect(RHYMES[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedRhyme) return;
    const currentIndex = RHYMES.findIndex(r => r.id === selectedRhyme.id);
    const nextIndex = currentIndex < RHYMES.length - 1 ? currentIndex + 1 : 0;
    handleRhymeSelect(RHYMES[nextIndex]);
  };

  const handleEnded = () => {
    if (isLooping) {
      playerRef.current?.seekTo(0);
      setIsPlaying(true);
    } else {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 py-4 bg-[#FFFDF5]/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <motion.button
            data-testid="back-to-home"
            onClick={() => navigate('/')}
            className="min-h-[56px] min-w-[56px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-7 h-7 text-[#4D96FF]" />
          </motion.button>

          <h1 
            className="font-black text-2xl md:text-3xl text-[#4D96FF]"
            style={{ fontFamily: 'Ramabhadra, sans-serif' }}
          >
            పాటలు
          </h1>

          <div className="w-[56px]" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-5xl mx-auto">
        {/* Rhymes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {RHYMES.map((rhyme, index) => (
            <motion.button
              key={rhyme.id}
              data-testid={`rhyme-${rhyme.id}`}
              onClick={() => handleRhymeSelect(rhyme)}
              className="relative overflow-hidden rounded-3xl shadow-xl cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gray-200">
                <img
                  src={rhyme.thumbnail}
                  alt={rhyme.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { 
                    e.target.src = `https://placehold.co/480x360/4D96FF/white?text=${encodeURIComponent(rhyme.englishTitle)}`;
                  }}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <h3 
                  className="text-xl md:text-2xl font-black text-white"
                  style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                >
                  {rhyme.title}
                </h3>
                <p className="text-white/80 text-sm font-nunito">
                  {rhyme.englishTitle}
                </p>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                  <Play className="w-8 h-8 text-[#4D96FF] ml-1" />
                </div>
              </div>

              {/* Currently playing indicator */}
              {selectedRhyme?.id === rhyme.id && isPlaying && (
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#6BCB77] text-white text-xs font-bold">
                  Playing
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </main>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedRhyme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex flex-col"
          >
            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
              <motion.button
                data-testid="close-player"
                onClick={handleClose}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-8 h-8 text-white" />
              </motion.button>
            </div>

            {/* Video container */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black relative">
                {!isReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                      <p className="text-white text-lg font-nunito">Loading video...</p>
                    </div>
                  </div>
                )}
                <ReactPlayer
                  ref={playerRef}
                  url={`https://www.youtube.com/watch?v=${selectedRhyme.id}`}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  loop={isLooping}
                  controls={true}
                  onReady={handleReady}
                  onEnded={handleEnded}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={(e) => console.log('Player error:', e)}
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        autoplay: 1,
                        origin: window.location.origin
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Controls */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white/10 backdrop-blur-xl rounded-t-3xl p-6"
            >
              <div className="max-w-2xl mx-auto">
                {/* Title */}
                <div className="text-center mb-6">
                  <h2 
                    className="text-2xl md:text-3xl font-black text-white"
                    style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                  >
                    {selectedRhyme.title}
                  </h2>
                  <p className="text-white/70 font-nunito">
                    {selectedRhyme.englishTitle}
                  </p>
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-center gap-4 md:gap-6">
                  <motion.button
                    data-testid="loop-toggle"
                    onClick={() => setIsLooping(!isLooping)}
                    className={`
                      w-14 h-14 rounded-full flex items-center justify-center cursor-pointer
                      ${isLooping ? 'bg-[#6BCB77]' : 'bg-white/20'}
                    `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Repeat className="w-6 h-6 text-white" />
                  </motion.button>

                  <motion.button
                    data-testid="prev-rhyme"
                    onClick={handlePrevious}
                    className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipBack className="w-8 h-8 text-white" />
                  </motion.button>

                  <motion.button
                    data-testid="play-pause"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 rounded-full bg-[#4D96FF] flex items-center justify-center cursor-pointer shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-white" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-1" />
                    )}
                  </motion.button>

                  <motion.button
                    data-testid="next-rhyme"
                    onClick={handleNext}
                    className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipForward className="w-8 h-8 text-white" />
                  </motion.button>

                  <div className="w-14 h-14" /> {/* Spacer for balance */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RhymesPage;
