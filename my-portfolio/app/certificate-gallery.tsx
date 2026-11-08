"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";



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

export function CertificateGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [assetStatuses, setAssetStatuses] = useState<AssetStatus[]>(
    () => certificates.map(() => "loading"),
  );
  const readyCount = assetStatuses.filter((status) => status === "ready").length;
  const settledCount = assetStatuses.filter((status) => status !== "loading").length;
  const selectedCertificate = selectedIndex === null ? null : certificates[selectedIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && selectedIndex !== null && !dialog.open) dialog.showModal();

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && dialog?.open) {
        event.preventDefault();
        dialog.close();
      }
    };

    document.addEventListener("keydown", handleEscape, true);
    return () => document.removeEventListener("keydown", handleEscape, true);
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

  const moveSelection = (direction: -1 | 1) => {
    setSelectedIndex((current) => {
      if (current === null) return 0;
      return (current + direction + certificates.length) % certificates.length;
    });
  };

  return (
    <section id="certificates" className="certificate-section">
      <div className="certificate-section__inner">
        <div className="certificate-collection">
          <p className="certificate-collection__status">
            {readyCount === certificates.length
              ? "All certificate images are available."
              : settledCount < certificates.length
                ? `Loading certificate images (${readyCount} of ${certificates.length} ready).`
                : `${readyCount} of ${certificates.length} certificate images are available. See each card for any missing filename.`}
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
                    <Image
                      src={certificate.src}
                      alt={certificate.alt}
                      fill
                      sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
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
                      onClick={() => {
                        setSelectedIndex(index);
                      }}
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
                      Expected: {certificate.filename}
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
              <div className="certificate-lightbox__image">
                <Image
                  src={selectedCertificate.src}
                  alt={selectedCertificate.alt}
                  fill
                  sizes="(max-width: 600px) 85vw, 75vw"
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
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}
