import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Pencil, Highlighter, Eraser, Undo2, Redo2, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export interface WhiteboardRef {
  drawTemplate: (text: string) => void;
}

type Tool = 'pen' | 'highlighter' | 'eraser';

export const Whiteboard = forwardRef<WhiteboardRef>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#1b2547');
  const [strokeWidth, setStrokeWidth] = useState(3);
  
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      saveState();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack(prev => {
      const newStack = [...prev, imageData];
      if (newStack.length > 30) newStack.shift();
      return newStack;
    });
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length <= 1) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const currentState = undoStack[undoStack.length - 1];
    const previousState = undoStack[undoStack.length - 2];
    
    setRedoStack(prev => [...prev, currentState]);
    setUndoStack(prev => prev.slice(0, -1));
    
    ctx.putImageData(previousState, 0, 0);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const nextState = redoStack[redoStack.length - 1];
    
    setUndoStack(prev => [...prev, nextState]);
    setRedoStack(prev => prev.slice(0, -1));
    
    ctx.putImageData(nextState, 0, 0);
  };

  const clearAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    canvas.setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = strokeWidth * 2;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else if (tool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = strokeWidth * 4;
      ctx.strokeStyle = 'rgba(255,235,59,0.4)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = color;
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
    }
    saveState();
  };

  useImperativeHandle(ref, () => ({
    drawTemplate: (text: string) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000';
      ctx.font = '24px sans-serif';
      ctx.fillText(text, 50, 100);
      
      saveState();
    }
  }));

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-inner border border-border/50 overflow-hidden">
      <div className="flex items-center gap-2 p-2 border-b border-border/50 bg-muted/20 overflow-x-auto">
        <Button variant={tool === 'pen' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('pen')}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button variant={tool === 'highlighter' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('highlighter')}>
          <Highlighter className="w-4 h-4" />
        </Button>
        <Button variant={tool === 'eraser' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('eraser')}>
          <Eraser className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        {tool === 'pen' && (
          <div className="flex gap-1">
            {['#1b2547', '#ff6b6b', '#1f7a4d'].map(c => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-primary scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        )}
        
        <div className="w-32 flex items-center gap-2 mx-2">
          <span className="text-xs text-muted-foreground w-4 text-right">{strokeWidth}</span>
          <Slider 
            value={[strokeWidth]} 
            onValueChange={(v) => setStrokeWidth(v[0])} 
            min={1} 
            max={24} 
            step={1}
            className="flex-1"
          />
        </div>

        <div className="w-px h-6 bg-border mx-1" />
        
        <Button variant="ghost" size="icon" onClick={undo} disabled={undoStack.length <= 1}>
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={redo} disabled={redoStack.length === 0}>
          <Redo2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={clearAll}>
          <Trash2 className="w-4 h-4" />
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" onClick={download}>
          <Download className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex-1 relative cursor-crosshair touch-none" ref={containerRef}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
        />
      </div>
    </div>
  );
});

Whiteboard.displayName = 'Whiteboard';
