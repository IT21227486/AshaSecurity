export default function PageBackground({ children }) {
  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/images/apply-bg.jpg')" }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      {/* content */}
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
