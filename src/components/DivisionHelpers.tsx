import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface DivisionHelpersProps {
  onDropTemplate: (text: string) => void;
}

export function DivisionHelpers({ onDropTemplate }: DivisionHelpersProps) {
  return (
    <div className="h-full flex flex-col pt-4">
      <Tabs defaultValue="long-division" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-auto p-0">
          <TabsTrigger value="long-division" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Long Division</TabsTrigger>
          <TabsTrigger value="times-table" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Times Table</TabsTrigger>
          <TabsTrigger value="place-value" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Place Value</TabsTrigger>
        </TabsList>
        
        <TabsContent value="long-division" className="flex-1 p-4 flex flex-col items-center justify-center space-y-6">
          <div className="w-64 h-32 border-2 border-dashed border-border rounded-xl flex items-center justify-center bg-white/50 relative">
            <svg viewBox="0 0 200 100" className="w-full h-full text-foreground/50">
              <path d="M 50 80 L 50 40 L 150 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="30" y="65" fontSize="24" textAnchor="end" fill="currentColor">_</text>
              <text x="60" y="65" fontSize="24" fill="currentColor">___</text>
            </svg>
          </div>
          <Button onClick={() => onDropTemplate("  _________ \n| ")} variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
            Drop template onto whiteboard
          </Button>
        </TabsContent>

        <TabsContent value="times-table" className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-13 gap-1 min-w-max mx-auto text-xs font-mono text-center">
            <div className="w-6 h-6 flex items-center justify-center font-bold">×</div>
            {Array.from({length: 12}).map((_, i) => (
              <div key={`h-${i+1}`} className="w-6 h-6 flex items-center justify-center font-bold text-primary">{i + 1}</div>
            ))}
            
            {Array.from({length: 12}).map((_, r) => (
              <div key={`r-${r+1}`} className="contents group">
                <div className="w-6 h-6 flex items-center justify-center font-bold text-primary">{r + 1}</div>
                {Array.from({length: 12}).map((_, c) => (
                  <div key={`c-${r+1}-${c+1}`} className="w-6 h-6 flex items-center justify-center bg-card border border-border rounded-sm hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all cursor-default">
                    {(r + 1) * (c + 1)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="place-value" className="flex-1 p-4">
          <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto">
            {[
              { label: 'Thousands', val: '3', desc: '3 × 1000' },
              { label: 'Hundreds', val: '5', desc: '5 × 100' },
              { label: 'Tens', val: '7', desc: '7 × 10' },
              { label: 'Ones', val: '2', desc: '2 × 1' },
            ].map(col => (
              <div key={col.label} className="flex flex-col items-center space-y-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{col.label}</div>
                <div className="w-16 h-20 bg-white border-2 border-primary/30 rounded-xl flex items-center justify-center text-3xl font-display font-bold text-primary shadow-sm">
                  {col.val}
                </div>
                <div className="text-xs text-muted-foreground font-mono">{col.desc}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
