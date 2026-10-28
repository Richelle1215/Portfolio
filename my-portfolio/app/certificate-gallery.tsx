"use client";

import { useEffect, useRef, useState } from "react";

const certificates = Array.from({ length: 24 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    number,
    src: `/certificates/certificate-${number}.jpg`,
    alt: `Certificate page ${number} from Richelle Mendez's certificate collection`,
  };
});

type AssetStatus = "loading" | "ready" | "missing";

export function CertificateGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [assetStatuses, setAssetStatuses] = useState<AssetStatus[]>(
    () => certificates.map(() => "loading"),
  );
  const readyCount = assetStatuses.filter((status) => status === "ready").length;
  const selectedCertificate = selectedIndex === null ? null : certificates[selectedIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || selectedIndex === null || dialog.open) return;

    dialog.showModal();
  }, [selectedIndex]);

  const closeDialog = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
  };

  const updateAssetStatus = (index: number, status: AssetStatus) => {
    setAssetStatuses((current) => {
      if (current[index] === status) return current;

      const updated = [...current];
      updated[index] = status;
      return updated;
    });
  };

  return (
    <section id="certificates" className="certificate-section">
      <div className="certificate-section__inner">
        <div className="certificate-section__heading">
          <p className="certificate-eyebrow">Documents / 01</p>
          <h2>Credentials</h2>
          <p className="certificate-section__intro">
            A closer look at my work, learning, and professional milestones.
          </p>
        </div>

        <article className="cv-panel" aria-labelledby="cv-title">
          <div className="cv-panel__index" aria-hidden="true">
            <span>PDF</span>
            <span>01</span>
          </div>
          <div className="cv-panel__copy">
            <p className="certificate-eyebrow">Curriculum vitae</p>
            <h3 id="cv-title">Richelle Mendez</h3>
            <p>
              Explore my experience and skills in the full CV, or download a
              copy for later.
            </p>
          </div>
          <div className="cv-panel__actions">
            <a
              className="cv-action cv-action--primary"
              href="/documents/Richelle_Mendez_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View CV <span aria-hidden="true">↗</span>
            </a>
            <a
              className="cv-action cv-action--secondary"
              href="/documents/Richelle_Mendez_CV.pdf"
              download="Richelle_Mendez_CV.pdf"
            >
              Download CV <span aria-hidden="true">↓</span>
            </a>
          </div>
        </article>

        <div className="certificate-collection">
          <div className="certificate-collection__heading">
            <div>
              <p className="certificate-eyebrow">Selected achievements</p>
              <h3>Certificate collection</h3>
            </div>
            <p className="certificate-collection__count">
              {certificates.length} pages
            </p>
          </div>
          <p className="certificate-collection__status" aria-live="polite">
            {readyCount === certificates.length
              ? "All certificate images are available."
              : `${readyCount} of ${certificates.length} certificate images available. Images will appear here as the source files are added.`}
          </p>

          <div className="certificate-grid">
            {certificates.map((certificate, index) => {
              const isAvailable = assetStatuses[index] === "ready";
              const isMissing = assetStatuses[index] === "missing";

              return (
                <article className="certificate-card" key={certificate.number}>
                  <div className="certificate-card__preview">
                    <div className="certificate-card__placeholder" aria-hidden="true">
                      <span className="certificate-card__placeholder-mark">C</span>
                      <span>{isMissing ? "Image pending" : "Loading image"}</span>
                    </div>
                    <img
                      src={certificate.src}
                      alt={certificate.alt}
                      loading="lazy"
                      onLoad={() => updateAssetStatus(index, "ready")}
                      onError={() => updateAssetStatus(index, "missing")}
                      className={isAvailable ? "is-loaded" : ""}
                    />
                    <button
                      type="button"
                      className="certificate-card__open"
                      disabled={!isAvailable}
                      aria-label={`Enlarge certificate ${certificate.number}`}
                      onClick={() => setSelectedIndex(index)}
                    >
                      View certificate
                    </button>
                  </div>
                  <div className="certificate-card__caption">
                    <h4>Certificate {certificate.number}</h4>
                    <span>{certificate.number}</span>
                  </div>
                  {isMissing && (
                    <p className="certificate-card__filename">
                      Expected: certificate-{certificate.number}.jpg
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="certificate-lightbox"
        aria-labelledby="certificate-dialog-title"
        onClose={() => setSelectedIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        {selectedCertificate && (
          <div className="certificate-lightbox__content">
            <header className="certificate-lightbox__header">
              <div>
                <p className="certificate-eyebrow">Certificate image</p>
                <h3 id="certificate-dialog-title">
                  Certificate {selectedCertificate.number}
                </h3>
              </div>
              <button
                type="button"
                className="certificate-lightbox__close"
                aria-label="Close certificate view"
                onClick={closeDialog}
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>
            <div className="certificate-lightbox__stage">
              <button
                type="button"
                aria-label="Previous certificate"
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex! - 1 + certificates.length) % certificates.length,
                  )
                }
              >
                <span aria-hidden="true">←</span>
              </button>
              <img src={selectedCertificate.src} alt={selectedCertificate.alt} />
              <button
                type="button"
                aria-label="Next certificate"
                onClick={() =>
                  setSelectedIndex((selectedIndex! + 1) % certificates.length)
                }
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="certificate-lightbox__counter">
              {selectedCertificate.number} / {String(certificates.length).padStart(2, "0")}
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}
