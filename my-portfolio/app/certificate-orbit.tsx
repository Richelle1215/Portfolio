'use client';

export function CertificateOrbit({ certificates }: { certificates: string[] }) {
  return (
    <div className="cert-gallery-container">
      <h2 className="cert-gallery-title">Selected Achievements</h2>
      <p className="cert-gallery-hint">All certificate images are available</p>
      
      <div className="cert-gallery-grid">
        {certificates.map((cert, idx) => (
          <div key={idx} className="cert-gallery-item">
            <img src={cert} alt={`Certificate ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
