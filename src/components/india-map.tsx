"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const stateData = [
  { name: "Maharashtra", completion: 98, status: "High" },
  { name: "Uttar Pradesh", completion: 92, status: "High" },
  { name: "Jammu & Kashmir", completion: 85, status: "Medium-High" },
  { name: "Tamil Nadu", completion: 78, status: "Medium-High" },
  { name: "Gujarat", completion: 74, status: "Medium" },
  { name: "Bihar", completion: 23, status: "Critical" },
]

export function IndiaMap() {
  return (
    <Card className="w-full border-none shadow-none bg-muted/30">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline flex items-center justify-center gap-2">
          🌍 INDIA MAP (Interactive)
        </CardTitle>
        <p className="text-muted-foreground">Vikas ki Gati state-wise tracker</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square bg-white rounded-3xl border shadow-inner flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/5 opacity-50" />
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🇮🇳</div>
              <h3 className="text-xl font-bold mb-2">Interactive Map Visualization</h3>
              <p className="text-sm text-muted-foreground">In a production app, this would be a full SVG/Canvas map of India with clickable regions.</p>
              <Badge className="mt-4 bg-secondary">Click on State for Details</Badge>
            </div>
            
            {/* Mock map pulses */}
            <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-secondary rounded-full animate-ping" />
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-primary rounded-full animate-ping" />
            <div className="absolute bottom-1/4 right-1/2 w-4 h-4 bg-destructive rounded-full animate-ping" />
          </div>

          <div className="space-y-5">
            {stateData.map((state) => (
              <div key={state.name} className="space-y-2">
                <div className="flex justify-between items-center font-medium">
                  <span className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${state.completion > 80 ? 'bg-secondary' : state.completion > 50 ? 'bg-primary' : 'bg-destructive'}`} />
                    {state.name}
                  </span>
                  <span className="text-sm font-bold">{state.completion}% Completed</span>
                </div>
                <Progress 
                  value={state.completion} 
                  className="h-3"
                  indicatorClassName={
                    state.completion > 80 ? 'bg-secondary' : 
                    state.completion > 50 ? 'bg-primary' : 'bg-destructive'
                  }
                />
              </div>
            ))}
            
            <div className="pt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="w-3 h-3 rounded-full bg-secondary" /> 75-100% (Excellent)
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="w-3 h-3 rounded-full bg-primary" /> 50-75% (Improving)
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="w-3 h-3 rounded-full bg-destructive" /> 0-50% (Needs Focus)
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProgressWithColor({ value }: { value: number }) {
  // Shadcn Progress component doesn't natively support indicatorClassName easily without prop modification
  // But we use it as a standard wrapper
  return (
    <div className="relative w-full h-3 bg-secondary/20 rounded-full overflow-hidden">
      <div 
        className={`absolute top-0 left-0 h-full transition-all duration-500 ${
          value > 80 ? 'bg-secondary' : value > 50 ? 'bg-primary' : 'bg-destructive'
        }`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
