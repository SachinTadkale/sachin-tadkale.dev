"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faDownload } from "@fortawesome/free-solid-svg-icons";
import { siteConfig } from "@/lib/content";
import "./ResumeModal.css";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="resume-modal-overlay-wrapper">
          {/* Backdrop Overlay */}
          <motion.div
            className="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="resume-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="resume-modal-header">
              <div className="resume-modal-header__title">
                <span className="resume-modal-badge">PDF Viewer</span>
                <h3>{siteConfig.name}&apos;s Resume</h3>
              </div>
              <div className="resume-modal-header__actions">
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="resume-modal-btn resume-modal-btn--download focus-ring"
                  title="Download Resume"
                  aria-label="Download Resume"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  <span className="btn-text">Download</span>
                </a>
                <button
                  onClick={onClose}
                  className="resume-modal-btn resume-modal-btn--close focus-ring"
                  title="Close Preview"
                  aria-label="Close Preview"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="resume-modal-body" data-lenis-prevent>
              <iframe
                src={`${siteConfig.resumeUrl}#toolbar=0&navpanes=0&view=FitH`}
                title={`${siteConfig.name}'s Resume`}
                className="resume-modal-iframe"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
