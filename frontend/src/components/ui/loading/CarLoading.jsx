const carLoadingStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

  @keyframes carDrive {
    0%   { transform: translateX(-160px); opacity: 0; }
    15%  { opacity: 1; }
    85%  { opacity: 1; }
    100% { transform: translateX(160px); opacity: 0; }
  }

  @keyframes roadScroll {
    0%   { background-position: 0 0; }
    100% { background-position: -80px 0; }
  }

  @keyframes wheelRotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes headlightPulse {
    0%, 100% { opacity: 0.6; box-shadow: 0 0 8px 2px #fde68a; }
    50%       { opacity: 1;   box-shadow: 0 0 18px 6px #fde68a; }
  }

  @keyframes exhaustPuff {
    0%   { transform: translateX(0) scale(1); opacity: 0.7; }
    100% { transform: translateX(-24px) scale(2.2); opacity: 0; }
  }

  @keyframes dotBlink {
    0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
    40%            { opacity: 1;   transform: scale(1); }
  }

  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 0.9; }
  }

  .car-drive    { animation: carDrive 2.6s cubic-bezier(0.4,0,0.2,1) infinite; }
  .wheel-rotate { animation: wheelRotate 0.55s linear infinite; }
  .headlight    { animation: headlightPulse 0.7s ease-in-out infinite; }
  .exhaust-1    { animation: exhaustPuff 0.9s ease-out infinite; }
  .exhaust-2    { animation: exhaustPuff 0.9s ease-out 0.3s infinite; }
  .exhaust-3    { animation: exhaustPuff 0.9s ease-out 0.6s infinite; }

  .road {
    background-image: repeating-linear-gradient(
      90deg,
      transparent 0px, transparent 24px,
      #22d3ee 24px, #22d3ee 48px
    );
    background-size: 80px 100%;
    animation: roadScroll 0.4s linear infinite;
  }

  .scanline-effect::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(transparent 50%, rgba(34,211,238,0.03) 50%);
    background-size: 100% 4px;
    pointer-events: none;
  }

  .dot1 { animation: dotBlink 1.4s ease-in-out 0s infinite; }
  .dot2 { animation: dotBlink 1.4s ease-in-out 0.2s infinite; }
  .dot3 { animation: dotBlink 1.4s ease-in-out 0.4s infinite; }

  .glow-ring { animation: glowPulse 2s ease-in-out infinite; }
`;
const CarLoading = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center py-20 overflow-hidden scanline-effect"
      style={{ fontFamily: "'Orbitron', monospace", background: 'transparent' }}
    >
      <style>{carLoadingStyles}</style>

      {/* Ambient glow behind car */}
      <div
        className="glow-ring absolute rounded-full pointer-events-none"
        style={{
          width: 320, height: 80,
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.18) 0%, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) translateY(10px)',
        }}
      />

      {/* Scene container */}
      <div className="relative w-80 h-28 mb-6">

        {/* Road surface */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-md overflow-hidden"
          style={{ height: 18, background: '#0f172a', border: '1px solid rgba(34,211,238,0.2)' }}
        >
          {/* Dashed center line */}
          <div className="road absolute" style={{ top: '40%', left: 0, right: 0, height: 2, opacity: 0.35 }} />
        </div>

        {/* Car */}
        <div className="car-drive absolute" style={{ bottom: 18, left: '50%', marginLeft: -64 }}>
          <div className="relative" style={{ width: 128 }}>

            {/* Exhaust puffs */}
            <div className="absolute" style={{ left: -4, bottom: 18 }}>
              <div className="exhaust-1 absolute w-3 h-3 rounded-full bg-gray-500 opacity-0" style={{ bottom: 0, left: 0 }} />
              <div className="exhaust-2 absolute w-2 h-2 rounded-full bg-gray-400 opacity-0" style={{ bottom: 4, left: 2 }} />
              <div className="exhaust-3 absolute w-2 h-2 rounded-full bg-gray-600 opacity-0" style={{ bottom: 1, left: -2 }} />
            </div>

            {/* Car cabin */}
            <div
              className="absolute rounded-t-xl"
              style={{
                width: 72, height: 30,
                left: 22, bottom: 30,
                background: 'linear-gradient(135deg, #1e40af 0%, #22d3ee 100%)',
                boxShadow: '0 0 12px rgba(34,211,238,0.4)',
              }}
            >
              {/* Windshield */}
              <div
                className="absolute rounded"
                style={{
                  width: 28, height: 18,
                  top: 5, left: 10,
                  background: 'rgba(15,23,42,0.85)',
                  border: '1px solid rgba(34,211,238,0.4)',
                  boxShadow: 'inset 0 0 6px rgba(34,211,238,0.2)',
                }}
              />
              {/* Rear window */}
              <div
                className="absolute rounded"
                style={{
                  width: 18, height: 14,
                  top: 7, right: 8,
                  background: 'rgba(15,23,42,0.85)',
                  border: '1px solid rgba(34,211,238,0.3)',
                }}
              />
            </div>

            {/* Car body */}
            <div
              className="absolute rounded-lg"
              style={{
                width: 128, height: 32,
                bottom: 12,
                background: 'linear-gradient(90deg, #1e3a8a 0%, #1e40af 50%, #22d3ee 100%)',
                boxShadow: '0 4px 20px rgba(34,211,238,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* Body stripe */}
              <div
                className="absolute rounded"
                style={{
                  height: 2, left: 12, right: 12, top: '50%',
                  background: 'rgba(34,211,238,0.4)',
                }}
              />
            </div>

            {/* Headlight */}
            <div
              className="headlight absolute rounded-full"
              style={{
                width: 10, height: 10,
                right: 4, bottom: 22,
                background: '#fde68a',
              }}
            />

            {/* Tail light */}
            <div
              className="absolute rounded"
              style={{
                width: 6, height: 14,
                left: 2, bottom: 18,
                background: '#ef4444',
                boxShadow: '0 0 8px rgba(239,68,68,0.7)',
                opacity: 0.9,
              }}
            />

            {/* Wheels */}
            {[18, 90].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: 22, height: 22,
                  left: x, bottom: 0,
                  background: '#111827',
                  border: '2.5px solid #22d3ee',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px rgba(34,211,238,0.5)',
                  overflow: 'hidden',
                }}
              >
                {/* Spinning spokes */}
                <div
                  className="wheel-rotate absolute inset-0 flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                >
                  <div style={{ width: 1, height: '100%', background: 'rgba(34,211,238,0.5)', position: 'absolute' }} />
                  <div style={{ width: '100%', height: 1, background: 'rgba(34,211,238,0.5)', position: 'absolute' }} />
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22d3ee' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="flex items-center gap-1 mb-2">
        <span style={{ color: '#22d3ee', fontSize: 15, letterSpacing: '0.12em', fontWeight: 700 }}>
          LOADING ACADEMIES
        </span>
        <span className="dot1" style={{ width: 5, height: 5, borderRadius: '50%', background: '#22d3ee', display: 'inline-block', marginLeft: 4 }} />
        <span className="dot2" style={{ width: 5, height: 5, borderRadius: '50%', background: '#22d3ee', display: 'inline-block' }} />
        <span className="dot3" style={{ width: 5, height: 5, borderRadius: '50%', background: '#22d3ee', display: 'inline-block' }} />
      </div>
      <p style={{ color: '#64748b', fontSize: 12, letterSpacing: '0.08em' }}>
        FINDING THE BEST DRIVING SCHOOLS FOR YOU
      </p>
    </div>
  );
};

export default CarLoading;