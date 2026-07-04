"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./GalleryCarousel.css";

type ImageItem = {
  src: string;
  caption: string;
};

export function GalleryCarousel({ items }: { items: ImageItem[] }) {
  const [index, setIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const nextStep = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevStep = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="gallery-carousel">
      <div className="gallery-carousel__viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="gallery-carousel__slide"
          >
            <img
              src={items[index].src}
              alt={items[index].caption}
              className="gallery-carousel__image"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="gallery-carousel__footer">
        <p className="gallery-carousel__caption">{items[index].caption}</p>
        
        {items.length > 1 && (
          <div className="gallery-carousel__controls">
            <button
              onClick={prevStep}
              className="gallery-carousel__control-btn focus-ring"
              aria-label="Previous slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
            </button>
            <div className="gallery-carousel__dots">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndex(idx)}
                  className={`gallery-carousel__dot ${
                    idx === index ? "gallery-carousel__dot--active" : ""
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextStep}
              className="gallery-carousel__control-btn focus-ring"
              aria-label="Next slide"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
