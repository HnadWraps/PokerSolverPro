export function ColorPalette() {
  return (
    <div className="palette-grid">
      {Object.entries(ChipColors).map(([key, value]) => (
        <div key={key} style={{ backgroundColor: value }}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
}