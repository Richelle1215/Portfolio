'use client';

import { useEffect, useRef, useState } from 'react';

interface Card3D {
  element: HTMLDivElement;
  _lon: number;
  _lat: number;
  classList: DOMTokenList;
}

export function CertificateOrbit({ certificates }: { certificates: string[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Card3D[]>([]);
  const stateRef = useRef({
    moved: 0,
    rx: -15,
    ry: 0,
    vx: 0,
    vy: 0.15,
    dragging: false,
    lastX: 0,
    lastY: 0,
    zoom: 1,
    focusF: 0,
    focusS: 1,
    focusedCard: null as Card3D | null,
    trx: 0,
    tryy: 0,
  });

  const RADIUS = 600;
  const CARD_W = 160;
  const CARD_H = 120;
  const AUTO_SPEED = 0.15;
  const COUNT = certificates.length;

  useEffect(() => {
    const stage = stageRef.current;
    const sphere = sphereRef.current;
    if (!stage || !sphere) return;

    // Clear previous cards
    sphere.innerHTML = '';
    cardsRef.current = [];

    // Create cards on sphere using Fibonacci distribution
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (2 * (i + 0.5)) / COUNT;
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (i * 137.508) % 360;

      const card = document.createElement('div');
      card.className = 'cert-card';
      card.style.cssText = `--w:${CARD_W}px;--h:${CARD_H}px;`;
      card.style.transform = `rotateY(${lon}deg) rotateX(${-lat}deg) translateZ(${RADIUS}px)`;

      const img = document.createElement('img');
      img.src = certificates[i];
      img.alt = `Certificate ${i + 1}`;
      card.appendChild(img);

      sphere.appendChild(card);

      const card3d: Card3D = {
        element: card,
        _lon: lon,
        _lat: lat,
        classList: card.classList,
      };
      cardsRef.current.push(card3d);
    }

    const state = stateRef.current;

    function render() {
      const z = state.zoom + (state.focusS - state.zoom) * state.focusF;
      if (sphere) {
        sphere.style.transform = `scale(${z}) rotateX(${state.rx}deg) rotateY(${state.ry}deg)`;
      }
    }

    function focusCard(card: Card3D) {
      state.focusedCard = card;
      cardsRef.current.forEach((c) => c.classList.toggle('focus', c === card));
      if (stage) stage.classList.add('zoomed');
      state.vx = state.vy = 0;
      state.trx = card._lat;
      const base = -card._lon;
      state.tryy = base + 360 * Math.round((state.ry - base) / 360);
      const P = 1100,
        W = Math.min(innerWidth * 0.6, 560);
      state.focusS = (W * P) / (CARD_W * P + W * RADIUS);
    }

    function unfocusCard() {
      state.focusedCard = null;
      cardsRef.current.forEach((c) => c.classList.remove('focus'));
      if (stage) stage.classList.remove('zoomed');
    }

    function tick() {
      state.focusF += ((state.focusedCard ? 1 : 0) - state.focusF) * 0.07;
      if (state.focusedCard) {
        state.ry += (state.tryy - state.ry) * 0.08;
        state.rx += (state.trx - state.rx) * 0.08;
      } else if (!state.dragging) {
        state.ry += state.vy;
        state.rx += state.vx;
        state.vx *= 0.95;
        state.vy += (AUTO_SPEED - state.vy) * 0.02;
      }
      state.rx = Math.max(-89, Math.min(89, state.rx));
      render();
      requestAnimationFrame(tick);
    }

    // Event listeners
    const handlePointerDown = (e: PointerEvent) => {
      state.dragging = true;
      state.moved = 0;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      stage.classList.add('dragging');
      stage.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!state.dragging) return;
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.moved += Math.abs(dx) + Math.abs(dy);

      if (state.focusedCard) return;
      state.ry += dx * 0.4;
      state.rx -= dy * 0.4;
      state.vy = dx * 0.4;
      state.vx = -dy * 0.4;
    };

    const handlePointerUp = (e: PointerEvent) => {
      state.dragging = false;
      stage.classList.remove('dragging');

      if (state.moved > 6) return;

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const clickedCard = el?.closest('.cert-card');

      if (clickedCard) {
        const card = cardsRef.current.find((c) => c.element === clickedCard);
        if (card && card !== state.focusedCard) {
          focusCard(card);
        } else if (card === state.focusedCard) {
          unfocusCard();
        }
      } else if (state.focusedCard) {
        // Clicked on background while zoomed - zoom out
        unfocusCard();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') unfocusCard();
    };

    const handleWheel = (e: WheelEvent) => {
      // Scroll zoom disabled
    };

    stage.addEventListener('pointerdown', handlePointerDown);
    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerup', handlePointerUp);
    stage.addEventListener('pointercancel', () => {
      state.dragging = false;
      stage.classList.remove('dragging');
    });
    window.addEventListener('keydown', handleKeyDown);
    stage.addEventListener('wheel', handleWheel, { passive: false });

    // Start animation loop
    tick();

    return () => {
      stage.removeEventListener('pointerdown', handlePointerDown);
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('keydown', handleKeyDown);
      stage.removeEventListener('wheel', handleWheel);
    };
  }, [COUNT, RADIUS]);

  return (
    <div 
      ref={stageRef} 
      className="cert-orbit-stage"
      style={{
        perspective: '2000px',
        WebkitPerspective: '2000px',
        filter: 'blur(0)',
      }}
    >
      <h2 className="cert-orbit-title">Selected Achievements</h2>
      <p className="cert-orbit-hint">Drag to spin · click a cert to zoom · press Escape to exit</p>
      <div 
        ref={sphereRef} 
        className="cert-orbit-sphere"
        style={{
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  );
}
