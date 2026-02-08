import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Play, SkipBack, SkipForward, Repeat, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RHYMES } from '../data/languageData';
import { useProgress } from '../hooks/useProgress';

const RhymesPage = () => {
  const navigate = useNavigate();
  const { recordRhymeWatched } = useProgress();
  const [selectedRhyme, setSelectedRhyme] = useState(null);
  const [isLooping, setIsLooping] = useState(true);

  const handleRhymeSelect = useCallback((rhyme) => {
    setSelectedRhyme(rhyme);
    recordRhymeWatched(rhyme.id);
  }, [recordRhymeWatched]);

  const handleClose = useCallback(() => {
    setSelectedRhyme(null);
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

  // Build YouTube embed URL with proper parameters
  const getYouTubeEmbedUrl = (videoId) => {
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      loop: isLooping ? '1' : '0',
      playlist: isLooping ? videoId : '', // Required for loop to work
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
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

          <div className="w-[56px]" />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-5xl mx-auto">
        {/* Rhymes Grid - 2 columns on mobile, 3 on tablet+ */}
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
              <div className="aspect-video bg-[#4D96FF]/20">
                <img
                  src={rhyme.thumbnail}
                  alt={rhyme.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { 
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/480x360/4D96FF/white?text=${encodeURIComponent(rhyme.englishTitle)}`;
                  }}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-4">
                <h3 
                  className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight"
                  style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                >
                  {rhyme.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-nunito">
                  {rhyme.englishTitle}
                </p>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl opacity-80 group-hover:opacity-100 transition-opacity">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-[#4D96FF] ml-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </main>

      {/* Video Player Modal - Using direct iframe for better compatibility */}
      <AnimatePresence>
        {selectedRhyme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100] flex flex-col"
          >
            {/* Close button */}
            <div className="absolute top-4 right-4 z-20">
              <motion.button
                data-testid="close-player"
                onClick={handleClose}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </motion.button>
            </div>

            {/* Video container - Full screen friendly */}
            <div className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-8">
              <div className="w-full max-w-5xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  key={selectedRhyme.id} // Force remount on video change
                  src={getYouTubeEmbedUrl(selectedRhyme.id)}
                  title={selectedRhyme.title}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Bottom Controls */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white/10 backdrop-blur-xl p-4 sm:p-6"
            >
              <div className="max-w-2xl mx-auto">
                {/* Title */}
                <div className="text-center mb-4">
                  <h2 
                    className="text-xl sm:text-2xl md:text-3xl font-black text-white"
                    style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                  >
                    {selectedRhyme.title}
                  </h2>
                  <p className="text-white/70 font-nunito text-sm sm:text-base">
                    {selectedRhyme.englishTitle}
                  </p>
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
                  <motion.button
                    data-testid="loop-toggle"
                    onClick={() => setIsLooping(!isLooping)}
                    className={`
                      w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer
                      ${isLooping ? 'bg-[#6BCB77]' : 'bg-white/20'}
                    `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={isLooping ? 'Loop On' : 'Loop Off'}
                  >
                    <Repeat className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.button>

                  <motion.button
                    data-testid="prev-rhyme"
                    onClick={handlePrevious}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipBack className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.button>

                  <motion.button
                    data-testid="next-rhyme"
                    onClick={handleNext}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipForward className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.button>
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
