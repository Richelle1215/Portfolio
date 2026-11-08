"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const certificateFiles = [
  "certificate-01.png",
  "certificate-03.jpeg",
  "certificate-05.png",
  "certificate-07.jpeg",
  "certificate-11.jpeg",
  "certificate-12.png",
  "certificate-17.png",
  "certificate-21.png",
  "certificate-24.png",
  "certificate-26.png",
  "certificate-28.png",
  "certificate-33.png",
  "certificate-37.png",
  "certificate-39.jpeg",
  "certificate-42.png",
  "certificate-45.png",
  "certificate-48.png",
  "certificate-51.png",
  "certificate-52.png",
  "certificate-56.png",
  "certificate-58.png",
  "certificate-61.png",
  "certificate-62.png",
  "certificate-63.png",
  "certificate-64.png",
];

const certificates = certificateFiles.map((filename, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    number,
    filename,
    src: `/certificates/${filename}`,
    alt: `Certificate scan ${number} from Richelle Mendez's certificate collection`,
  };
});

type AssetStatus = "loading" | "ready" | "missing";
type OrbitPosition = "left" | "right" | "upper-left" | "upper-right";

const orbitPositions: OrbitPosition[] = [
  "left",
  "right",
  "upper-left",
  "upper-right",
];

export function CertificateGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [assetStatuses, setAssetStatuses] = useState<AssetStatus[]>(
    () => certificates.map(() => "loading"),
  );
  const readyCount = assetStatuses.filter((status) => status === "ready").length;
  const settledCount = assetStatuses.filter((status) => status !== "loading").length;
  const selectedCertificate = selectedIndex === null ? null : certificates[selectedIndex];
  const activeCertificate = certificates[activeIndex];
  const activeStatus = assetStatuses[activeIndex];
  const orbitIndices = [
    activeIndex - 1,
    activeIndex + 1,
    activeIndex - 2,
    activeIndex + 2,
  ].map((index) => (index + certificates.length) % certificates.length);
  const moveSelection = useCallback((direction: -1 | 1) => {
    setSelectedIndex((current) => {
      if (current === null) return 0;
      return (current + direction + certificates.length) % certificates.length;
    });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && selectedIndex !== null && !dialog.open) dialog.showModal();

    const handleDialogKeys = (event: globalThis.KeyboardEvent) => {
      if (!dialog?.open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        dialog.close();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveSelection(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        moveSelection(1);
      }
    };

    document.addEventListener("keydown", handleDialogKeys, true);
    return () => document.removeEventListener("keydown", handleDialogKeys, true);
  }, [selectedIndex, moveSelection]);

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

  const moveActive = (direction: -1 | 1) => {
    setActiveIndex((current) => (
      current + direction + certificates.length
    ) % certificates.length);
  };

  return (
    <section id="certificates" className="certificate-section">
      <div className="certificate-section__inner">
        <header className="certificate-gallery__intro">
          <div>
            <p className="certificate-eyebrow">Learning, documented</p>
            <h2>Every milestone, in its own light.</h2>
          </div>
          <p>
            A growing archive of studies, skills, and ideas put into practice.
            Select a scan to bring it into focus.
          </p>
        </header>

        <div className="certificate-collection">
          <div className="certificate-collection__heading">
            <div>
              <p className="certificate-collection__count">The collection</p>
              <h3>Certificates</h3>
            </div>
            <span className="certificate-gallery__total">
              {String(certificates.length).padStart(2, "0")} documents
            </span>
          </div>

          <p className="certificate-collection__status" aria-live="polite">
            {readyCount === certificates.length
              ? "All certificate images are available."
              : settledCount < certificates.length
                ? `Loading certificate images (${readyCount} of ${certificates.length} ready).`
                : `${readyCount} of ${certificates.length} certificate images are available. See each card for any missing filename.`}
          </p>

          <div className="certificate-orbit">
            <div className="certificate-orbit__rings" aria-hidden="true">
              <span />
              <span />
              <span />
              <i />
            </div>

            {orbitIndices.map((index, orbitIndex) => {
              const certificate = certificates[index];
              const status = assetStatuses[index];
              const position = orbitPositions[orbitIndex];

              return (
                <button
                  type="button"
                  className={`certificate-orbit__satellite certificate-orbit__satellite--${position}`}
                  key={`${position}-${certificate.number}`}
                  aria-label={`Select certificate ${certificate.number}${status === "missing" ? ", image missing" : ""}`}
                  aria-pressed={false}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="certificate-orbit__satellite-image">
                    {status !== "ready" && (
                      <span className="certificate-orbit__satellite-status">
                        {status === "missing" ? "Unavailable" : "Loading"}
                      </span>
                    )}
                    <Image
                      src={certificate.src}
                      alt={certificate.alt}
                      fill
                      sizes="(max-width: 700px) 25vw, 18vw"
                      loading="lazy"
                      onLoad={() => updateAssetStatus(index, "ready")}
                      onError={() => updateAssetStatus(index, "missing")}
                      className={status === "ready" ? "is-loaded" : ""}
                    />
                  </span>
                  <span className="certificate-orbit__satellite-number">
                    {certificate.number}
                  </span>
                </button>
              );
            })}

            <article className="certificate-orbit__featured">
              <div className={`certificate-orbit__featured-art is-${activeStatus}`}>
                {activeStatus !== "ready" && (
                  <div className="certificate-orbit__placeholder" role="status">
                    <span className="certificate-orbit__placeholder-mark" aria-hidden="true">
                      {activeStatus === "missing" ? "!" : "✳"}
                    </span>
                    <span>
                      {activeStatus === "missing"
                        ? "Certificate image unavailable"
                        : "Loading certificate image"}
                    </span>
                    {activeStatus === "missing" && (
                      <small>Expected: {activeCertificate.filename}</small>
                    )}
                  </div>
                )}
                <Image
                  key={activeCertificate.src}
                  src={activeCertificate.src}
                  alt={activeCertificate.alt}
                  fill
                  sizes="(max-width: 700px) 90vw, 52vw"
                  loading="eager"
                  onLoad={() => updateAssetStatus(activeIndex, "ready")}
                  onError={() => updateAssetStatus(activeIndex, "missing")}
                  className={activeStatus === "ready" ? "is-loaded" : ""}
                />
              </div>
              <div className="certificate-orbit__featured-caption">
                <div>
                  <span>Currently in focus</span>
                  <h4>Certificate {activeCertificate.number}</h4>
                  <p>{activeCertificate.filename}</p>
                </div>
                <button
                  type="button"
                  className="certificate-orbit__open"
                  disabled={activeStatus !== "ready"}
                  onClick={() => setSelectedIndex(activeIndex)}
                >
                  View full size <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>

            <div className="certificate-orbit__controls" aria-label="Featured certificate navigation">
              <button
                type="button"
                aria-label="Previous certificate"
                onClick={() => moveActive(-1)}
              >
                <span aria-hidden="true">←</span> Previous
              </button>
              <span>{activeCertificate.number} <i>/</i> {String(certificates.length).padStart(2, "0")}</span>
              <button
                type="button"
                aria-label="Next certificate"
                onClick={() => moveActive(1)}
              >
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div className="certificate-browse">
            <div className="certificate-browse__heading">
              <div>
                <p className="certificate-collection__count">Browse all</p>
                <h3>Find another certificate</h3>
              </div>
              <span>Choose any scan to feature it above</span>
            </div>
            <div className="certificate-grid">
              {certificates.map((certificate, index) => {
                const status = assetStatuses[index];
                const isActive = index === activeIndex;

                return (
                  <button
                    type="button"
                    className={`certificate-card${isActive ? " is-active" : ""}`}
                    key={certificate.number}
                    aria-label={`Feature certificate ${certificate.number}${status === "missing" ? ", image unavailable" : ""}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="certificate-card__preview">
                      {status !== "ready" && (
                        <span className="certificate-card__placeholder">
                          <span className="certificate-card__placeholder-mark" aria-hidden="true">
                            {status === "missing" ? "!" : "C"}
                          </span>
                          <span>{status === "missing" ? "Image unavailable" : "Loading image"}</span>
                        </span>
                      )}
                      <Image
                        src={certificate.src}
                        alt={certificate.alt}
                        fill
                        sizes="(max-width: 540px) 44vw, (max-width: 900px) 28vw, 20vw"
                        loading="lazy"
                        onLoad={() => updateAssetStatus(index, "ready")}
                        onError={() => updateAssetStatus(index, "missing")}
                        className={status === "ready" ? "is-loaded" : ""}
                      />
                    </span>
                    <span className="certificate-card__caption">
                      <span>
                        <strong>Certificate {certificate.number}</strong>
                        {status === "missing" && (
                          <small>Expected: {certificate.filename}</small>
                        )}
                      </span>
                      <span className="certificate-card__arrow" aria-hidden="true">
                        {isActive ? "✳" : "↗"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="certificate-lightbox"
        aria-labelledby="certificate-dialog-title"
        onClose={() => setSelectedIndex(null)}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
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
                onClick={() => moveSelection(-1)}
              >
                <span aria-hidden="true">←</span>
              </button>
              <div className={`certificate-lightbox__image is-${assetStatuses[selectedIndex!]}`} role="status">
                {assetStatuses[selectedIndex!] !== "ready" && (
                  <p>
                    {assetStatuses[selectedIndex!] === "missing"
                      ? `Image unavailable. Expected: ${selectedCertificate.filename}`
                      : "Loading certificate image…"}
                  </p>
                )}
                <Image
                  key={selectedCertificate.src}
                  src={selectedCertificate.src}
                  alt={selectedCertificate.alt}
                  fill
                  sizes="(max-width: 600px) 85vw, 75vw"
                  onLoad={() => updateAssetStatus(selectedIndex!, "ready")}
                  onError={() => updateAssetStatus(selectedIndex!, "missing")}
                  className={assetStatuses[selectedIndex!] === "ready" ? "is-loaded" : ""}
                />
              </div>
              <button
                type="button"
                aria-label="Next certificate"
                onClick={() => moveSelection(1)}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="certificate-lightbox__counter">
              {selectedCertificate.number} / {String(certificates.length).padStart(2, "0")}
              <span>{selectedCertificate.filename}</span>
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}
