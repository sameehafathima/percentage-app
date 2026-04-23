import { Slider } from '@/components/ui/slider';

interface WholeDialProps {
  whole: number;
  onChange: (val: number) => void;
  allowedWholes?: number[];
}

export function WholeDial({ whole, onChange, allowedWholes = [10, 20, 40, 50, 60, 70, 80, 90, 100] }: WholeDialProps) {
  
  const handleSliderChange = (vals: number[]) => {
    // Snap to nearest allowed whole
    const target = vals[0];
    const closest = allowedWholes.reduce((prev, curr) => 
      Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
    );
    onChange(closest);
  };

  return (
    <div className="p-6 rounded-3xl backdrop-blur-md bg-white/40 border border-white/60 shadow-xl mt-6">
      <h3 className="text-xl font-display mb-4 text-sidebar-foreground">Pot Size (Whole)</h3>
      <div className="flex items-center gap-6">
        <div className="text-2xl font-bold text-muted-foreground w-12 text-right">{whole}</div>
        <Slider 
          value={[whole]} 
          min={10} 
          max={100} 
          step={10}
          onValueChange={handleSliderChange}
          className="flex-1 interactive"
        />
      </div>
      <div className="flex justify-between mt-2 px-16 text-xs text-muted-foreground">
        {allowedWholes.map(w => (
          <div key={w} className={`cursor-pointer ${w === whole ? 'font-bold text-primary scale-110' : ''}`} onClick={() => onChange(w)}>
            {w}
          </div>
        ))}
      </div>
    </div>
  );
}
