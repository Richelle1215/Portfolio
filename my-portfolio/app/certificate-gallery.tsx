'use client';

import { CertificateOrbit } from './certificate-orbit';

const certificateFiles = [
  'certificate-01.png',
  'certificate-03.jpeg',
  'certificate-05.png',
  'certificate-07.jpeg',
  'certificate-11.jpeg',
  'certificate-12.png',
  'certificate-17.png',
  'certificate-21.png',
  'certificate-24.png',
  'certificate-26.png',
  'certificate-28.png',
  'certificate-33.png',
  'certificate-37.png',
  'certificate-39.jpeg',
  'certificate-42.png',
  'certificate-45.png',
  'certificate-48.png',
  'certificate-51.png',
  'certificate-52.png',
  'certificate-56.png',
  'certificate-58.png',
  'certificate-61.png',
  'certificate-62.png',
  'certificate-63.png',
  'certificate-64.png',
];

const certificatePaths = certificateFiles.map((filename) => `/certificates/${filename}`);

export function CertificateGallery() {
  return <CertificateOrbit certificates={certificatePaths} />;
}
